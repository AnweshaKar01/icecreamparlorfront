package com.cart.cart.cartEntity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
	//TODO: check if that user has logged in or not before adding to cart
	//TODO: User can only get their own cart
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int cartId;
	@Column(unique=true)
	private Integer userId;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "cart")
	private List<Scoops> allscoops;
	private Boolean isPurchased;
	@Column(nullable = true)
	private Double grandTotal;
}
