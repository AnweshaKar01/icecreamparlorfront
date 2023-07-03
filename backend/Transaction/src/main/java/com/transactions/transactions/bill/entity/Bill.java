package com.transactions.transactions.bill.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.transactions.transactions.scoops.entity.Scoops_Bill;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
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
	private Integer userId;
	private String userName;

	// joining bill to scoop
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "bill")
	private List<Scoops_Bill> allscoops;

	@Column(nullable = true)
	private Double grandTotal;
	private LocalDateTime date;

	public Bill(Integer userId, String userName, Double grandTotal, LocalDateTime date) {
		this.userId = userId;
		this.userName = userName;
		this.grandTotal = grandTotal;
		this.date = date;
	};
}
