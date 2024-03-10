package com.azwalt.chat.message;

import java.time.Instant;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.azwalt.chat.chat.Chat;
import com.azwalt.chat.chat.ChatService;
import com.azwalt.chat.user.User;
import com.azwalt.chat.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

	private final MessageRepository messageRepository;
	private final UserService userService;
	private final ChatService chatService;

	@Override
	public Message createMessage(CreateMessageRequest createMessageRequest) throws Exception {
		User user = userService.findUserById(createMessageRequest.getUserId());
		Chat chat = chatService.findChatById(createMessageRequest.getChatId(), user);
		Message message = new Message();
		message.setChat(chat);
		message.setUser(user);
		message.setContent(createMessageRequest.getContent());
		message.setCreatedAt(Instant.now());
		return messageRepository.save(message);
	}

	@Override
	public Message findMessageById(Long messageId) throws Exception {
		return messageRepository.findById(messageId)
				.orElseThrow(() -> new MessageException("No message found with the given ID."));
	}

	@Override
	public Set<Message> findChatMessages(Long chatId, User user) throws Exception {
		Chat chat = chatService.findChatById(chatId, user);
		if (!chat.getUsers().contains(user)) {
			throw new MessageException("You are not related to this chat.");
		}
		return messageRepository.findByChatId(chat.getId());
	}

	@Override
	public void deleteMessage(Long messageId, User user)
			throws Exception {
		Message message = findMessageById(messageId);
		if (message.getUser().getId().equals(user.getId())) {
			messageRepository.deleteById(messageId);
		} else {
			throw new MessageException("You can't delete another user's message.");
		}
	}

}
