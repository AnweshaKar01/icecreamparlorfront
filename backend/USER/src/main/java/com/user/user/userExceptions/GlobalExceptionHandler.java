package com.user.user.userExceptions;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(InvalidUserCredentialsException.class)
	public ProblemDetail InvalidUserCredHandler(InvalidUserCredentialsException ex) {
		ProblemDetail prblm = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(404),
				"user sent is not valid according to our database");
		prblm.setTitle("user not found");
		return prblm;
	}

}
