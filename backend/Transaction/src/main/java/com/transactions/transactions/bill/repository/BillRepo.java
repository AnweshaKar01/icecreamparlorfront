package com.transactions.transactions.bill.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transactions.transactions.bill.entity.Bill;

public interface BillRepo extends JpaRepository<Bill, Integer> {

}
