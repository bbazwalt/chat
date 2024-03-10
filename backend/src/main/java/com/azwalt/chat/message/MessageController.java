package com.azwalt.chat.message;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.chat.shared.ApiConstants;
import com.azwalt.chat.shared.ApiResponse;
import com.azwalt.chat.user.User;
import com.azwalt.chat.user.UserUtil;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstants.BASE_API_PATH + "/messages")
@Validated
public class MessageController {

	private final MessageService messageService;
	private final UserUtil userUtil;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Message createMessage(@RequestBody @NotNull @Valid CreateMessageRequest createMessageRequest)
			throws Exception {
		User user = userUtil.getCurrentUser();
		createMessageRequest.setUserId(user.getId());
		return messageService.createMessage(createMessageRequest);
	}

	@GetMapping("/chat/{chatId}")
	public Set<Message> findChatMessages(@PathVariable @NotNull Long chatId) throws Exception {
		User user = userUtil.getCurrentUser();
		return messageService.findChatMessages(chatId, user);
	}

	@DeleteMapping("/{messageId}")
	public ApiResponse deleteMessage(@PathVariable @NotNull Long messageId) throws Exception {
		User user = userUtil.getCurrentUser();
		messageService.deleteMessage(messageId, user);
		return new ApiResponse("Message deleted successfully.", true);
	}

}
