package com.cart.cart.cartEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ScoopsFromInventoryPOJO {
	//this is the scoop from icecreamparlor
	private Integer scoopsId;

	private String title;

	private double price;

	private double amount; //for amount left in stock

}
