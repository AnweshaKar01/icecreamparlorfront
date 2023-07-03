package com.transactions.transactions.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class InvalidRequest extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5949676565980152359L;
	private String message;
}
