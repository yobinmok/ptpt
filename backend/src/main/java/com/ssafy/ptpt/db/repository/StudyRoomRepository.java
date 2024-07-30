package com.ssafy.ptpt.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StudyRoomRepository {
    private final JPAQueryFactory queryFactory;
}
