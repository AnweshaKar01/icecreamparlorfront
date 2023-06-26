package com.user.user.userRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.user.user.userEntity.User;

public interface UserRepo extends JpaRepository<User, Integer> {
	@Query(value = "select * from users where email=?1",nativeQuery = true)
	Optional<User> findByEmail(String emailId);
}
