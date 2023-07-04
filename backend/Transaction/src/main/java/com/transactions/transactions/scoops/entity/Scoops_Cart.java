package com.transactions.transactions.scoops.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.transactions.transactions.cart.cartEntity.Cart;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Scoops_Cart {
	@Id
	@GeneratedValue
	private Integer scoopsId;
	// jsonIgnore to stop infinite loop
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "cartid", nullable = false)
	private Cart cart;
	@NotBlank
	private String scoopName;

	private Double price;

	private Integer quantityOrdered;

	// used to update scoop
	public Scoops_Cart(int scoopId, Cart cart, String scoopName, Double price, int quantityOrdered) {
		this.scoopsId = scoopId;
		this.cart = cart;
		this.scoopName = scoopName;
		this.price = price;
		this.quantityOrdered = quantityOrdered;
	}

	// used to create scoop
	public Scoops_Cart(Cart cart, String scoopName, Double price, int quantityOrdered) {
		this.cart = cart;
		this.scoopName = scoopName;
		this.price = price;
		this.quantityOrdered = quantityOrdered;
	}

	@Override
	public String toString() {
		return "Scoops_Cart [scoopsId=" + scoopsId + ", cart=" + cart + ", scoopName=" + scoopName + ", price=" + price
				+ ", quantityOrdered=" + quantityOrdered + "]";
	}

}
