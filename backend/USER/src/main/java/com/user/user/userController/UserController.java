package com.user.user.userController;

import com.user.user.userService.userPojo.UserPOJO;
import java.util.List;
import java.util.ArrayList;

import org.apache.hc.core5.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user.user.userEntity.User;
import com.user.user.userExceptions.InvalidUserCredentialsException;
import com.user.user.userService.UserServiceImpl;
import com.user.user.userEntity.Login;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	public UserServiceImpl userServiceImpl;

	@PostMapping("/add")
	public UserPOJO addUser(@RequestBody User user) {
		User userReturned= userServiceImpl.postUser(user);
		 UserPOJO userpojo= new UserPOJO(userReturned.getUserId(),userReturned.getUserName());
		 return  userpojo;
	}

	@GetMapping("/get")
	public List<UserPOJO> getAllUsers() {
		List <User> user=userServiceImpl.getAllUser();
		
		List<UserPOJO> userpojo= new ArrayList<>();
		
		for(User u: user){
			userpojo.add(new UserPOJO(u.getUserId(),u.getUserName()));
		}
		return userpojo;
	}

	@GetMapping("/get/{id}")
	public UserPOJO getOneUser(@PathVariable int id) {
		User user = userServiceImpl.getOneUser(id);
		if (user != null) {
			UserPOJO userpojo= new UserPOJO(user.getUserId(),user.getUserName());
			return userpojo;
		} else {
			throw new InvalidUserCredentialsException("user not found");
		}

	}

	@PutMapping("/update")
	public UserPOJO updateUsers(@RequestBody User user) {
		User userReturned= userServiceImpl.updateUser(user);
		 UserPOJO userpojo= new UserPOJO(userReturned.getUserId(),userReturned.getUserName());
		 return  userpojo; 
	}

	@DeleteMapping("/delete/{id}")
	public void deleteUsers(@PathVariable int id) {
		userServiceImpl.deleteUser(id);
	}

	@PostMapping("/login")
	public ResponseEntity<String> userLogin(@RequestBody Login login) {
		System.out.println("incoming: " + login);
		Integer doLogin = userServiceImpl.login(login);
		if (doLogin!=null) {
			return ResponseEntity.status(HttpStatus.SC_OK).body(doLogin.toString());
		} else {
			return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).body("could not login");
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
