package com.ssafy.ptpt;

import com.ssafy.ptpt.db.jpa.entity.*;
import com.ssafy.ptpt.db.jpa.repository.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final CommentRepository commentRepository;
    private final EntryListRepository entryListRepository;
    private final EvaluationRepository evaluationRepository;
    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;
    private final ProfileRepository profileRepository;
    private final StatisticRepository statisticRepository;
    private final StudyRoomRepository studyRoomRepository;

    @PostConstruct
    public void init() {
        Timestamp time = new Timestamp(System.currentTimeMillis());

        // Member 저장
        Member member = new Member(
                "testMember",
                "test",
                "Google",
                "G123",
                "test@gmail.com",
                time,
                0,
                time,
                null,
                null,
                null
        );
        memberRepository.save(member);

        Member member2 = new Member(
                "testMember2",
                "test2",
                "Google2",
                "G1234",
                "test2@gmail.com",
                time,
                0,
                time,
                null,
                null,
                null
        );
        memberRepository.save(member2);

        // Role 저장
        Role role = new Role(member, "admin");
        roleRepository.save(role);

        // Profile 저장
        Profile profile = new Profile(member.getOauthId());
        profileRepository.save(profile);

        // statistic 저장
        Statistic statistic = new Statistic();
        statisticRepository.save(statistic);

        // StudyRoom 저장
        StudyRoom studyRoom = new StudyRoom(
                "testStudyRoom",
                1,
                "123",
                "15:00",
                "테스트",
                "test",
                1,
                member.getOauthId(),
                "studyRoomCode",
                member.getOauthId()
        );

        studyRoom = studyRoomRepository.save(studyRoom);

        // entryList 저장
        EntryList entryList = new EntryList(studyRoom.getStudyRoomId(), studyRoom.getOauthId());
        entryListRepository.save(entryList);

        Comment comment1 = new Comment();
        commentRepository.save(comment1);

        Evaluation evaluation1 = new Evaluation(
                studyRoom,
                statistic,
                comment1,
                member,
                100,
                100,
                100,
                100,
                100
        );
        evaluationRepository.save(evaluation1);

        comment1.setEvaluation(evaluation1);
        comment1.setCommentContent("testContent");
        comment1.setIsAnonymous(0);
        comment1.setNickname("testNickname");

        commentRepository.save(comment1);

        statistic.createStatistic(evaluation1);

        Comment comment2 = new Comment();
        commentRepository.save(comment2);

        Evaluation evaluation2 = new Evaluation(
                studyRoom,
                statistic,
                comment2,
                member,
                90,
                90,
                90,
                90,
                90
        );
        evaluationRepository.save(evaluation2);

        comment2.setEvaluation(evaluation2);
        comment2.setCommentContent("testContent");
        comment2.setIsAnonymous(0);
        comment2.setNickname("testNickname2");
        commentRepository.save(comment2);

        statistic.updateStatistic(evaluation2);
        statisticRepository.save(statistic);

        profile.setStatistic(statistic);
        profileRepository.save(profile);
    }
}
