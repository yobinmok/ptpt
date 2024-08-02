package com.ssafy.ptpt.db.jpa.repository;

import com.ssafy.ptpt.db.jpa.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}