package com.cart.cart.cartController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;

import com.cart.cart.cartEntity.Bill;
import com.cart.cart.cartEntity.Cart;
import com.cart.cart.cartEntity.ScoopPOJO;
import com.cart.cart.cartEntity.Scoops;
import com.cart.cart.cartService.CartServiceImpl;
import com.cart.cart.Exception.ResourceNotFound;

@RestController
@RequestMapping("/cart")
public class CartController {
	@Autowired
	private CartServiceImpl cartServiceImpl;

	// creating an empty cart per user
	@PostMapping("/create-cart")
	public Cart createCart(@RequestBody Cart cart) {
		return cartServiceImpl.createEmptyCart(cart);
	}

	// add a single item to a cart
	@PostMapping("/addCartItem")
	public Scoops postCartItem(@RequestBody ScoopPOJO scoop) {
		return cartServiceImpl.saveCartItem(scoop);

	}

	// all cart of all users
	@GetMapping("/getCartItems")
	public List<Cart> getCartItems() {
		return cartServiceImpl.getAllCartItem();
	}

	@GetMapping("/getCartItems/{userid}")
	public Cart getCartItemOfSingleUser(@PathVariable int userid) {
		try {
			return cartServiceImpl.getCartItemsOfSingleUser(userid);
		} catch (ResourceNotFound e) {
			throw new ResourceNotFound(e.getMessage());
		}
	}

	@PutMapping("/updateCartItems")
	public Scoops updateCartItem(@RequestBody ScoopPOJO scoop) {
		Scoops updatedCartItem = cartServiceImpl.updateCartItem(scoop);
		try {
			return updatedCartItem;
		} catch (ResourceNotFound e) {
			throw new ResourceNotFound(e.getMessage());
		}

	}
	
	@DeleteMapping("/deleteItem/{itemId}")
	public void deleteItem(@PathVariable int itemId) {
		try {
			cartServiceImpl.deleteCartItem(itemId);
		}catch(ResourceAccessException ex) {
			throw new ResourceNotFound(ex.getMessage());
		}
	}

	@DeleteMapping("/deleteCart/{userId}")
	public void deleteCart(@PathVariable int userId) {
		try {
			cartServiceImpl.deleteCart(userId);
		} catch (ResourceNotFound e) {
			throw new ResourceNotFound(e.getMessage());
		}
	}

	@GetMapping("/purchase/{userName}/{cartId}")
	public Bill generatebill(@PathVariable int cartId, @PathVariable String userName) {
		return cartServiceImpl.purchase(cartId, userName);
	}
}
