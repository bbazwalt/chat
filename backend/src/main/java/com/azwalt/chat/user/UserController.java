package com.azwalt.chat.user;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.chat.shared.ApiResponse;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
@Validated
@RequestMapping("/api/v1/users")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		super();
		this.userService = userService;

	}

	@GetMapping("/profile")
	public ResponseEntity<?> findUserProfile(@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException | IllegalArgumentException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while getting the user profile.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/search")
	public ResponseEntity<?> searchUser(@RequestParam("name") @NotNull String query) {
		try {
			Set<User> users = userService.searchUser(query);
			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (IllegalArgumentException illegalArgumentException) {
			return new ResponseEntity<>(new ApiResponse(illegalArgumentException.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while searching the users.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping
	public ResponseEntity<ApiResponse> updateUser(@RequestBody @NotNull @Valid UpdateUserRequest updateUserRequest,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			userService.updateUser(user.getId(), updateUserRequest);
			return new ResponseEntity<>(new ApiResponse("User updated successfully.", true), HttpStatus.ACCEPTED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException | IllegalArgumentException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while updating the user.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
