package com.transactions.transactions.bill.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.transactions.transactions.bill.entity.Bill;
import com.transactions.transactions.bill.service.BillService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bill")
public class BillController {
    private final BillService billService;

    @PostMapping("/purchase/{userName}")
    public Bill generatebill(@RequestHeader("Authorization") Integer authorization, @PathVariable String userName) {
        return billService.purchase(authorization, userName);
    }
}
