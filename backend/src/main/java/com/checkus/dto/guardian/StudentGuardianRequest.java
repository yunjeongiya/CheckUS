package com.checkus.dto.guardian;

import com.checkus.domain.StudentGuardian.Relationship;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentGuardianRequest {
    
    @NotNull
    private Long studentId;
    
    @NotNull
    private Long guardianId;
    
    @NotNull
    private Relationship relationship;
}