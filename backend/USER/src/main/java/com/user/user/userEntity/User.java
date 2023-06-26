package com.user.user.userEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="UserID")
	private int userId;
	@Column (name="NAME",nullable=false)
	private String userName;
	@Column (name="EMAIL",nullable=false,unique=true)
	@Email
	private String email;
	@Column (name="PASSWORD",nullable=false)
	private String password;	
	@Column(columnDefinition = "boolean default false")
	private boolean isLoggedIn;
	
}
