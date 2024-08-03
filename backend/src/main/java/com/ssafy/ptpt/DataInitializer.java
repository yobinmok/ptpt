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
                1,
                time,
                1L,
                null,
                null
        );
        memberRepository.save(member);

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
        EntryList entryList = new EntryList(studyRoom, studyRoom.getOauthId());
        entryListRepository.save(entryList);

        Comment comment = new Comment();
        commentRepository.save(comment);

        Evaluation evaluation1 = new Evaluation(
                studyRoom,
                statistic,
                comment,
                member,
                100,
                100,
                100,
                100,
                100
        );
        evaluationRepository.save(evaluation1);

        comment.setEvaluation(evaluation1);
        comment.setCommentContent("testContent");
        comment.setIsAnonymous(0);

        commentRepository.save(comment);

        statistic.createStatistic(evaluation1);

        Evaluation evaluation2 = new Evaluation(
                studyRoom,
                statistic,
                comment,
                member,
                90,
                90,
                90,
                90,
                90
        );
        evaluationRepository.save(evaluation2);

        comment.setEvaluation(evaluation2);
        comment.setCommentContent("testContent");
        comment.setIsAnonymous(0);

        commentRepository.save(comment);

        statistic.updateStatistic(evaluation2);
        statisticRepository.save(statistic);

        profile.setStatisticId(statistic.getStatisticId());
        profileRepository.save(profile);
    }
}
