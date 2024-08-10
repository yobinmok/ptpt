package com.ssafy.ptpt.api.security.service;

import com.ssafy.ptpt.db.jpa.entity.Member;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String oauthId) throws UsernameNotFoundException {
        Member member = memberRepository.findByOauthId(oauthId);
        if (member == null) {
            throw new UsernameNotFoundException("User not found with oauthId: " + oauthId);
        }
        return new org.springframework.security.core.userdetails.User(String.valueOf(member.getMemberId()) , member.getOauthId(), member.getAuthorities());
    }
}
