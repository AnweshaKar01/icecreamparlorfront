package com.transactions.transactions.cart.cartController;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;

import com.transactions.transactions.Exception.ResourceNotFound;
import com.transactions.transactions.cart.cartEntity.Cart;
import com.transactions.transactions.cart.cartService.CartServiceImpl;
import com.transactions.transactions.dto.Scoops_CartPOJO;
import com.transactions.transactions.scoops.entity.Scoops_Cart;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

	private final CartServiceImpl cartServiceImpl;

	// creating an empty cart per user
	@PostMapping("/createCart")
	public Cart createCart(@RequestBody Cart cart) {
		return cartServiceImpl.createEmptyCart(cart);
	}

	// add a single item to a cart
	@PostMapping("/addCartItem")
	public Scoops_Cart postCartItem(@RequestHeader("Authorization") Integer userId,
			@RequestBody Scoops_CartPOJO scoop) {
		return cartServiceImpl.saveCartItem(userId, scoop);

	}

	// all cart of all users
	@GetMapping("/getCartItems")
	public List<Cart> getAllCartItems() {
		return cartServiceImpl.getAllCartItem();
	}

	@GetMapping("/getCartItems/{userid}")
	public Cart getCartItemOfSingleUser(@PathVariable int userid) {
		try {
			return cartServiceImpl.getCartOfaUser(userid);
		} catch (ResourceNotFound e) {
			throw new ResourceNotFound(e.getMessage());
		}
	}

	@PutMapping("/updateCartItems")
	public Scoops_Cart updateCartItem(@RequestHeader("Authorization") Integer userId,
			@RequestBody Scoops_CartPOJO scoop) {
		Scoops_Cart updatedCartItem = cartServiceImpl.updateCartItem(userId, scoop);
		try {
			return updatedCartItem;
		} catch (ResourceNotFound e) {
			throw new ResourceNotFound(e.getMessage());
		}

	}

	@DeleteMapping("/deleteItem/{itemId}")
	public void deleteItem(@RequestHeader("Authorization") Integer authorization, @PathVariable int itemId) {
		try {
			cartServiceImpl.deleteCartItem(authorization, itemId);
		} catch (ResourceAccessException ex) {
			throw new ResourceNotFound(ex.getMessage());
		}
	}
}
