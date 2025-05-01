package com.checkus.dto.guardian;

import com.checkus.domain.StudentGuardian;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentGuardianResponse {
    
    private Long studentId;
    private String studentName;
    private Long guardianId;
    private String guardianName;
    private StudentGuardian.Relationship relationship;
    private String relationshipDisplayName;
    
    public static StudentGuardianResponse fromEntity(StudentGuardian studentGuardian) {
        return StudentGuardianResponse.builder()
                .studentId(studentGuardian.getStudent().getId())
                .studentName(studentGuardian.getStudent().getName())
                .guardianId(studentGuardian.getGuardian().getId())
                .guardianName(studentGuardian.getGuardian().getName())
                .relationship(studentGuardian.getRelationship())
                .relationshipDisplayName(studentGuardian.getRelationship().getDisplayName())
                .build();
    }
}