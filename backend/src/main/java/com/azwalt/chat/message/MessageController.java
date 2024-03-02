package com.azwalt.chat.message;

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

import com.azwalt.chat.chat.ChatException;
import com.azwalt.chat.shared.ApiResponse;
import com.azwalt.chat.user.User;
import com.azwalt.chat.user.UserException;
import com.azwalt.chat.user.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
@Validated
@RequestMapping("api/v1/messages")
public class MessageController {

	private MessageService messageService;
	private UserService userService;

	public MessageController(MessageService messageService, UserService userService) {
		super();
		this.messageService = messageService;
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity<?> createMessage(@RequestBody @NotNull @Valid SendMessageRequest req,
			@RequestHeader("Authorization") @NotNull String token) {

		try {
			User user = userService.findUserByToken(token);
			req.setUserId(user.getId());
			Message message = messageService.sendMessage(req);
			return new ResponseEntity<>(message, HttpStatus.OK);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException | IllegalArgumentException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while creating the message.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/chat/{chatId}")
	public ResponseEntity<?> findChatMessages(@PathVariable @NotNull Long chatId,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			Set<Message> messages = messageService.findChatMessages(chatId, user);
			return new ResponseEntity<>(messages, HttpStatus.OK);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException | ChatException | MessageException | IllegalArgumentException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while getting the chat messages.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@DeleteMapping("/{messageId}")
	public ResponseEntity<ApiResponse> deleteMessage(@PathVariable @NotNull Long messageId,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			messageService.deleteMessage(messageId, user);
			return new ResponseEntity<>(new ApiResponse("Message deleted successfully.", true), HttpStatus.OK);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException | MessageException | IllegalArgumentException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while deleting the message.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
