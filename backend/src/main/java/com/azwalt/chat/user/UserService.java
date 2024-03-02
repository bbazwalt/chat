package com.azwalt.chat.user;

import java.util.Set;

import com.azwalt.chat.auth.SignUpRequest;

public interface UserService {

	public User createUser(SignUpRequest signUpRequest) throws Exception;

	public User findUserById(Long id) throws Exception;

	public User findUserByToken(String token) throws Exception;

	public User updateUser(Long userId, UpdateUserRequest req) throws Exception;

	public Set<User> searchUser(String query);

}
