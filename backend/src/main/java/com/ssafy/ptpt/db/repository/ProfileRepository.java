package com.ssafy.ptpt.db.repository;

import com.ssafy.ptpt.db.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {
}