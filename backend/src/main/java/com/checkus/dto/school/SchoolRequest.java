package com.checkus.dto.school;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SchoolRequest {
    
    @NotBlank(message = "학교 이름은 필수입니다.")
    @Size(min = 2, max = 100, message = "학교 이름은 2자 이상 100자 이하여야 합니다.")
    private String name;
}