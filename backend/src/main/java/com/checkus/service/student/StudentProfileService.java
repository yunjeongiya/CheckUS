package com.checkus.service.student;

import com.checkus.domain.School;
import com.checkus.domain.StudentProfile;
import com.checkus.domain.User;
import com.checkus.dto.student.StudentProfileRequest;
import com.checkus.dto.student.StudentProfileResponse;
import com.checkus.repository.SchoolRepository;
import com.checkus.repository.StudentProfileRepository;
import com.checkus.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentProfileService {
    
    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final SchoolRepository schoolRepository;
    
    public StudentProfileService(StudentProfileRepository studentProfileRepository,
                                UserRepository userRepository,
                                SchoolRepository schoolRepository) {
        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
        this.schoolRepository = schoolRepository;
    }
    
    @Transactional(readOnly = true)
    public StudentProfileResponse getStudentProfileByUserId(Long userId) {
        StudentProfile studentProfile = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("학생 프로필을 찾을 수 없습니다. 사용자 ID: " + userId));
        
        return StudentProfileResponse.fromEntity(studentProfile);
    }
    
    @Transactional(readOnly = true)
    public Page<StudentProfileResponse> getAllStudentProfiles(Pageable pageable) {
        return studentProfileRepository.findAll(pageable)
                .map(StudentProfileResponse::fromEntity);
    }
    
    @Transactional(readOnly = true)
    public Page<StudentProfileResponse> searchStudents(Long schoolId, Integer grade, String name, Pageable pageable) {
        return studentProfileRepository.searchStudents(schoolId, grade, name, pageable)
                .map(StudentProfileResponse::fromEntity);
    }
    
    @Transactional
    public StudentProfileResponse createStudentProfile(Long userId, StudentProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다. ID: " + userId));
        
        if (studentProfileRepository.findByUserId(userId).isPresent()) {
            throw new RuntimeException("이미 학생 프로필이 존재합니다. 사용자 ID: " + userId);
        }
        
        School school = null;
        if (request.getSchoolId() != null) {
            school = schoolRepository.findById(request.getSchoolId())
                    .orElseThrow(() -> new RuntimeException("학교를 찾을 수 없습니다. ID: " + request.getSchoolId()));
        }
        
        StudentProfile studentProfile = StudentProfile.builder()
                .user(user)
                .status(request.getStatus())
                .school(school)
                .grade(request.getGrade())
                .gender(request.getGender())
                .build();
        
        StudentProfile savedProfile = studentProfileRepository.save(studentProfile);
        return StudentProfileResponse.fromEntity(savedProfile);
    }
    
    @Transactional
    public StudentProfileResponse updateStudentProfile(Long userId, StudentProfileRequest request) {
        StudentProfile studentProfile = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("학생 프로필을 찾을 수 없습니다. 사용자 ID: " + userId));
        
        School school = null;
        if (request.getSchoolId() != null) {
            school = schoolRepository.findById(request.getSchoolId())
                    .orElseThrow(() -> new RuntimeException("학교를 찾을 수 없습니다. ID: " + request.getSchoolId()));
        }
        
        studentProfile.setStatus(request.getStatus());
        studentProfile.setSchool(school);
        studentProfile.setGrade(request.getGrade());
        studentProfile.setGender(request.getGender());
        
        StudentProfile updatedProfile = studentProfileRepository.save(studentProfile);
        return StudentProfileResponse.fromEntity(updatedProfile);
    }
    
    @Transactional
    public void deleteStudentProfile(Long userId) {
        if (!studentProfileRepository.existsById(userId)) {
            throw new RuntimeException("학생 프로필을 찾을 수 없습니다. 사용자 ID: " + userId);
        }
        
        studentProfileRepository.deleteById(userId);
    }
    
    @Transactional(readOnly = true)
    public List<StudentProfileResponse> getStudentsBySchool(Long schoolId) {
        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> new RuntimeException("학교를 찾을 수 없습니다. ID: " + schoolId));
        
        return studentProfileRepository.findBySchool(school).stream()
                .map(StudentProfileResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<StudentProfileResponse> getStudentsBySchoolAndGrade(Long schoolId, Integer grade) {
        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> new RuntimeException("학교를 찾을 수 없습니다. ID: " + schoolId));
        
        return studentProfileRepository.findBySchoolAndGrade(school, grade).stream()
                .map(StudentProfileResponse::fromEntity)
                .collect(Collectors.toList());
    }
}