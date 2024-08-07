package com.ssafy.ptpt.db.jpa.repository;

import com.ssafy.ptpt.db.jpa.entity.EntryList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EntryListRepository extends JpaRepository<EntryList, Long> {
    void deleteByStudyRoomId(Long studyRoomId);

    @Query("SELECT e.studyRoomId FROM EntryList e WHERE e.memberId = :memberId")
    Long findStudyRoomIdByMemberId(@Param("memberId") Long memberId);
}
