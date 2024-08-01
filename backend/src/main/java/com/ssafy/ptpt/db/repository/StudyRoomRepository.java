package com.ssafy.ptpt.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.ptpt.db.entity.StudyRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {

    Optional<StudyRoom> findByStudyRoomTitle(String studyRoomTitle);
}
