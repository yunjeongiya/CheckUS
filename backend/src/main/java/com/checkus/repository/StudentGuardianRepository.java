package com.checkus.repository;

import com.checkus.domain.StudentGuardian;
import com.checkus.domain.StudentGuardianId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentGuardianRepository extends JpaRepository<StudentGuardian, StudentGuardianId> {
    
    List<StudentGuardian> findByStudentId(Long studentId);
    
    List<StudentGuardian> findByGuardianId(Long guardianId);
}