package com.cart.cart.cartEntity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Bill {
	@Id
	@GeneratedValue
	private Integer billId;
	private String userName;
	
//joining bill to scoop
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "bill")
	private List<Scoops> allscoops;

	@Column(nullable = true)
	private Double grandTotal;
	private LocalDateTime date;

	public Bill(String userName, Double grandTotal, LocalDateTime date) {
		this.userName = userName;
		this.grandTotal = grandTotal;
		this.date = date;
	};
}
