package com.checkus.controller.guardian;

import com.checkus.dto.guardian.StudentGuardianRequest;
import com.checkus.dto.guardian.StudentGuardianResponse;
import com.checkus.service.guardian.StudentGuardianService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-guardians")
@RequiredArgsConstructor
public class StudentGuardianController {
    
    private final StudentGuardianService studentGuardianService;
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<StudentGuardianResponse> addGuardianToStudent(@Valid @RequestBody StudentGuardianRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(studentGuardianService.addGuardianToStudent(request));
    }
    
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<StudentGuardianResponse>> getGuardiansByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentGuardianService.getGuardiansByStudentId(studentId));
    }
    
    @GetMapping("/guardian/{guardianId}")
    public ResponseEntity<List<StudentGuardianResponse>> getStudentsByGuardianId(@PathVariable Long guardianId) {
        return ResponseEntity.ok(studentGuardianService.getStudentsByGuardianId(guardianId));
    }
    
    @DeleteMapping("/{studentId}/{guardianId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<Void> removeGuardianFromStudent(
            @PathVariable Long studentId, 
            @PathVariable Long guardianId) {
        studentGuardianService.removeGuardianFromStudent(studentId, guardianId);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<StudentGuardianResponse> updateRelationship(@Valid @RequestBody StudentGuardianRequest request) {
        return ResponseEntity.ok(studentGuardianService.updateRelationship(request));
    }
}