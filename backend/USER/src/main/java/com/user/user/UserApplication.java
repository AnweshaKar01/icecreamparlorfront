package com.user.user;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class UserApplication {

	public static void main(String[] args) {
		SpringApplication app =new SpringApplication(UserApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.port", 0));
		app.run(args);
	}

}
