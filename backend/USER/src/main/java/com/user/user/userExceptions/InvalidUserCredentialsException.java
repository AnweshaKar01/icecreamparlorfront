package com.user.user.userExceptions;

public class InvalidUserCredentialsException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7531955377363325537L;
	private String message;

	public InvalidUserCredentialsException(String message) {
		super(message);
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

}
