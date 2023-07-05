package com.transactions.transactions.bill.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.transactions.transactions.bill.entity.Bill;
import com.transactions.transactions.bill.repository.BillRepo;
import com.transactions.transactions.cart.cartEntity.Cart;
import com.transactions.transactions.cart.cartService.CartServiceImpl;
import com.transactions.transactions.dto.StockItemUpdateRequest;
import com.transactions.transactions.scoops.entity.Scoops_Bill;
import com.transactions.transactions.scoops.entity.Scoops_Cart;
import com.transactions.transactions.scoops.service.ScoopService_Bill;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BillService {
    private final BillRepo billRepo;
    private final CartServiceImpl cartService;
    private final ScoopService_Bill scoopService_bill;
    private final RestTemplate restTemplate;

    @Transactional
    public Bill purchase(Integer userId, String userName) {
        // check if the cart exists
        Cart cart = cartService.getCartOfaUser(userId);
        // creating new bill
        Bill newBill = new Bill(cart.getUserId(), userName, cart.getGrandTotal(), LocalDateTime.now());
        // saving the bill in db
        Bill generatedBill = billRepo.save(newBill);
        // try {
        // log.info("sleeping main thread");
        // Thread.sleep(500);
        // } catch (InterruptedException e) {
        // e.printStackTrace();
        // }
        List<Scoops_Cart> th_safe_scoops_list = new CopyOnWriteArrayList<>(cart.getAllscoops());
        /**
         * !!!READ!!!
         * This function can be quite slow and inefficient some times
         * Because it is doing a lot of complex and costly CPU intensive calls
         * both to DB and interservice calls.
         * So, to improve the performance multithreading is done
         * "CopyOnWriteArrayList" is a thread safe implementation
         * of the List interface coming from java.concurrent package
         * using this the inter-service call of stock updates
         * is made to run on a seperate thread and db I/O
         * is running on main thread
         * As the cart can contain lot of items
         * while creating scoops for Bill parallel Streams is used
         * this also internally uses multi threading and splits the list among a few
         * threads
         * at the last we are waiting for the t1 thred to complete its operation
         * it is done by using join() function
         * and at last bill object is returned
         */
        class UpdateStocks extends Thread {
            public UpdateStocks() {
                super("update-stocks");
            }

            public void run() {
                th_safe_scoops_list.parallelStream()
                        .forEach(s -> restTemplate.put("http://ICECREAMPARLOR/inventory/update/scoops-stocks",
                                new StockItemUpdateRequest(s.getScoopName(),
                                        s.getQuantityOrdered().doubleValue())));
            }
        }
        Thread t1 = new UpdateStocks();
        // t1.setPriority(4);
        t1.start();
        th_safe_scoops_list.forEach(s -> {
            Scoops_Bill scoop_bill = new Scoops_Bill(generatedBill, s.getScoopName(),
                    s.getPrice(),
                    s.getQuantityOrdered());
            scoopService_bill.addScoop(scoop_bill);
        });
        cartService.clearCart(cart);
        try {
            t1.join();
        } catch (InterruptedException ex) {
            throw new RuntimeException("Stock updating in inventory was not completed", ex.getCause());
        }
        return generatedBill;
    }

    public List<Bill> getAllBillsOfASingleUser(Integer userId) {
        return billRepo.findByUserId(userId);
    }

    public Bill getIndividualBillOfAUser(Integer billId) {
        log.error("Fetching bill of: {}", billId);
        return billRepo.findById(billId).orElse(null);
    }
}
