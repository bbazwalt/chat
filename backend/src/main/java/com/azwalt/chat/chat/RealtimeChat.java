package com.azwalt.chat.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.azwalt.chat.message.Message;
import com.azwalt.chat.message.MessageDeletionNotification;

@Controller
public class RealtimeChat {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/chat/{chatId}")
	public Message sendToUser(@Payload Message message, @DestinationVariable String chatId)
			throws IllegalArgumentException {
		if (message == null) {
			throw new IllegalArgumentException("Message must not be null.");
		}
		if (chatId == null) {
			throw new IllegalArgumentException("Chat ID must not be null.");
		}
		simpMessagingTemplate.convertAndSendToUser(chatId, "/private", message);
		return message;
	}

	@MessageMapping("/chat/{chatId}/delete/{messageId}")
	public MessageDeletionNotification deleteMessage(@DestinationVariable String chatId,
			@DestinationVariable String messageId) throws IllegalArgumentException {
		if (chatId == null) {
			throw new IllegalArgumentException("Chat ID must not be null.");
		}
		MessageDeletionNotification messageDeletionNotification = new MessageDeletionNotification("deletion",
				Long.parseLong(messageId));
		simpMessagingTemplate.convertAndSendToUser(chatId, "/private", messageDeletionNotification);

		return messageDeletionNotification;
	}

}
