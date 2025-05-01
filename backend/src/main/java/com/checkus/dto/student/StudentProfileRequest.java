package com.checkus.dto.student;

import com.checkus.domain.StudentProfile.Gender;
import com.checkus.domain.StudentProfile.StudentStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileRequest {
    
    @NotNull(message = "학생 상태는 필수입니다.")
    private StudentStatus status;
    
    private Long schoolId;
    
    @Min(value = 1, message = "학년은 1 이상이어야 합니다.")
    @Max(value = 12, message = "학년은 12 이하여야 합니다.")
    private Integer grade;
    
    private Gender gender;
}