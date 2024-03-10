package com.azwalt.chat.chat;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.azwalt.chat.message.MessageRepository;
import com.azwalt.chat.user.User;
import com.azwalt.chat.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

	private final ChatRepository chatRepository;
	private final MessageRepository messageRepository;
	private final UserService userService;

	@Override
	public Chat createChat(User user, Long userId) throws Exception {
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
	public Chat createGroup(GroupChatRequest groupChatRequest, User user) throws Exception {
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
	public Chat findChatById(Long chatId, User user) throws Exception {
		Optional<Chat> chat = chatRepository.findById(chatId);
		if (chat.isPresent()) {
			Chat savedChat = chat.get();
			if (savedChat.getUsers().contains(user)
					|| savedChat.getCreatedBy().getId().equals(user.getId())) {
				return savedChat;
			}
			throw new ChatException("User is not a member of this chat.");
		}
		throw new ChatException("No chat found with the given ID.");
	}

	@Override
	public Set<Chat> findAllChatsByUserId(Long userId) throws Exception {
		User user = userService.findUserById(userId);
		return chatRepository.findChatByUserId(user.getId());
	}

	@Override
	public void deleteChat(Long chatId, Long userId) throws Exception {
		Optional<Chat> opt = chatRepository.findById(chatId);
		if (opt.isPresent()) {
			messageRepository.deleteByChatId(chatId);
			chatRepository.deleteById(chatId);
		} else {
			throw new ChatException("No chat found with the given ID.");
		}
	}

}
