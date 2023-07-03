package com.transactions.transactions.cart.cartService;

import java.util.List;

import com.transactions.transactions.cart.cartEntity.Cart;
import com.transactions.transactions.dto.Scoops_CartPOJO;
import com.transactions.transactions.scoops.entity.Scoops_Cart;

public interface CartService {
	// post
	public Scoops_Cart saveCartItem(Scoops_CartPOJO scoop);

	// get all
	public List<Cart> getAllCartItem();

	// getOneItem
	public Cart getCartItemsOfSingleUser(int id);

	// update cart Item
	public Scoops_Cart updateCartItem(Scoops_CartPOJO scoop);

	public String deleteCartItem(int itemId);

	// delete cart item
	public String deleteCart(int userId);
}
