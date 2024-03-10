package com.azwalt.chat.user;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    @Size(min = 1, max = 255, message = "{user.constraints.fullName.Size.message}")
    private String fullName;

    private String profilePicture;

}
