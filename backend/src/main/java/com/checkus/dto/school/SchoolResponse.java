package com.checkus.dto.school;

import com.checkus.domain.School;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SchoolResponse {
    
    private Long id;
    private String name;
    private int studentCount;
    
    public static SchoolResponse fromEntity(School school) {
        return SchoolResponse.builder()
                .id(school.getId())
                .name(school.getName())
                .studentCount(school.getStudents() != null ? school.getStudents().size() : 0)
                .build();
    }
    
    public static SchoolResponse fromEntity(School school, int studentCount) {
        return SchoolResponse.builder()
                .id(school.getId())
                .name(school.getName())
                .studentCount(studentCount)
                .build();
    }
}