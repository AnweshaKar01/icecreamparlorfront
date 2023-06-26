package com.icecreamparlor.icecreampalor.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStocksPOJO {
	private String title;
	private Double stockOrdered;
}
