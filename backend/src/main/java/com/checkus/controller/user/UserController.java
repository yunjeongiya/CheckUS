package com.checkus.controller.user;

import com.checkus.domain.User;
import com.checkus.dto.user.DiscordIdUpdateRequest;
import com.checkus.repository.UserRepository;
import com.checkus.security.util.SecurityUtils;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * 사용자 자신의 디스코드 아이디 업데이트
     */
    @PutMapping("/me/discord-id")
    public ResponseEntity<String> updateMyDiscordId(@Valid @RequestBody DiscordIdUpdateRequest request) {
        // 현재 로그인한 사용자 ID 얻기
        Long userId = SecurityUtils.getCurrentUserId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

        user.setDiscordId(request.getDiscordId());
        userRepository.save(user);

        return ResponseEntity.ok("디스코드 아이디가 업데이트되었습니다.");
    }

    /**
     * 교사 권한을 가진 사용자만 다른 사용자의 디스코드 아이디 업데이트 가능
     */
    @PutMapping("/{userId}/discord-id")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<String> updateUserDiscordId(
            @PathVariable Long userId,
            @Valid @RequestBody DiscordIdUpdateRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

        user.setDiscordId(request.getDiscordId());
        userRepository.save(user);

        return ResponseEntity.ok("사용자의 디스코드 아이디가 업데이트되었습니다.");
    }
}