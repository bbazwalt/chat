package com.azwalt.chat.shared;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.azwalt.chat.chat.ChatException;
import com.azwalt.chat.message.MessageException;
import com.azwalt.chat.user.UserException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ApiErrorResponse> badCredentialsExceptionHandler(
			BadCredentialsException badCredentialsException,
			WebRequest webRequest) {
		ApiErrorResponse apiErrorResponse = new ApiErrorResponse(badCredentialsException.getMessage(),
				webRequest.getDescription(false));
		return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(UserException.class)
	public ResponseEntity<ApiErrorResponse> UserExceptionHandler(UserException userException, WebRequest webRequest) {
		ApiErrorResponse apiErrorResponse = new ApiErrorResponse(userException.getMessage(),
				webRequest.getDescription(false));
		return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<ApiErrorResponse> usernameNotFoundExceptionHandler(
			UsernameNotFoundException usernameNotFoundException,
			WebRequest webRequest) {
		ApiErrorResponse apiErrorResponse = new ApiErrorResponse(usernameNotFoundException.getMessage(),
				webRequest.getDescription(false));
		return new ResponseEntity<>(apiErrorResponse, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(MessageException.class)
	public ResponseEntity<ApiErrorResponse> messageExceptionHandler(MessageException messageException,
			WebRequest webRequest) {
		ApiErrorResponse apiErrorResponse = new ApiErrorResponse(messageException.getMessage(),
				webRequest.getDescription(false));
		return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ChatException.class)
	public ResponseEntity<ApiErrorResponse> chatExceptionHandler(ChatException chatException, WebRequest webRequest) {
		ApiErrorResponse apiErrorResponse = new ApiErrorResponse(chatException.getMessage(),
				webRequest.getDescription(false));
		return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<ApiErrorResponse> methodArgumentTypeMismatchExceptionHandler(
			MethodArgumentTypeMismatchException methodArgumentTypeMismatchException,
			WebRequest webRequest) {
		ApiErrorResponse apiErrorResponse = new ApiErrorResponse("Invalid input.", webRequest.getDescription(false));
		return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ApiErrorResponse> illegalArgumentExceptionHandler(
			IllegalArgumentException illegalArgumentException,
			WebRequest webRequest) {
		ApiErrorResponse apiErrorResponse = new ApiErrorResponse(illegalArgumentException.getMessage(),
				webRequest.getDescription(false));
		return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiErrorResponse> methodArgumentNotValidExceptionHandler(
			MethodArgumentNotValidException methodArgumentNotValidException,
			WebRequest webRequest) {

		@SuppressWarnings("null")
		String exception = methodArgumentNotValidException.getBindingResult().getFieldError().getDefaultMessage();
		ApiErrorResponse apiErrorResponse = new ApiErrorResponse("Invalid input.", exception);
		return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ApiErrorResponse> noHandlerFoundExceptionHandler(
			NoHandlerFoundException noHandlerFoundException,
			WebRequest webRequest) {
		ApiErrorResponse apiErrorResponse = new ApiErrorResponse("Endpoint not found.",
				noHandlerFoundException.getMessage());
		return new ResponseEntity<>(apiErrorResponse, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(NoResourceFoundException.class)
	public ResponseEntity<ApiErrorResponse> noResourceFoundExceptionHandler(
			NoResourceFoundException noResourceFoundException, WebRequest webRequest) {
		ApiErrorResponse apiErrorResponse = new ApiErrorResponse("Resource not found.",
				noResourceFoundException.getMessage());
		return new ResponseEntity<>(apiErrorResponse, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiErrorResponse> otherExceptionHandler(Exception exception, WebRequest webRequest) {
		ApiErrorResponse apiErrorResponse = new ApiErrorResponse("An error occurred.",
				exception.getMessage());
		return new ResponseEntity<>(apiErrorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
