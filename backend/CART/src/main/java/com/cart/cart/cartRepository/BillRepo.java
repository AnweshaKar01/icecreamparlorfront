package com.cart.cart.cartRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cart.cart.cartEntity.Bill;

public interface BillRepo extends JpaRepository <Bill,Integer>{

}
