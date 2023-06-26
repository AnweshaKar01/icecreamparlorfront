package com.cart.cart.cartEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoopPOJO {
//Request Template for adding a single scoop to a cart
	private Integer cartId;
	private String scoopName;
	private int quantityOrdered;
}
