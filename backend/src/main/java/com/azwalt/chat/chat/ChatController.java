package com.azwalt.chat.chat;

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
@RequestMapping(ApiConstants.BASE_API_PATH + "/chats")
@Validated
public class ChatController {

	private final ChatService chatService;
	private final UserUtil userUtil;

	@PostMapping("/single")
	@ResponseStatus(HttpStatus.CREATED)
	public Chat createChat(@RequestBody @NotNull @Valid SingleChatRequest singleChatRequest) throws Exception {
		User user = userUtil.getCurrentUser();
		return chatService.createChat(user, singleChatRequest.getUserId());
	}

	@PostMapping("/group")
	@ResponseStatus(HttpStatus.CREATED)
	public Chat createGroup(@RequestBody @NotNull @Valid GroupChatRequest groupChatRequest) throws Exception {
		User user = userUtil.getCurrentUser();
		return chatService.createGroup(groupChatRequest, user);
	}

	@GetMapping
	public Set<Chat> findAllChatsByUserId() throws Exception {
		User user = userUtil.getCurrentUser();
		return chatService.findAllChatsByUserId(user.getId());
	}

	@DeleteMapping("/{chatId}")
	public ApiResponse deleteChat(@PathVariable @NotNull Long chatId) throws Exception {
		User user = userUtil.getCurrentUser();
		chatService.deleteChat(chatId, user.getId());
		return new ApiResponse("Chat deleted successfully.", true);
	}

}
