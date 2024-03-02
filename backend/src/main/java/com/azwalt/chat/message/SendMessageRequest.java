package com.azwalt.chat.message;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {

	private Long userId;

	@NotNull
	private Long chatId;

	@NotNull
	@Size(min = 1, max = 255, message = "{message.constraints.content.Size.message}")
	private String content;

}
