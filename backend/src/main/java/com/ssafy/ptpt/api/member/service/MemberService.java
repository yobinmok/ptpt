package com.ssafy.ptpt.api.member.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.ptpt.api.member.response.MemberProfileResponse;
import com.ssafy.ptpt.db.jpa.entity.Member;
import com.ssafy.ptpt.db.jpa.entity.Profile;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import com.ssafy.ptpt.db.jpa.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;
    private final JPAQueryFactory jpaQueryFactory;

    public Member findMemberByOauthId(String memberId){
        return memberRepository.findByOauthId(memberId);
    }

    public Member saveMember(String oauthId){
        Member member = memberRepository.findByOauthId(oauthId);
        if (member == null) {
            member = new Member(oauthId);
            return memberRepository.save(member);
        }
        return null;
    }

    public void saveProfile(Long memberId){
        Profile profile = new Profile(memberId);
        profileRepository.save(profile);
    }

//    public MemberProfileResponse findMemberProfile(String oauthId) {
//        Member member = memberRepository.findByOauthId(oauthId);
//        jpaQueryFactory
//                .select(memberId, )
//        MemberProfileResponse memberProfileResponse = new MemberProfileResponse();
//
//    }
}
