package com.transactions.transactions.scoops.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transactions.transactions.scoops.entity.Scoops_Cart;

public interface Scoops_CartRepo extends JpaRepository<Scoops_Cart, Integer> {
}
