package com.user.user.userService.userPojo;

import com.user.user.userEntity.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserPOJO {
	private int userId;
	private String userName;
	private UserRole role;
}
