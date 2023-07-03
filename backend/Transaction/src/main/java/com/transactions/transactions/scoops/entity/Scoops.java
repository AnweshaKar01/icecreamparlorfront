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
// this tells spring boot that this particular class belongs to the entity in
// mysql db
@Data // will automatically generate the getters and setters
@Table(name = "Scoops_Cart")
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Scoops {
	@Id
	@GeneratedValue
	private int scoopsId;
	// jsonIgnore to stop infinite loop
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "cartid", nullable = false)
	private Cart cart;
	@NotBlank
	private String scoopName;

	private Double price;

	private Integer quantityOrdered;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "billId", nullable = true)
	private Bill bill;

	// used to update scoop
	public Scoops(int scoopId, Cart cart, String scoopName, Double price, int quantityOrdered) {
		super();
		this.scoopsId = scoopId;
		this.cart = cart;
		this.scoopName = scoopName;
		this.price = price;
		this.quantityOrdered = quantityOrdered;
	}

	// used to create scoop
	public Scoops(Cart cart, String scoopName, Double price, int quantityOrdered) {
		super();
		this.cart = cart;
		this.scoopName = scoopName;
		this.price = price;
		this.quantityOrdered = quantityOrdered;
	}

}
