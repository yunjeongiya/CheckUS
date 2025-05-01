package com.checkus.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiscordIdUpdateRequest {
    
    @NotBlank(message = "디스코드 아이디는 필수입니다.")
    @Size(max = 100, message = "디스코드 아이디는 100자 이하여야 합니다.")
    private String discordId;
}