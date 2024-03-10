package com.azwalt.chat.chat;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

import com.azwalt.chat.message.Message;
import com.azwalt.chat.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chat {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String chatName;
	private String chatImage;
	private boolean isGroup;

	@ManyToOne
	@JoinColumn(name = "created_by")
	private User createdBy;

	@ManyToMany
	private Set<User> users = new LinkedHashSet<>();

	@JsonIgnore
	@OneToMany
	private Set<Message> messages = new LinkedHashSet<>();

	private Instant createdAt;

}
