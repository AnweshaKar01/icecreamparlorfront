package com.user.user.userController;

import java.util.ArrayList;
import java.util.List;

import org.apache.hc.core5.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user.user.userEntity.Login;
import com.user.user.userEntity.User;
import com.user.user.userExceptions.InvalidUserCredentialsException;
import com.user.user.userService.UserServiceImpl;
import com.user.user.userService.userPojo.UserPOJO;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	public UserServiceImpl userServiceImpl;

	@PostMapping("/add")
	public UserPOJO addUser(@RequestBody User user) {
		User userReturned = userServiceImpl.postUser(user);
		UserPOJO userpojo = new UserPOJO(userReturned.getUserId(), userReturned.getUserName(), user.getRole());
		return userpojo;
	}

	@GetMapping("/get")
	public List<UserPOJO> getAllUsers() {
		List<User> user = userServiceImpl.getAllUser();

		List<UserPOJO> userpojo = new ArrayList<>();

		for (User u : user) {
			userpojo.add(new UserPOJO(u.getUserId(), u.getUserName(), u.getRole()));
		}
		return userpojo;
	}

	@GetMapping("/get/{id}")
	public UserPOJO getOneUser(@PathVariable int id) {
		User user = userServiceImpl.getOneUser(id);
		if (user != null) {
			UserPOJO userpojo = new UserPOJO(user.getUserId(), user.getUserName(), user.getRole());
			return userpojo;
		} else {
			throw new InvalidUserCredentialsException("user not found");
		}

	}

	@PutMapping("/update")
	public UserPOJO updateUsers(@RequestBody User user) {
		User userReturned = userServiceImpl.updateUser(user);
		UserPOJO userpojo = new UserPOJO(userReturned.getUserId(), userReturned.getUserName(), user.getRole());
		return userpojo;
	}

	@DeleteMapping("/delete/{id}")
	public void deleteUsers(@PathVariable int id) {
		userServiceImpl.deleteUser(id);
	}

	@PostMapping("/login")
	public ResponseEntity<UserPOJO> userLogin(@RequestBody Login login) {
		System.out.println("incoming: " + login);
		UserPOJO loggedin = userServiceImpl.login(login);
		if (loggedin != null) {
			return ResponseEntity.status(HttpStatus.SC_OK).body(loggedin);
		} else {
			return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).body(new UserPOJO(0, null, null));
		}
	}

	@DeleteMapping("/logout/{id}")
	public ResponseEntity<String> userLogout(@PathVariable Integer id) {
		Boolean doLogout = userServiceImpl.logout(id);
		if (doLogout) {
			return ResponseEntity.status(HttpStatus.SC_OK).body("logged out successfully");
		}
		return ResponseEntity.status(HttpStatus.SC_EXPECTATION_FAILED).body("Try Again");

	}

}
