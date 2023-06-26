package com.cart.cart.cartService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.cart.cart.Exception.InvalidRequest;
import com.cart.cart.Exception.ResourceNotFound;
import com.cart.cart.cartEntity.Bill;
import com.cart.cart.cartEntity.Cart;
import com.cart.cart.cartEntity.ScoopPOJO;
import com.cart.cart.cartEntity.Scoops;
import com.cart.cart.cartEntity.ScoopsFromInventoryPOJO;
import com.cart.cart.cartEntity.StockItemUpdateRequest;
import com.cart.cart.cartRepository.BillRepo;
import com.cart.cart.cartRepository.CartRepo;
import com.cart.cart.cartRepository.ScoopRepo;

import jakarta.transaction.Transactional;

@Service
public class CartServiceImpl implements CartService {
	@Autowired
	private CartRepo cartRepo;
	@Autowired
	private ScoopRepo scoopRepo;
	@Autowired
	private BillRepo billRepo;
	// because ice cream parlor is called twice:purchase->to update stocks ; get by
	// title
	@Autowired
	private RestTemplate restTemplate;

	@Override
	@Transactional
	public Scoops saveCartItem(ScoopPOJO scoop) {
		// searching by the cart id if it already exists in the database
		Optional<Cart> cart = cartRepo.findById(scoop.getCartId());
		// getting the scoops details from ice cream parlor -> get call-> return object
		// details-> Inter-service call

		ScoopsFromInventoryPOJO inventoryScoop = restTemplate.getForObject(
				"http://ICECREAMPARLOR/inventory/getScoops/title/" + scoop.getScoopName(),
				ScoopsFromInventoryPOJO.class);
		// scoop object is being created to be added to cart
		// cart.get()-> It sets the cart in which the scoop is added
		if (scoop.getQuantityOrdered() < 1) {
			throw new InvalidRequest("Purchase qauntity cannot be less than 1");
		}
		Scoops newScoop = new Scoops(cart.get(), scoop.getScoopName(),
				inventoryScoop.getPrice() * scoop.getQuantityOrdered(), scoop.getQuantityOrdered());
		// adding scoops to cart
		if (cart.isPresent()) {
			Cart updatedCart = cart.get();
			// adding the total price after each added item
			updatedCart.setGrandTotal(updatedCart.getGrandTotal() + newScoop.getPrice());
			cartRepo.save(updatedCart);
			// save in which cart the items are added
			return scoopRepo.save(newScoop);
		} else {
			throw new ResourceNotFound("cart with given id not found");
		}
	}

	public Cart createEmptyCart(Cart cart) {
		cart.setGrandTotal(0.0);
		cart.setIsPurchased(false);
		return cartRepo.save(cart);
	}

// don't need all the users carts at a time
	@Override
	public List<Cart> getAllCartItem() {
		// TODO Auto-generated method stub
		return cartRepo.findAll();
	}

	// returns all the cart items of a particular cart
	@Override
	public Cart getCartItemsOfSingleUser(int id) {
		// TODO Auto-generated method stub

		Optional<Cart> singleItem = cartRepo.findByUserId(id);
		return singleItem.orElseThrow(() -> {
			throw new ResourceNotFound("Cart Item not Found");
		});
	}

	@Override
	@Transactional
	public Scoops updateCartItem(ScoopPOJO scoop) {
		// fetching the cart from given id
		Optional<Cart> cartDB = cartRepo.findById(scoop.getCartId());
		if (cartDB.isPresent()) {
			Cart cart = cartDB.get();
			try {
				// Checking if the incoming scoop already exists in cart
				List<Scoops> matchingScoop = cart.getAllscoops().stream()
						.filter((scoopsFormCart) -> scoopsFormCart.getScoopName().equals(scoop.getScoopName()))
						.toList();
				// got the scoop which is to be updated
				Scoops scoopTobeUpdated = matchingScoop.get(0);
				// checking the details of the scoop from ice cream parlor service
				ScoopsFromInventoryPOJO inventoryScoop = restTemplate.getForObject(
						"http://ICECREAMPARLOR/inventory/getScoops/title/" + scoop.getScoopName(),
						ScoopsFromInventoryPOJO.class);
				// creating a new scoop object for updating
				Scoops newScoop = new Scoops(scoopTobeUpdated.getScoopsId(), cart, scoop.getScoopName(),
						inventoryScoop.getPrice() * scoop.getQuantityOrdered(), scoop.getQuantityOrdered());
				// updating the grand total of the cart
				// by deducting the old price of the ice cream and adding the new price
				cart.setGrandTotal(cart.getGrandTotal() - scoopTobeUpdated.getPrice() + newScoop.getPrice());
				// saving the cart
				cartRepo.save(cart);
				// save in which cart the items are added
				return scoopRepo.save(newScoop);

			} catch (ArrayIndexOutOfBoundsException ex) {
				// incoming scoop does not exist in cart so, nothing will be updated
				throw new ResourceNotFound("The ice cream was not found to be exisitng in the cart");
			}

		} else {
			throw new ResourceNotFound("cart with given id not found");
		}
	}

	@Override
	public String deleteCartItem(int itemId) {
		try {
			Optional<Scoops> scoop = scoopRepo.findById(itemId);
			if(scoop.isPresent()) {
				scoopRepo.deleteById(itemId);
				
				return "deleted";
			}else {
				throw new ResourceNotFound("Item with given id is not found");
			}
			
		}catch(ResourceNotFound e) {
			throw e;
		}
	}

	@Override
	public String deleteCart(int userId) {
		try {
			Cart cartToBeDeleted = getCartItemsOfSingleUser(userId);
			cartRepo.deleteById(cartToBeDeleted.getCartId());
			return "Deleted";
		} catch (ResourceNotFound e) {

			throw new ResourceNotFound("Cart item deleted");
		}

	}

	@Transactional
	public Bill purchase(int cartId, String userName) {
		// check if the cart exists
		Cart cart = cartRepo.findById(cartId).orElse(null);
		// adding new bill
		Bill newBill = new Bill(userName, cart.getGrandTotal(), LocalDateTime.now());
		// save bill
		Bill generatedBill = billRepo.save(newBill);
		// decrease the stock after bill generation (each item One request)
		// adding bill id to all the scoops + for each scoop it is calling ice cream
		// parlor to update their individual stocks
		for (Scoops s : cart.getAllscoops()) {
			s.setBill(generatedBill);
			restTemplate.put("http://ICECREAMPARLOR/inventory/update/scoops-stocks",
					new StockItemUpdateRequest(s.getScoopName(), s.getQuantityOrdered().doubleValue()));
		}
		cart.setIsPurchased(true);
		cartRepo.save(cart);
		return generatedBill;

	}

}
