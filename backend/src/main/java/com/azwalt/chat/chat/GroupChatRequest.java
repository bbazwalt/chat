package com.azwalt.chat.chat;

import java.util.Set;

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

	@NotNull
	@Size(min = 1, max = 255, message = "{chat.constraints.chatName.Size.message}")
	private String chatName;

	private String chatImage;

}
