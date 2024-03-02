package com.azwalt.chat.chat;

import java.util.Set;

import com.azwalt.chat.user.User;

public interface ChatService {

	public Chat createChat(User user, Long userId) throws Exception;

	public Chat findChatById(Long chatId, User user) throws Exception;

	public Set<Chat> findAllChatsByUserId(Long userId) throws Exception;

	public Chat createGroup(GroupChatRequest req, User user) throws Exception;

	public void deleteChat(Long chatId, Long userId) throws Exception;

}
