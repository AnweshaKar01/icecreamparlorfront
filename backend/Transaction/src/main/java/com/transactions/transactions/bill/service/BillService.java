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
        cart.getAllscoops().forEach(s -> {
            Scoops_Bill scoop_bill = new Scoops_Bill(generatedBill, s.getScoopName(),
                    s.getPrice(),
                    s.getQuantityOrdered());
            scoopService_bill.addScoop(scoop_bill);
            restTemplate.put("http://ICECREAMPARLOR/inventory/update/scoops-stocks",
                    new StockItemUpdateRequest(s.getScoopName(),
                            s.getQuantityOrdered().doubleValue()));
        });
        cartService.clearCart(cart);
        return generatedBill;
    }
}
