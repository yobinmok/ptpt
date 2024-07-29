package com.ssafy.ptpt.db.repository;

import com.ssafy.ptpt.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {

}