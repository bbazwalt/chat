package com.azwalt.chat.user;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.azwalt.chat.auth.SignUpRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	public User createUser(SignUpRequest signUpRequest) throws Exception {
		String username = signUpRequest.getUsername();
		Optional<User> isUser = userRepository.findByUsername(username);
		if (isUser.isPresent()) {
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
		return userRepository.findById(id)
				.orElseThrow(() -> new UserException("No user found with the given ID."));
	}

	@Override
	public User findUserByUsername(String username) {
		return userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("No user found with the given username."));
	}

	@Override
	public Set<User> searchUsers(String query) {
		return userRepository.searchUsers(query.toLowerCase());
	}

	@Override
	public User updateUser(Long userId, UpdateUserRequest updateUserRequest)
			throws Exception {
		User user = findUserById(userId);
		if (updateUserRequest.getFullName() != null) {
			user.setFullName(updateUserRequest.getFullName());
		}
		if (updateUserRequest.getProfilePicture() != null) {
			user.setProfilePicture(updateUserRequest.getProfilePicture());
		}
		return userRepository.save(user);
	}

}
