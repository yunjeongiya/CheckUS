package com.checkus.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_guardian")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentGuardian {

    @EmbeddedId
    private StudentGuardianId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("guardianId")
    @JoinColumn(name = "guardian_id")
    private User guardian;

    @Enumerated(EnumType.STRING)
    private Relationship relationship;

    /**
     * 보호자와 학생 간의 관계 열거형
     */
    public enum Relationship {
        FATHER("부"),
        MOTHER("모"),
        OTHER("기타");

        private final String displayName;

        Relationship(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}