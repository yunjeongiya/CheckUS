package com.checkus.controller.school;

import com.checkus.dto.school.SchoolRequest;
import com.checkus.dto.school.SchoolResponse;
import com.checkus.service.school.SchoolService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/schools")
public class SchoolController {
    
    private final SchoolService schoolService;
    
    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }
    
    @GetMapping
    public ResponseEntity<List<SchoolResponse>> getAllSchools() {
        List<SchoolResponse> schools = schoolService.getAllSchools();
        return ResponseEntity.ok(schools);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SchoolResponse> getSchoolById(@PathVariable Long id) {
        SchoolResponse school = schoolService.getSchoolById(id);
        return ResponseEntity.ok(school);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SchoolResponse> createSchool(@Valid @RequestBody SchoolRequest request) {
        SchoolResponse createdSchool = schoolService.createSchool(request);
        
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdSchool.getId())
                .toUri();
        
        return ResponseEntity.created(location).body(createdSchool);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SchoolResponse> updateSchool(
            @PathVariable Long id,
            @Valid @RequestBody SchoolRequest request) {
        
        SchoolResponse updatedSchool = schoolService.updateSchool(id, request);
        return ResponseEntity.ok(updatedSchool);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSchool(@PathVariable Long id) {
        schoolService.deleteSchool(id);
        return ResponseEntity.noContent().build();
    }
}