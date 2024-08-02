package com.ssafy.ptpt.db.jpa.repository;

import com.ssafy.ptpt.db.jpa.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByOauthId(String oauthId);

}