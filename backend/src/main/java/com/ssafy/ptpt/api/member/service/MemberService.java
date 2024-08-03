package com.ssafy.ptpt.api.member.service;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.ptpt.api.member.response.MemberProfileResponse;
import com.ssafy.ptpt.db.jpa.entity.*;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import com.ssafy.ptpt.db.jpa.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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

    public void saveProfile(Long memberId, String oauthId){
        Profile profile = new Profile(memberId, oauthId);
        profileRepository.save(profile);
    }

    public MemberProfileResponse findMemberProfile(String oauthId) {
        QMember member = QMember.member;
        QProfile profile = QProfile.profile;

        return jpaQueryFactory.select(
                        Projections.bean(
                                MemberProfileResponse.class,
                                member.nickname,
                                member.memberPicture,
                                profile.profileId,
                                profile.voiceModelId,
                                profile.statisticId,
                                profile.presetId))
                .from(member)
                .leftJoin(profile).on(member.profileId.eq(profile.profileId))
                .where(member.oauthId.eq(oauthId))
                .fetchOne();
    }
}
