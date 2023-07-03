package com.transactions.transactions.cart.cartEntity;

import java.util.List;

import com.transactions.transactions.scoops.entity.Scoops_Cart;

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
	// TODO: User can only get their own cart
	@Id
	@GeneratedValue
	private Integer cartId;
	@Column(unique = true)
	private Integer userId;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "cart")
	private List<Scoops_Cart> allscoops;
	private Boolean isPurchased;
	@Column(nullable = true)
	private Double grandTotal;
}
