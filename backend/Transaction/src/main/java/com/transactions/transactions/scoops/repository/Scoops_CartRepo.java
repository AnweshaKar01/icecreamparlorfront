package com.transactions.transactions.scoops.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.transactions.transactions.cart.cartEntity.Cart;
import com.transactions.transactions.scoops.entity.Scoops_Cart;

public interface Scoops_CartRepo extends JpaRepository<Scoops_Cart, Integer> {
    @Query("SELECT s FROM Scoops_Cart s WHERE s.cart = :cart AND s.scoopName = :scoopname")
    Optional<Scoops_Cart> findIfAlreadyAdded(@Param("cart") Cart cart, @Param("scoopname") String scoopName);
}
