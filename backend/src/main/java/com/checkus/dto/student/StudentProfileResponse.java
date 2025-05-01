package com.checkus.dto.student;

import com.checkus.domain.StudentProfile;
import com.checkus.domain.StudentProfile.Gender;
import com.checkus.domain.StudentProfile.StudentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileResponse {
    
    private Long userId;
    private String name;
    private String email;
    private StudentStatus status;
    private String statusDisplayName;
    private Long schoolId;
    private String schoolName;
    private Integer grade;
    private Gender gender;
    private String genderDisplayName;
    
    public static StudentProfileResponse fromEntity(StudentProfile studentProfile) {
        return StudentProfileResponse.builder()
                .userId(studentProfile.getUserId())
                .name(studentProfile.getUser().getName())
                .email(studentProfile.getUser().getEmail())
                .status(studentProfile.getStatus())
                .statusDisplayName(studentProfile.getStatus().getDisplayName())
                .schoolId(studentProfile.getSchool() != null ? studentProfile.getSchool().getId() : null)
                .schoolName(studentProfile.getSchool() != null ? studentProfile.getSchool().getName() : null)
                .grade(studentProfile.getGrade())
                .gender(studentProfile.getGender())
                .genderDisplayName(studentProfile.getGender() != null ? studentProfile.getGender().getDisplayName() : null)
                .build();
    }
}