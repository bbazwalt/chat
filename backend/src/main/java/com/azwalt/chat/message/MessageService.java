package com.azwalt.chat.message;

import java.util.Set;

import com.azwalt.chat.user.User;

public interface MessageService {

	public Message createMessage(CreateMessageRequest createMessageRequest) throws Exception;

	public Message findMessageById(Long messageId) throws Exception;

	public Set<Message> findChatMessages(Long chatId, User user)
			throws Exception;

	public void deleteMessage(Long messageId, User user)
			throws Exception;

}
