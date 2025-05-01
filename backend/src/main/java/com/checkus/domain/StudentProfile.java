package com.checkus.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_profile")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfile {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private StudentStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;

    private Integer grade;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    /**
     * 학생 상태 열거형
     */
    public enum StudentStatus {
        INQUIRY("문의"),
        ENROLLED("재원"),
        WAITING("대기"),
        WITHDRAWN("퇴원");

        private final String displayName;

        StudentStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    /**
     * 성별 열거형
     */
    public enum Gender {
        MALE("남"),
        FEMALE("여"),
        OTHER("기타");

        private final String displayName;

        Gender(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}