package com.transactions.transactions.dto;

public record Scoops_BillPOJO(Integer BillId, String scoopName, Integer quantityOrdered, Double Price) {
	// Request Template for adding a single scoop to a cart
}
