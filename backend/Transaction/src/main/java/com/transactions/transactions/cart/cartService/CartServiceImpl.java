package com.transactions.transactions.cart.cartService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.transactions.transactions.Exception.InvalidRequest;
import com.transactions.transactions.Exception.ResourceNotFound;
import com.transactions.transactions.cart.cartEntity.Cart;
import com.transactions.transactions.cart.cartRepository.CartRepo;
import com.transactions.transactions.dto.ScoopsFromInventoryPOJO;
import com.transactions.transactions.dto.Scoops_CartPOJO;
import com.transactions.transactions.scoops.entity.Scoops_Cart;
import com.transactions.transactions.scoops.service.ScoopService_Cart;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl {
	private final CartRepo cartRepo;
	private final ScoopService_Cart scoopService_cart;

	@Transactional
	public Scoops_Cart saveCartItem(Integer userId, Scoops_CartPOJO scoop) {
		// searching by the cart id if it already exists in the database
		Optional<Cart> optional_cart = cartRepo.findById(scoop.cartId());
		// if cart exists and the cart is owned by the incoming user
		if (optional_cart.isPresent() && optional_cart.get().getUserId() == userId) {
			Cart cart = optional_cart.get();
			// getting the scoops details from ice cream parlor -> get call-> return object
			// details-> Inter-service call
			Optional<ScoopsFromInventoryPOJO> optional_inventoryScoop = scoopService_cart.getScoopsFromInventory(scoop);
			if (optional_inventoryScoop.isPresent()) {
				ScoopsFromInventoryPOJO inventoryScoop = optional_inventoryScoop.get();
				if (scoop.quantityOrdered() < 1) {
					throw new InvalidRequest("Purchase qauntity cannot be less than 1");
				}
				// scoop object is being created to be added to cart
				// cart.get()-> It sets the cart in which the scoop is added
				Scoops_Cart newScoop = new Scoops_Cart(cart, scoop.scoopName(),
						inventoryScoop.price() * scoop.quantityOrdered(), scoop.quantityOrdered());
				// adding scoops to cart
				// adding the total price after each added item
				cart.setGrandTotal(cart.getGrandTotal() + newScoop.getPrice());
				cartRepo.save(cart);
				// save in which cart the items are added
				return scoopService_cart.addScoop(newScoop);

			} else {
				throw new ResourceNotFound("given ice cream not found in inventory");
			}
		} else {
			throw new ResourceNotFound("cart with given id not found or cart does not belong to the user");
		}

	}

	public Cart createEmptyCart(Cart cart) {
		cart.setGrandTotal(0.0);
		return cartRepo.save(cart);
	}

	// don't need all the users carts at a time
	public List<Cart> getAllCartItem() {
		return cartRepo.findAll();
	}

	// returns all the cart items and other cart details of a particular user
	public Cart getCartOfaUser(Integer userId) {
		Optional<Cart> cart = cartRepo.findByUserId(userId);
		return cart.orElseThrow(() -> {
			throw new ResourceNotFound("Cart not Found");
		});
	}

	@Transactional
	public Scoops_Cart updateCartItem(Integer userId, Scoops_CartPOJO scoop) {
		// fetching the cart from given id
		Optional<Cart> optional_cart = cartRepo.findById(scoop.cartId());
		if (optional_cart.isPresent() && optional_cart.get().getUserId() == userId) {
			Cart cart = optional_cart.get();
			try {
				// Checking if the incoming scoop already exists in cart
				// got the scoop which is to be updated
				Scoops_Cart scoopTobeUpdated = cart.getAllscoops().stream()
						.filter((scoopsFormCart) -> scoopsFormCart.getScoopName().equals(scoop.scoopName()))
						.toList().get(0);

				// checking the details of the scoop from ice cream parlor service
				Optional<ScoopsFromInventoryPOJO> optional_inventoryScoop = scoopService_cart
						.getScoopsFromInventory(scoop);
				if (optional_inventoryScoop.isPresent()) {
					ScoopsFromInventoryPOJO inventoryScoop = optional_inventoryScoop.get();
					// creating a new scoop object for updating
					Scoops_Cart newScoop = new Scoops_Cart(scoopTobeUpdated.getScoopsId(), cart, scoop.scoopName(),
							inventoryScoop.price() * scoop.quantityOrdered(), scoop.quantityOrdered());
					// updating the grand total of the cart
					// by deducting the old price of the ice cream and adding the new price
					cart.setGrandTotal(cart.getGrandTotal() - scoopTobeUpdated.getPrice() + newScoop.getPrice());
					// saving the cart
					cartRepo.save(cart);
					// save in which cart the items are added
					return scoopService_cart.addScoop(newScoop);
				} else {
					throw new ResourceNotFound("given ice cream not found in inventory");
				}
			} catch (ArrayIndexOutOfBoundsException ex) {
				// incoming scoop does not exist in cart so, nothing will be updated
				throw new ResourceNotFound("The ice cream was not found to be exisitng in the cart");
			}
		} else {
			throw new ResourceNotFound("cart with given id not found");
		}
	}

	public String deleteCartItem(Integer userId, Integer itemId) {
		Cart cart = getCartOfaUser(userId);
		Scoops_Cart scoopToBeDeleted = scoopService_cart.getScoopsById(itemId);
		cart.setGrandTotal(cart.getGrandTotal() - scoopToBeDeleted.getPrice());
		String result = scoopService_cart.deleteScoopFromCart(itemId);
		cartRepo.save(cart);
		return result;
	}

	public String clearCart(Cart cartToBeCleared) {
		try {
			scoopService_cart.deleteAllScoopsOfACart(cartToBeCleared.getAllscoops());
			cartToBeCleared.setAllscoops(new ArrayList<>());
			cartToBeCleared.setGrandTotal(0.0);
			cartRepo.save(cartToBeCleared);
			return "Cart cleared";
		} catch (ResourceNotFound e) {
			throw new ResourceNotFound("Cart item deleted");
		}

	}

}
