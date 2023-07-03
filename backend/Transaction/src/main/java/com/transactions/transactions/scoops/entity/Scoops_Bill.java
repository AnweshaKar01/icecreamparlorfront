package com.transactions.transactions.scoops.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.transactions.transactions.bill.entity.Bill;
import com.transactions.transactions.cart.cartEntity.Cart;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Scoops_Bill {
	@Id
	@GeneratedValue
	private Integer scoopsId;
	@NotBlank
	private String scoopName;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "billid", nullable = true)
	private Bill bill;
	private Double price;
	private Integer quantityOrdered;

	// used to create scoop
	public Scoops_Bill(Bill bill, String scoopName, Double price, Integer quantityOrdered) {
		this.scoopName = scoopName;
		this.bill = bill;
		this.price = price;
		this.quantityOrdered = quantityOrdered;
	}

}
