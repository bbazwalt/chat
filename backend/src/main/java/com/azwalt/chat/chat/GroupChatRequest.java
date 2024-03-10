package com.azwalt.chat.chat;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupChatRequest {

	@NotNull
	private Set<Long> userIds;

	@NotBlank(message = "{chat.constraints.chatName.NotBlank.message}")
	@Size(max = 255, message = "{chat.constraints.chatName.Size.message}")
	private String chatName;

	private String chatImage;

}
