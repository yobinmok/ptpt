package com.ssafy.ptpt.api.member.service;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.ptpt.api.member.request.MemberIdRequest;
import com.ssafy.ptpt.api.member.request.MemberUpdateRequest;
import com.ssafy.ptpt.api.member.response.MemberProfileResponse;
import com.ssafy.ptpt.db.jpa.entity.*;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import com.ssafy.ptpt.db.jpa.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public void saveProfile(Member member){
        Profile profile = new Profile(member);
        profileRepository.save(profile);
    }

    // 보이스 모델 ID를 추가해야 하는 로직
    public MemberProfileResponse findMemberProfile(String oauthId) {
        QMember qmember = QMember.member;
        QProfile profile = QProfile.profile;
        Member member = memberRepository.findByOauthId(oauthId);
        return jpaQueryFactory.select(
                        Projections.bean(
                                MemberProfileResponse.class,
                                qmember.nickname,
                                qmember.memberPicture,
                                qmember.profile.profileId,
                                profile.member.memberId,
                                profile.voiceModel.voiceModelId,
                                profile.statistic.statisticId,
                                profile.presetId))
                .from(qmember)
                .leftJoin(qmember.profile, profile)
                .where(qmember.memberId.eq(member.getMemberId()))
                .fetchOne();
    }

    // 사용자 탈퇴 기능
    public int withdrawMember(MemberIdRequest memberIdRequest) {
        return memberRepository.deleteMemberByOauthId(memberIdRequest.getOauthId());
    }

    // 사용자 정보 수정 기능
    public int modifyMemberInfo(MemberUpdateRequest memberUpdateRequest) {
        return memberRepository.modifyMemberInfo(memberUpdateRequest.getOauthId(),
                                                    memberUpdateRequest.getNickName(),
                                                    memberUpdateRequest.getMemberPicture());
    }

    // 사용자 신고횟수 조회 로직 추가
    public void memberReport(MemberIdRequest memberIdRequest) {
        Member member = memberRepository.findByOauthId(memberIdRequest.getOauthId());
        int memberReportCount = member.getMemberReportCount();
        if (memberReportCount == 2) {
            // 사용자 정지기능 추가
            member.memberReport();
        }else{
            member.memberReportCount(memberReportCount);
        }
    }
}
