package com.checkus.service.school;

import com.checkus.domain.School;
import com.checkus.dto.school.SchoolRequest;
import com.checkus.dto.school.SchoolResponse;
import com.checkus.repository.SchoolRepository;
import com.checkus.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchoolService {
    
    private final SchoolRepository schoolRepository;
    
    public SchoolService(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }
    
    @Transactional(readOnly = true)
    public List<SchoolResponse> getAllSchools() {
        return schoolRepository.findAll().stream()
                .map(SchoolResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public SchoolResponse getSchoolById(Long id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("학교를 찾을 수 없습니다. ID: " + id));
        
        return SchoolResponse.fromEntity(school);
    }
    
    @Transactional
    public SchoolResponse createSchool(SchoolRequest request) {
        if (schoolRepository.existsByName(request.getName())) {
            throw new RuntimeException("이미 존재하는 학교 이름입니다: " + request.getName());
        }
        
        School school = School.builder()
                .name(request.getName())
                .build();
        
        School savedSchool = schoolRepository.save(school);
        return SchoolResponse.fromEntity(savedSchool);
    }
    
    @Transactional
    public SchoolResponse updateSchool(Long id, SchoolRequest request) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("학교를 찾을 수 없습니다. ID: " + id));
        
        // 이름이 변경되었고, 새 이름이 이미 존재하는 경우 확인
        if (!school.getName().equals(request.getName()) && 
            schoolRepository.existsByName(request.getName())) {
            throw new RuntimeException("이미 존재하는 학교 이름입니다: " + request.getName());
        }
        
        school.setName(request.getName());
        School updatedSchool = schoolRepository.save(school);
        
        return SchoolResponse.fromEntity(updatedSchool);
    }
    
    @Transactional
    public void deleteSchool(Long id) {
        if (!schoolRepository.existsById(id)) {
            throw new RuntimeException("학교를 찾을 수 없습니다. ID: " + id);
        }
        
        schoolRepository.deleteById(id);
    }
}