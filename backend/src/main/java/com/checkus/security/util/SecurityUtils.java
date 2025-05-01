package com.checkus.security.util;

import com.checkus.security.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("securityUtils")
public class SecurityUtils {
    
    /**
     * 현재 인증된 사용자의 ID를 조회합니다.
     *
     * @return 현재 인증된 사용자의 ID, 인증되지 않은 경우 null
     */
    public static Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            return ((CustomUserDetails) authentication.getPrincipal()).getId();
        }
        
        return null;
    }
    
    /**
     * 현재 인증된 사용자가 요청한 사용자와 동일한지 확인합니다.
     *
     * @param userId 확인할 사용자 ID
     * @return 현재 사용자가 요청한 사용자와 동일한 경우 true, 그렇지 않은 경우 false
     */
    public static boolean isCurrentUser(Long userId) {
        Long currentUserId = getCurrentUserId();
        return currentUserId != null && currentUserId.equals(userId);
    }
    
    /**
     * 현재 인증된 사용자가 관리자 역할을 가지고 있는지 확인합니다.
     *
     * @return 관리자 역할을 가지고 있는 경우 true, 그렇지 않은 경우 false
     */
    public static boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        return authentication != null && 
               authentication.getAuthorities().stream()
                   .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
    }
    
    /**
     * 현재 인증된 사용자가 교사 역할을 가지고 있는지 확인합니다.
     *
     * @return 교사 역할을 가지고 있는 경우 true, 그렇지 않은 경우 false
     */
    public static boolean isTeacher() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        return authentication != null && 
               authentication.getAuthorities().stream()
                   .anyMatch(authority -> authority.getAuthority().equals("ROLE_TEACHER"));
    }
}