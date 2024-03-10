package com.azwalt.chat.message;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateMessageRequest {

	private Long userId;

	@NotNull
	private Long chatId;

	@NotBlank(message = "{message.constraints.content.NotBlank.message}")
	@Size(max = 255, message = "{message.constraints.content.Size.message}")
	private String content;

}
