package com.azwalt.chat.chat;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.chat.shared.ApiResponse;
import com.azwalt.chat.user.User;
import com.azwalt.chat.user.UserException;
import com.azwalt.chat.user.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("/api/v1/chats")
public class ChatController {

	private ChatService chatService;
	private UserService userService;

	public ChatController(ChatService chatService, UserService userService) {
		super();
		this.chatService = chatService;
		this.userService = userService;
	}

	@PostMapping("/single")
	public ResponseEntity<?> createChat(@RequestBody @NotNull @Valid SingleChatRequest singleChatRequest,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			Chat chat = chatService.createChat(user, singleChatRequest.getUserId());
			return new ResponseEntity<>(chat, HttpStatus.OK);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException | ChatException | IllegalArgumentException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while creating the chat.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/group")
	public ResponseEntity<?> createGroup(@RequestBody @NotNull @Valid GroupChatRequest groupChatRequest,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			Chat chat = chatService.createGroup(groupChatRequest, user);
			return new ResponseEntity<>(chat, HttpStatus.OK);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException | IllegalArgumentException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while creating the group.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping
	public ResponseEntity<?> findAllChatsByUserId(@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			Set<Chat> chats = chatService.findAllChatsByUserId(user.getId());
			return new ResponseEntity<>(chats, HttpStatus.OK);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException | IllegalArgumentException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while finding all the chats.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{chatId}")
	public ResponseEntity<ApiResponse> deleteChat(@PathVariable @NotNull Long chatId,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			chatService.deleteChat(chatId, user.getId());
			ApiResponse res = new ApiResponse("Chat deleted successfully.", true);
			return new ResponseEntity<>(res, HttpStatus.OK);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException | ChatException | IllegalArgumentException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(
					new ApiResponse("An error occurred while deleting the chat.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
