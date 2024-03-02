package com.azwalt.chat.chat;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.azwalt.chat.message.MessageRepository;
import com.azwalt.chat.user.User;
import com.azwalt.chat.user.UserService;

@Service
public class ChatServiceImpl implements ChatService {

	private ChatRepository chatRepository;
	private MessageRepository messageRepository;
	private UserService userService;

	public ChatServiceImpl(ChatRepository chatRepository, MessageRepository messageRepository,
			UserService userService) {
		super();
		this.chatRepository = chatRepository;
		this.messageRepository = messageRepository;
		this.userService = userService;
	}

	@Override
	public Chat createChat(User user, Long userId) throws Exception {
		if (userId == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		if (user == null) {
			throw new IllegalArgumentException("User must not be null.");
		}
		User newUser = userService.findUserById(userId);
		Chat isChatExists = chatRepository.findSingleChatByUserIds(newUser, user);
		if (isChatExists != null) {
			throw new ChatException("Chat already exists with the given user.");
		}
		Chat chat = new Chat();
		chat.setCreatedBy(user);
		chat.getUsers().add(user);
		chat.getUsers().add(newUser);
		chat.setGroup(false);
		chat.setCreatedAt(Instant.now());
		return chatRepository.save(chat);
	}

	@Override
	public Chat findChatById(Long chatId, User user) throws Exception {
		if (chatId == null) {
			throw new IllegalArgumentException("Chat ID must not be null.");
		}
		if (user == null) {
			throw new IllegalArgumentException("User must not be null.");
		}

		Optional<Chat> chat = chatRepository.findById(chatId);

		if (chat.isPresent()) {
			Chat savedChat = chat.get();
			if (savedChat.getUsers().contains(user)
					|| savedChat.getUsers().contains(user)) {
				return savedChat;
			}
			throw new ChatException("User is not a member of this chat.");
		}
		throw new ChatException("No chat found with the given ID.");
	}

	@Override
	public Set<Chat> findAllChatsByUserId(Long userId) throws Exception {
		if (userId == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		User user = userService.findUserById(userId);
		Set<Chat> chats = chatRepository.findChatByUserId(user.getId());
		return chats;
	}

	@Override
	public Chat createGroup(GroupChatRequest groupChatRequest, User user) throws Exception {
		if (groupChatRequest == null) {
			throw new IllegalArgumentException("Group Chat Request must not be null.");
		}
		if (user == null) {
			throw new IllegalArgumentException("User must not be null.");
		}
		Chat group = new Chat();
		group.setGroup(true);
		if (groupChatRequest.getChatImage() != null) {
			group.setChatImage(groupChatRequest.getChatImage());
		}
		group.setChatName(groupChatRequest.getChatName());
		group.setCreatedBy(user);
		group.getUsers().add(user);
		for (Long userId : groupChatRequest.getUserIds()) {
			User addUser = userService.findUserById(userId);
			group.getUsers().add(addUser);
		}
		group.setCreatedAt(Instant.now());
		return chatRepository.save(group);
	}

	@Override
	public void deleteChat(Long chatId, Long userId) throws Exception {
		if (chatId == null) {
			throw new IllegalArgumentException("Chat ID must not be null.");
		}
		if (userId == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		Optional<Chat> opt = chatRepository.findById(chatId);
		if (opt.isPresent()) {
			messageRepository.deleteByChatId(chatId);
			chatRepository.deleteById(chatId);
		} else {
			throw new ChatException("No chat found with the given ID.");
		}
	}

}
