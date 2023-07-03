package com.transactions.transactions.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Rest Template will send this as json to ice cream parlor to update the stocks
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockItemUpdateRequest {
	private String title;
	private Double stockOrdered;
}
