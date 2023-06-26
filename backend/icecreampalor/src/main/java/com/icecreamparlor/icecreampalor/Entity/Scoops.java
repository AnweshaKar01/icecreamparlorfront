package com.icecreamparlor.icecreampalor.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
// this tells spring boot that this particular class belongs to the entity in
// mysql db
@Data // will automatically generate the getters and setters
@Table(name = "scoops_db")
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Scoops {
	@Id // tells that this particular variable is the id
	@GeneratedValue(strategy = GenerationType.AUTO) // generate automated values
	private Integer scoopsId;
	@Column(unique = true, length = 255)
	private String title;
	@NotNull
	private double price;

	@Column(name = "AmountLeft")
	private double amount;
}
