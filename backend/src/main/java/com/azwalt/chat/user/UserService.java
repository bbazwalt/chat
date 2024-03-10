package com.azwalt.chat.user;

import java.util.Set;

import com.azwalt.chat.auth.SignUpRequest;

public interface UserService {

	public User createUser(SignUpRequest signUpRequest) throws Exception;

	public User findUserById(Long id) throws Exception;

	public User findUserByUsername(String username) throws Exception;

	public Set<User> searchUsers(String query);

	public User updateUser(Long id, UpdateUserRequest updateUserRequest) throws Exception;

}
