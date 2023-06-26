package com.user.user.userService;

import java.util.List;

import com.user.user.userEntity.User;



public interface UserService {
	public User postUser(User user);
	public List<User> getAllUser();
	public User getOneUser(int id);
	public void deleteUser(int id);
	public  User updateUser(User user);
}
