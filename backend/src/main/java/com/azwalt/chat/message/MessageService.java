package com.azwalt.chat.message;

import java.util.Set;

import com.azwalt.chat.user.User;

public interface MessageService {

	public Message sendMessage(SendMessageRequest req) throws Exception;

	public Set<Message> findChatMessages(Long chatId, User user)
			throws Exception;

	public Message findMessageById(Long messageId) throws Exception;

	public void deleteMessage(Long messageId, User user)
			throws Exception;

}
