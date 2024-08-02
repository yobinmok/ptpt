package com.ssafy.ptpt.db.jpa.repository;

import com.ssafy.ptpt.db.jpa.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {

    Optional<StudyRoom> findByStudyRoomTitle(String studyRoomTitle);
}
