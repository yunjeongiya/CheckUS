package com.checkus.service.guardian;

import com.checkus.domain.StudentGuardian;
import com.checkus.domain.StudentGuardianId;
import com.checkus.domain.User;
import com.checkus.dto.guardian.StudentGuardianRequest;
import com.checkus.dto.guardian.StudentGuardianResponse;
import com.checkus.repository.StudentGuardianRepository;
import com.checkus.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentGuardianService {
    
    private final StudentGuardianRepository studentGuardianRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public StudentGuardianResponse addGuardianToStudent(StudentGuardianRequest request) {
        User student = userRepository.findById(request.getStudentId())
                .orElseThrow(() -> new EntityNotFoundException("학생을 찾을 수 없습니다: " + request.getStudentId()));
        
        User guardian = userRepository.findById(request.getGuardianId())
                .orElseThrow(() -> new EntityNotFoundException("보호자를 찾을 수 없습니다: " + request.getGuardianId()));
        
        StudentGuardianId id = new StudentGuardianId(request.getStudentId(), request.getGuardianId());
        
        StudentGuardian studentGuardian = StudentGuardian.builder()
                .id(id)
                .student(student)
                .guardian(guardian)
                .relationship(request.getRelationship())
                .build();
        
        studentGuardianRepository.save(studentGuardian);
        
        return StudentGuardianResponse.fromEntity(studentGuardian);
    }
    
    @Transactional(readOnly = true)
    public List<StudentGuardianResponse> getGuardiansByStudentId(Long studentId) {
        return studentGuardianRepository.findByStudentId(studentId).stream()
                .map(StudentGuardianResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<StudentGuardianResponse> getStudentsByGuardianId(Long guardianId) {
        return studentGuardianRepository.findByGuardianId(guardianId).stream()
                .map(StudentGuardianResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public void removeGuardianFromStudent(Long studentId, Long guardianId) {
        StudentGuardianId id = new StudentGuardianId(studentId, guardianId);
        studentGuardianRepository.deleteById(id);
    }
    
    @Transactional
    public StudentGuardianResponse updateRelationship(StudentGuardianRequest request) {
        StudentGuardianId id = new StudentGuardianId(request.getStudentId(), request.getGuardianId());
        
        StudentGuardian studentGuardian = studentGuardianRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("학생-보호자 관계를 찾을 수 없습니다"));
        
        studentGuardian.setRelationship(request.getRelationship());
        studentGuardianRepository.save(studentGuardian);
        
        return StudentGuardianResponse.fromEntity(studentGuardian);
    }
}