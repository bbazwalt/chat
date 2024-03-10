package com.azwalt.chat.user;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.chat.shared.ApiResponse;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@Validated
public class UserController {

	private final UserService userService;
	private final UserUtil userUtil;

	@GetMapping("/profile")
	public User findUserProfile() throws Exception {
		return userUtil.getCurrentUser();
	}

	@GetMapping("/search")
	public Set<User> searchUsers(@RequestParam("name") @NotBlank String query) {
		return userService.searchUsers(query);
	}

	@PutMapping("/profile")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public ApiResponse updateUser(@RequestBody @NotNull @Valid UpdateUserRequest updateUserRequest) throws Exception {
		User user = userUtil.getCurrentUser();
		userService.updateUser(user.getId(), updateUserRequest);
		return new ApiResponse("User updated successfully.", true);
	}

}
