package com.ssafy.ptpt.db.repository;

import com.ssafy.ptpt.db.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}