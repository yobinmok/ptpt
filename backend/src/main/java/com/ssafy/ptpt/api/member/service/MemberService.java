package com.ssafy.ptpt.api.member.service;

import com.ssafy.ptpt.db.entity.Member;
import com.ssafy.ptpt.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public Member findMemberByOauthId(String memberId){
        return memberRepository.findByOauthId(memberId).orElse(null);
    }

    public Member saveMember(Member member){
        return memberRepository.save(member);
    }
}
