package com.transactions.transactions.bill.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transactions.transactions.bill.entity.Bill;

public interface BillRepo extends JpaRepository<Bill, Integer> {
    List<Bill> findByUserId(Integer userId);
}
