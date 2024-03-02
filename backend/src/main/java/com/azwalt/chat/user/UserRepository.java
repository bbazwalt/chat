package com.azwalt.chat.user;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

	public User findByUsername(String username);

	@Query("SELECT u FROM User u WHERE u.fullName LIKE %:query% OR u.username LIKE %:query%")
	public Set<User> searchUser(@Param("query") String query);

}
