package com.transactions.transactions.bill.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.transactions.transactions.bill.entity.Bill;
import com.transactions.transactions.bill.service.BillService;
import com.transactions.transactions.dto.CreateBillPojo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bill")
public class BillController {
    private final BillService billService;

    @PostMapping("/purchase")
    public Bill generatebill(@RequestHeader("Authorization") Integer authorization,
            @RequestBody CreateBillPojo billingDetails) {
        return billService.purchase(authorization, billingDetails.userName());
    }

    @GetMapping("/get/{billId}")
    public Bill getBill(@PathVariable Integer billId) {
        return billService.getIndividualBillOfAUser(billId);
    }

    @GetMapping("/getAll")
    public List<Bill> getAllBills(@RequestHeader("Authorization") Integer authorization) {
        return billService.getAllBillsOfASingleUser(authorization);
    }
}
