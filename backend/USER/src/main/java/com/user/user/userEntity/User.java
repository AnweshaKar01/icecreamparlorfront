package com.user.user.userEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	@Column(nullable = false)
	private String userName;
	@Column(nullable = false, unique = true)
	@Email
	private String email;
	@Column(nullable = false)
	private String password;
	@Enumerated(EnumType.STRING)
	private UserRole role;
	@Column(columnDefinition = "boolean default false")
	private boolean isLoggedIn;

}
