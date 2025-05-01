CREATE TABLE `User` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `email` varchar(255) UNIQUE,
  `password` varchar(255),
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `StudentProfile` (
  `user_id` integer PRIMARY KEY COMMENT '학생 역할의 User만 허용',
  `status` varchar(255) COMMENT 'ENUM: 문의/재원/대기/퇴원',
  `school_id` integer,
  `grade` integer,
  `gender` varchar(255) COMMENT 'ENUM: 남/여/기타'
);

CREATE TABLE `School` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `Role` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE COMMENT '학생, 교사, 보호자 등의 역할'
);

CREATE TABLE `UserRole` (
  `user_id` integer,
  `role_id` integer,
  PRIMARY KEY (`user_id`, `role_id`)
);

CREATE TABLE `Permission` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE
);

CREATE TABLE `RolePermission` (
  `role_id` integer,
  `permission_id` integer,
  PRIMARY KEY (`role_id`, `permission_id`)
);

CREATE TABLE `StudentGuardian` (
  `student_id` integer COMMENT '학생 역할의 User만 허용',
  `guardian_id` integer COMMENT '보호자 역할의 User만 허용',
  PRIMARY KEY (`student_id`, `guardian_id`)
);

CREATE TABLE `Class` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `TeacherClass` (
  `teacher_id` integer COMMENT '교사 역할의 User만 허용',
  `class_id` integer,
  PRIMARY KEY (`teacher_id`, `class_id`)
);

CREATE TABLE `StudentClass` (
  `student_id` integer COMMENT '학생 역할의 User만 허용',
  `class_id` integer,
  PRIMARY KEY (`student_id`, `class_id`)
);

CREATE TABLE `WeeklySchedule` (
  `id` integer PRIMARY KEY,
  `student_id` integer COMMENT '학생 역할의 User만 허용',
  `day_of_week` integer COMMENT '0-6: 월-일',
  `start_time` time,
  `end_time` time,
  `activity` varchar(255)
);

CREATE TABLE `AssignedStudyTime` (
  `id` integer PRIMARY KEY,
  `student_id` integer COMMENT '학생 역할의 User만 허용',
  `start_time` timestamp,
  `end_time` timestamp,
  `activity` varchar(255),
  `assigned_by` integer COMMENT '교사 역할의 User만 허용'
);

CREATE TABLE `ActualStudyTime` (
  `id` integer PRIMARY KEY,
  `student_id` integer COMMENT '학생 역할의 User만 허용',
  `start_time` timestamp,
  `end_time` timestamp,
  `activity` varchar(255),
  `source` varchar(255) COMMENT '기록 출처(예: 디스코드)'
);

CREATE TABLE `TaskType` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `Task` (
  `id` integer PRIMARY KEY,
  `type_id` integer,
  `parent_id` integer,
  `title` varchar(255) NOT NULL,
  `description` text,
  `is_leaf` boolean DEFAULT false COMMENT '실제 과제인지 여부'
);

CREATE TABLE `Material` (
  `id` integer PRIMARY KEY,
  `task_id` integer,
  `title` varchar(255) NOT NULL,
  `is_video` boolean,
  `completion_condition` varchar(255)
);

CREATE TABLE `AssignedTask` (
  `id` integer PRIMARY KEY,
  `task_id` integer COMMENT '원본 과제와의 논리적 연결',
  `student_id` integer COMMENT '학생 역할의 User만 허용',
  `teacher_id` integer COMMENT '교사 역할의 User만 허용',
  `title` varchar(255) NOT NULL,
  `description` text,
  `assigned_date` timestamp DEFAULT (now()),
  `due_date` timestamp
);

ALTER TABLE `StudentProfile` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `StudentProfile` ADD FOREIGN KEY (`school_id`) REFERENCES `School` (`id`);

ALTER TABLE `UserRole` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `UserRole` ADD FOREIGN KEY (`role_id`) REFERENCES `Role` (`id`);

ALTER TABLE `RolePermission` ADD FOREIGN KEY (`role_id`) REFERENCES `Role` (`id`);

ALTER TABLE `RolePermission` ADD FOREIGN KEY (`permission_id`) REFERENCES `Permission` (`id`);

ALTER TABLE `StudentGuardian` ADD FOREIGN KEY (`student_id`) REFERENCES `User` (`id`);

ALTER TABLE `StudentGuardian` ADD FOREIGN KEY (`guardian_id`) REFERENCES `User` (`id`);

ALTER TABLE `TeacherClass` ADD FOREIGN KEY (`teacher_id`) REFERENCES `User` (`id`);

ALTER TABLE `TeacherClass` ADD FOREIGN KEY (`class_id`) REFERENCES `Class` (`id`);

ALTER TABLE `StudentClass` ADD FOREIGN KEY (`student_id`) REFERENCES `User` (`id`);

ALTER TABLE `StudentClass` ADD FOREIGN KEY (`class_id`) REFERENCES `Class` (`id`);

ALTER TABLE `WeeklySchedule` ADD FOREIGN KEY (`student_id`) REFERENCES `User` (`id`);

ALTER TABLE `AssignedStudyTime` ADD FOREIGN KEY (`student_id`) REFERENCES `User` (`id`);

ALTER TABLE `AssignedStudyTime` ADD FOREIGN KEY (`assigned_by`) REFERENCES `User` (`id`);

ALTER TABLE `ActualStudyTime` ADD FOREIGN KEY (`student_id`) REFERENCES `User` (`id`);

ALTER TABLE `Task` ADD FOREIGN KEY (`type_id`) REFERENCES `TaskType` (`id`);

ALTER TABLE `Task` ADD FOREIGN KEY (`parent_id`) REFERENCES `Task` (`id`);

ALTER TABLE `Material` ADD FOREIGN KEY (`task_id`) REFERENCES `Task` (`id`);

ALTER TABLE `AssignedTask` ADD FOREIGN KEY (`task_id`) REFERENCES `Task` (`id`);

ALTER TABLE `AssignedTask` ADD FOREIGN KEY (`student_id`) REFERENCES `User` (`id`);

ALTER TABLE `AssignedTask` ADD FOREIGN KEY (`teacher_id`) REFERENCES `User` (`id`);