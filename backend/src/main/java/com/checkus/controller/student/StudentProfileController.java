package com.checkus.controller.student;

import com.checkus.dto.student.StudentProfileRequest;
import com.checkus.dto.student.StudentProfileResponse;
import com.checkus.service.student.StudentProfileService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentProfileController {
    
    private final StudentProfileService studentProfileService;
    
    public StudentProfileController(StudentProfileService studentProfileService) {
        this.studentProfileService = studentProfileService;
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<Page<StudentProfileResponse>> getAllStudentProfiles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Page<StudentProfileResponse> studentProfiles = studentProfileService.getAllStudentProfiles(pageable);
        return ResponseEntity.ok(studentProfiles);
    }
    
    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<Page<StudentProfileResponse>> searchStudents(
            @RequestParam(required = false) Long schoolId,
            @RequestParam(required = false) Integer grade,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<StudentProfileResponse> studentProfiles = studentProfileService.searchStudents(schoolId, grade, name, pageable);
        
        return ResponseEntity.ok(studentProfiles);
    }
    
    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER') or @securityUtils.isCurrentUser(#userId)")
    public ResponseEntity<StudentProfileResponse> getStudentProfile(@PathVariable Long userId) {
        StudentProfileResponse studentProfile = studentProfileService.getStudentProfileByUserId(userId);
        return ResponseEntity.ok(studentProfile);
    }
    
    @PostMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<StudentProfileResponse> createStudentProfile(
            @PathVariable Long userId,
            @Valid @RequestBody StudentProfileRequest request) {
        
        StudentProfileResponse createdProfile = studentProfileService.createStudentProfile(userId, request);
        
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .buildAndExpand(createdProfile.getUserId())
                .toUri();
        
        return ResponseEntity.created(location).body(createdProfile);
    }
    
    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<StudentProfileResponse> updateStudentProfile(
            @PathVariable Long userId,
            @Valid @RequestBody StudentProfileRequest request) {
        
        StudentProfileResponse updatedProfile = studentProfileService.updateStudentProfile(userId, request);
        return ResponseEntity.ok(updatedProfile);
    }
    
    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteStudentProfile(@PathVariable Long userId) {
        studentProfileService.deleteStudentProfile(userId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/school/{schoolId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<List<StudentProfileResponse>> getStudentsBySchool(@PathVariable Long schoolId) {
        List<StudentProfileResponse> students = studentProfileService.getStudentsBySchool(schoolId);
        return ResponseEntity.ok(students);
    }
    
    @GetMapping("/school/{schoolId}/grade/{grade}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<List<StudentProfileResponse>> getStudentsBySchoolAndGrade(
            @PathVariable Long schoolId,
            @PathVariable Integer grade) {
        
        List<StudentProfileResponse> students = studentProfileService.getStudentsBySchoolAndGrade(schoolId, grade);
        return ResponseEntity.ok(students);
    }
}