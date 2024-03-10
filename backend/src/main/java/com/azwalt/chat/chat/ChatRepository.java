package com.azwalt.chat.chat;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.azwalt.chat.user.User;

public interface ChatRepository extends JpaRepository<Chat, Long> {

	@Query("SELECT c FROM Chat c JOIN c.users u WHERE u.id = :userId ORDER BY c.createdAt DESC")
	public Set<Chat> findChatByUserId(@Param("userId") Long userId);

	@Query("SELECT c FROM Chat c WHERE c.isGroup = false AND :user MEMBER of c.users AND :reqUser MEMBER of c.users")
	public Chat findSingleChatByUserIds(@Param("user") User user, @Param("reqUser") User reqUser);
	
}
