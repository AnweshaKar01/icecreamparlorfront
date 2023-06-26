package com.icecreamparlor.icecreampalor.Exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ResourceNotFound extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5949676565980152359L;
	private String message;
}
