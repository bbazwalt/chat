package com.azwalt.chat.message;

import java.time.Instant;

import com.azwalt.chat.chat.Chat;
import com.azwalt.chat.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank(message = "{message.constraints.content.NotBlank.message}")
	@Size(max = 255, message = "{message.constraints.content.Size.message}")
	private String content;

	@ManyToOne
	private User user;

	@ManyToOne
	@JoinColumn(name = "chat_id")
	private Chat chat;

	private Instant createdAt;

}
