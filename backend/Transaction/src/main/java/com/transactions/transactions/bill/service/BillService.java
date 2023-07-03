package com.transactions.transactions.bill.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.transactions.transactions.bill.entity.Bill;
import com.transactions.transactions.bill.repository.BillRepo;
import com.transactions.transactions.cart.cartEntity.Cart;
import com.transactions.transactions.cart.cartService.CartServiceImpl;
import com.transactions.transactions.dto.StockItemUpdateRequest;
import com.transactions.transactions.scoops.entity.Scoops_Bill;
import com.transactions.transactions.scoops.service.ScoopService_Bill;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BillService {
    private final BillRepo billRepo;
    private final CartServiceImpl cartService;
    private final ScoopService_Bill scoopService_bill;
    private final RestTemplate restTemplate;

    @Transactional
    public Bill purchase(Integer userId, String userName) {
        // check if the cart exists
        Cart cart = cartService.getCartOfaUser(userId);
        // adding new bill
        Bill newBill = new Bill(cart.getUserId(), userName, cart.getGrandTotal(), LocalDateTime.now());
        // save bill
        Bill generatedBill = billRepo.save(newBill);

        // ================================================
        // ::Single Threaded Approach::
        // cart.getAllscoops().forEach(s -> {
        // Scoops_Bill scoop_bill = new Scoops_Bill(generatedBill, s.getScoopName(),
        // s.getPrice(),
        // s.getQuantityOrdered());
        // scoopService_bill.addScoop(scoop_bill);
        // restTemplate.put("http://ICECREAMPARLOR/inventory/update/scoops-stocks",
        // new StockItemUpdateRequest(s.getScoopName(),
        // s.getQuantityOrdered().doubleValue()));
        // });
        // ==================================================

        // ::Multi Threaded Approach::
        // The next two operations are costly and they are independent of each other
        // So, to optimize performance we made two threads so that these operations
        // occour parallely
        class SaveToDB extends Thread {
            public void run() {
                cart.getAllscoops().forEach(s -> {
                    Scoops_Bill scoop_bill = new Scoops_Bill(generatedBill, s.getScoopName(), s.getPrice(),
                            s.getQuantityOrdered());
                    scoopService_bill.addScoop(scoop_bill);
                });
            }
        }
        class UpdateStocksInInventory extends Thread {
            public void run() {
                // decrease the stock after bill generation (each item One request)
                // adding bill id to all the scoops + for each scoop it is calling ice cream
                // parlor to update their individual stocks
                cart.getAllscoops().forEach(s -> {
                    restTemplate.put("http://ICECREAMPARLOR/inventory/update/scoops-stocks",
                            new StockItemUpdateRequest(s.getScoopName(), s.getQuantityOrdered().doubleValue()));
                });
            }
        }
        Thread t1 = new SaveToDB();
        Thread t2 = new UpdateStocksInInventory();
        t1.start();
        t2.start();
        // now waiting for two threads to complete the operation before returning
        // results
        // this is done to avoid data inconsistency
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException ex) {
            throw new RuntimeException("Threads did not complete the task");
        }
        cartService.clearCart(userId);
        return generatedBill;
    }
}
