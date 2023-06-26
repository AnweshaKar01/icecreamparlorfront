package com.icecreamparlor.icecreampalor.Exceptions;

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

	@ExceptionHandler(DuplicateDataError.class)
	public ProblemDetail handleException(DuplicateDataError e) {
		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(400), e.getMessage());
		problem.setTitle("Duplicate data error");
		return problem;
	}

}
