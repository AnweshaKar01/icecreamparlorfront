package com.cart.cart.cartRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cart.cart.cartEntity.Scoops;

public interface ScoopRepo extends JpaRepository<Scoops, Integer>{
}
