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
import jakarta.validation.constraints.NotNull;
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

	@NotNull
	@Size(min = 1, max = 255, message = "{message.constraints.content.Size.message}")
	private String content;

	@ManyToOne
	private User user;

	@ManyToOne
	@JoinColumn(name = "chat_id")
	private Chat chat;

	private Instant createdAt;

}
