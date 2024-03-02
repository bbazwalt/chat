package com.azwalt.chat.message;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface MessageRepository extends JpaRepository<Message, Long> {

	@Query("SELECT m FROM Message m JOIN m.chat c WHERE c.id=:chatId ORDER BY m.createdAt ASC")
	public Set<Message> findByChatId(@Param("chatId") Long chatId);

	@Transactional
	@Modifying
	@Query("DELETE FROM Message m WHERE m.chat.id=:chatId")
	public void deleteByChatId(@Param("chatId") Long chatId);
}
