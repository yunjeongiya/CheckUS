package com.checkus.repository;

import com.checkus.domain.StudentProfile;
import com.checkus.domain.School;
import com.checkus.domain.StudentProfile.StudentStatus;
import com.checkus.domain.StudentProfile.Gender;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    
    // 특정 학교에 소속된 모든 학생 프로필 조회
    List<StudentProfile> findBySchool(School school);
    
    // 특정 학교의 특정 학년에 소속된 학생 프로필 조회
    List<StudentProfile> findBySchoolAndGrade(School school, Integer grade);
    
    // 특정 상태의 학생 프로필 조회
    List<StudentProfile> findByStatus(StudentStatus status);
    
    // 특정 학교의 특정 상태 학생 프로필 페이징 조회
    Page<StudentProfile> findBySchoolAndStatus(School school, StudentStatus status, Pageable pageable);
    
    // 학교, 학년, 이름으로 검색 (JPQL 사용)
    @Query("SELECT sp FROM StudentProfile sp JOIN sp.user u " +
           "WHERE (:schoolId IS NULL OR sp.school.id = :schoolId) " +
           "AND (:grade IS NULL OR sp.grade = :grade) " +
           "AND (:name IS NULL OR u.name LIKE %:name%)")
    Page<StudentProfile> searchStudents(
            @Param("schoolId") Long schoolId,
            @Param("grade") Integer grade,
            @Param("name") String name,
            Pageable pageable);
    
    // 사용자 ID로 학생 프로필 조회
    Optional<StudentProfile> findByUserId(Long userId);
}