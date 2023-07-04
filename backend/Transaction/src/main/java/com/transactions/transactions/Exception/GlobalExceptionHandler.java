package com.transactions.transactions.Exception;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	// ProblemDetail is a class that provides a standardized way to send errors to
	// client
	@ExceptionHandler(ResourceNotFound.class)
	public ProblemDetail handleException(ResourceNotFound e) {
		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(500), e.getMessage());
		problem.setTitle("resource not found");
		return problem;
	}

	@ExceptionHandler(DuplicateEntity.class)
	public ProblemDetail handleException(DuplicateEntity e) {
		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(409), e.getMessage());
		problem.setTitle("Ice cream already added to cart");
		return problem;
	}

	@ExceptionHandler(InvalidRequest.class)
	// ProblemDetail is a class that provides a standardized way to send errors to
	// client
	public ProblemDetail handleException(InvalidRequest e) {
		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(400), e.getMessage());
		problem.setTitle("Invalid/Bad request");
		return problem;
	}

}
