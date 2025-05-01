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
    private String username;
    private String name;
    private String phoneNumber;
    private String discordId;
    
    public JwtAuthResponse(String accessToken, Long userId, String username, String name) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.username = username;
        this.name = name;
    }
    
    public JwtAuthResponse(String accessToken, Long userId, String username, String name, String phoneNumber, String discordId) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.username = username;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.discordId = discordId;
    }
}