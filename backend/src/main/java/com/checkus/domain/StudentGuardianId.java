package com.checkus.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentGuardianId implements Serializable {

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "guardian_id")
    private Long guardianId;
}