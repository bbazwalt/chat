package com.azwalt.chat.user;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.azwalt.chat.auth.SignUpRequest;
import com.azwalt.chat.configuration.TokenProvider;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	private TokenProvider tokenProvider;
	private PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, TokenProvider tokenProvider,
			PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.tokenProvider = tokenProvider;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public User createUser(SignUpRequest signUpRequest) throws Exception {
		if (signUpRequest == null) {
			throw new IllegalArgumentException("Sign Up Request must not be null.");
		}
		String username = signUpRequest.getUsername();

		User isUser = userRepository.findByUsername(username);
		if (isUser != null) {
			throw new UserException("A user with the given username already exists.");
		}
		User createdUser = new User();
		createdUser.setUsername(username);
		createdUser.setFullName(signUpRequest.getFullName());
		createdUser.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
		createdUser.setCreatedAt(Instant.now());
		return userRepository.save(createdUser);
	}

	@Override
	public User findUserById(Long id) throws Exception {
		if (id == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		Optional<User> opt = userRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new UserException("User not found with the given ID.");
	}

	@Override
	public User findUserByToken(String token) throws Exception {
		if (token == null || token.trim().isEmpty()) {
			throw new IllegalArgumentException("Token must not be null.");
		}
		String username = tokenProvider.getUsernameFromToken(token);
		if (username == null) {
			throw new BadCredentialsException("Invalid Token.");
		}
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("No user found with the given username.");
		}
		return user;
	}

	@Override
	public User updateUser(Long userId, UpdateUserRequest updateUserRequest)
			throws Exception {
		if (userId == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		if (updateUserRequest == null) {
			throw new IllegalArgumentException("Update User Request must not be null.");
		}
		User user = findUserById(userId);
		if (user == null) {
			throw new UserException("No user found with the given ID.");
		}
		if (updateUserRequest.getFullName() != null && !updateUserRequest.getFullName().trim().isEmpty()) {
			user.setFullName(updateUserRequest.getFullName());
		}
		if (updateUserRequest.getProfilePicture() != null && !updateUserRequest.getProfilePicture().trim().isEmpty()) {
			user.setProfilePicture(updateUserRequest.getProfilePicture());
		}
		return userRepository.save(user);
	}

	@Override
	public Set<User> searchUser(String query) {
		if (query == null || query.trim().isEmpty()) {
			throw new IllegalArgumentException("Search query must not be empty.");

		}
		Set<User> users = userRepository.searchUser(query);
		return users;
	}

}
