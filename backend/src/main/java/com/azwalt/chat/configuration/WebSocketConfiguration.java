package com.azwalt.chat.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

	@Override
	public void registerStompEndpoints(@NonNull StompEndpointRegistry registry) {
		registry.addEndpoint("/ws").setAllowedOrigins(CorsConstants.CORS_API_URL).withSockJS();
	}

	@Override
	public void configureMessageBroker(@NonNull MessageBrokerRegistry registry) {
		registry.setApplicationDestinationPrefixes("/app");
		registry.enableSimpleBroker("/group", "/user", "/chat");
		registry.setUserDestinationPrefix("/user");
	}

}
