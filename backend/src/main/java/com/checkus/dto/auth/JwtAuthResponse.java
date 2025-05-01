package com.checkus.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {
    private String tokenType = "Bearer";
    private String accessToken;
    private Long userId;
    private String name;
    private String email;
    private String phoneNumber;
    private String discordId;
    
    public JwtAuthResponse(String accessToken, Long userId, String name, String email) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
    
    public JwtAuthResponse(String accessToken, Long userId, String name, String email, String phoneNumber, String discordId) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.discordId = discordId;
    }
}