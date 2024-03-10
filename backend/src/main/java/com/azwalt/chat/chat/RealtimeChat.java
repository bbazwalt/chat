package com.azwalt.chat.chat;

import org.springframework.lang.NonNull;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.azwalt.chat.message.Message;
import com.azwalt.chat.message.MessageDeletionNotification;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class RealtimeChat {

	private final SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/chat/{chatId}")
	public Message sendToUser(@Payload @NonNull Message message, @DestinationVariable @NonNull String chatId) {
		simpMessagingTemplate.convertAndSendToUser(chatId, "/private", message);
		return message;
	}

	@MessageMapping("/chat/{chatId}/delete/{messageId}")
	public MessageDeletionNotification deleteMessage(@DestinationVariable @NonNull String chatId,
			@DestinationVariable @NonNull String messageId) {
		MessageDeletionNotification messageDeletionNotification = new MessageDeletionNotification("deletion",
				Long.parseLong(messageId));
		simpMessagingTemplate.convertAndSendToUser(chatId, "/private", messageDeletionNotification);
		return messageDeletionNotification;
	}

}
