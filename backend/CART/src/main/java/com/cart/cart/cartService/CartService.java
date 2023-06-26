package com.cart.cart.cartService;

import java.util.List;

import com.cart.cart.cartEntity.Cart;
import com.cart.cart.cartEntity.ScoopPOJO;
import com.cart.cart.cartEntity.Scoops;

public interface CartService {
	// post
	public Scoops saveCartItem(ScoopPOJO scoop);

	// get all
	public List<Cart> getAllCartItem();

	// getOneItem
	public Cart getCartItemsOfSingleUser(int id);

	// update cart Item
	public Scoops updateCartItem(ScoopPOJO scoop);

	public String deleteCartItem(int itemId);
	// delete cart item
	public String deleteCart(int userId);
}
