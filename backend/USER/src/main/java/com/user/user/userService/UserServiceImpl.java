package com.user.user.userService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.user.user.userEntity.Login;
import com.user.user.userEntity.User;
import com.user.user.userExceptions.InvalidUserCredentialsException;
import com.user.user.userRepository.UserRepo;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepo userRepo;
	
	@Override
	public User postUser(User user) {

		return userRepo.save(user);
	}

	@Override
	public List<User> getAllUser() {
		// TODO Auto-generated method stub
		return userRepo.findAll();
	}

	@Override
	public User getOneUser(int id) {
		// TODO Auto-generated method stub
		Optional<User> singleUser = userRepo.findById(id);
		return singleUser.orElse(null);
	}

	@Override
	public void deleteUser(int id) {
		// TODO Auto-generated method stub
		userRepo.deleteById(id);

	}

	@Override
	public User updateUser(User user) {
		// TODO Auto-generated method stub
		return userRepo.save(user);
	}

	public Integer login(Login login) {
		// TODO Auto-generated method stub
		Optional<User> doesUserExist = userRepo.findByEmail(login.getEmailId());
		if (doesUserExist.isPresent()) {
			// user is present
			User user = doesUserExist.get();
			if (user.getPassword().equals(login.getPassword())) {
				user.setLoggedIn(true);
				userRepo.save(user);
				return user.getUserId();
			}
		}
		return null;
	}

	public Boolean logout(Integer id) {
		Optional<User> doesUserExist = userRepo.findById(id);
		if (doesUserExist.isPresent()) {
			User user = doesUserExist.get();
			user.setLoggedIn(false);
			userRepo.save(user);
			return true;
		}
		return false;
	}
}
