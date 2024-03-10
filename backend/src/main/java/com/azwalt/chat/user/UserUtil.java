package com.azwalt.chat.user;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserUtil {

	private final UserService userService;

	public User getCurrentUser() throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !authentication.isAuthenticated()) {
			throw new BadCredentialsException("No authenticated user found.");
		}
		return userService.findUserByUsername(authentication.getName());
	}

}
