package com.azwalt.chat.message;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.azwalt.chat.chat.Chat;
import com.azwalt.chat.chat.ChatService;
import com.azwalt.chat.user.User;
import com.azwalt.chat.user.UserService;

@Service
public class MessageServiceImpl implements MessageService {

	private MessageRepository messageRepository;
	private UserService userService;
	private ChatService chatService;

	public MessageServiceImpl(MessageRepository messageRepository, UserService userService, ChatService chatService) {
		super();
		this.messageRepository = messageRepository;
		this.userService = userService;
		this.chatService = chatService;
	}

	@Override
	public Message sendMessage(SendMessageRequest sendMessageRequest) throws Exception {
		if (sendMessageRequest == null) {
			throw new IllegalArgumentException("Send Message Request must not be null.");
		}
		User user = userService.findUserById(sendMessageRequest.getUserId());
		Chat chat = chatService.findChatById(sendMessageRequest.getChatId(), user);
		Message message = new Message();
		message.setChat(chat);
		message.setUser(user);
		message.setContent(sendMessageRequest.getContent());
		message.setCreatedAt(Instant.now());
		return messageRepository.save(message);
	}

	@Override
	public Set<Message> findChatMessages(Long chatId, User user)
			throws Exception {
		if (chatId == null) {
			throw new IllegalArgumentException("Chat ID must not be null.");
		}
		if (user == null) {
			throw new IllegalArgumentException("User must not be null.");
		}
		Chat chat = chatService.findChatById(chatId, user);
		if (!chat.getUsers().contains(user)) {
			throw new MessageException("You are not related to this chat.");
		}
		Set<Message> messages = messageRepository.findByChatId(chat.getId());
		return messages;
	}

	@Override
	public Message findMessageById(Long messageId) throws Exception {
		if (messageId == null) {
			throw new IllegalArgumentException("Message ID must not be null.");
		}
		Optional<Message> opt = messageRepository.findById(messageId);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new MessageException("No message found with the given ID.");
	}

	@Override
	public void deleteMessage(Long messageId, User user)
			throws Exception {
		if (messageId == null) {
			throw new IllegalArgumentException("Message ID must not be null.");
		}
		Message message = findMessageById(messageId);
		if (message.getUser().getId().equals(user.getId())) {
			messageRepository.deleteById(messageId);
		} else {
			throw new MessageException("You must not delete another user's message.");
		}
	}

}
