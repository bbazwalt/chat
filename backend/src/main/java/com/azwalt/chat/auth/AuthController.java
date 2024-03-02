package com.azwalt.chat.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.chat.configuration.TokenProvider;
import com.azwalt.chat.shared.ApiResponse;
import com.azwalt.chat.user.CustomUserService;
import com.azwalt.chat.user.UserException;
import com.azwalt.chat.user.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("/auth")
public class AuthController {

	private PasswordEncoder passwordEncoder;
	private TokenProvider tokenProvider;
	private CustomUserService customUserService;
	private UserService userService;

	public AuthController(PasswordEncoder passwordEncoder, TokenProvider tokenProvider,
			CustomUserService customUserService, UserService userService) {
		super();
		this.passwordEncoder = passwordEncoder;
		this.tokenProvider = tokenProvider;
		this.customUserService = customUserService;
		this.userService = userService;
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@Valid @RequestBody @NotNull SignUpRequest signUpRequest) {
		try {
			userService.createUser(signUpRequest);
			Authentication authentication = new UsernamePasswordAuthenticationToken(signUpRequest.getUsername(),
					signUpRequest.getPassword());
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String token = tokenProvider.generateToken(authentication);
			return new ResponseEntity<>(new AuthResponse(token, "Sign up successfull."), HttpStatus.ACCEPTED);

		} catch (UserException userException) {
			return new ResponseEntity<>(new ApiResponse(userException.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while signing up.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/signin")
	public ResponseEntity<?> signIn(@Valid @RequestBody @NotNull SignInRequest signInRequest) {
		try {
			Authentication authentication = authenticate(signInRequest.getUsername(), signInRequest.getPassword());
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String token = tokenProvider.generateToken(authentication);
			return new ResponseEntity<>(new AuthResponse(token, "Sign in successfull."), HttpStatus.ACCEPTED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException illegalArgumentException) {
			return new ResponseEntity<>(new ApiResponse(illegalArgumentException.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while signing in.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	public Authentication authenticate(String username, String password) {
		if (username == null) {
			throw new IllegalArgumentException("Username must not be null.");
		}
		if (password == null) {
			throw new IllegalArgumentException("Password must not be null.");
		}
		UserDetails userDetails = customUserService.loadUserByUsername(username);
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username.");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password.");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
