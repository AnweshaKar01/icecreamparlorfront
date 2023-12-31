package com.cart.cart.cartRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cart.cart.cartEntity.Cart;

public interface CartRepo extends JpaRepository<Cart, Integer> {
	@Query(value = "select * from cart where user_id= ?1", nativeQuery = true)
	Optional<Cart> findByUserId(Integer id);
}
//user cart items will be returned  to the service->controller -> frontend