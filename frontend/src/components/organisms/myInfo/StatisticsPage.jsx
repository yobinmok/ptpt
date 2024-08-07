import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../../store/actions/statisticsActions';
import RadarChart from './RadarChart';
import FeedbackListItem from './FeedbackListItem';
import styled from 'styled-components';

// 구분선 스타일 정의
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const FeedbackListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-weight: bold;
`;

const StatisticsPage = () => {
  const dispatch = useDispatch();
  const { loading, statistics, error } = useSelector(
    (state) => state.statistics
  );

  useEffect(() => {
    const oauthId = 'your_oauth_id_here'; // 실제 oauthId를 설정합니다.
    dispatch(fetchStatistics(oauthId));
  }, [dispatch]);

  useEffect(() => {
    console.log('Loading state:', loading);
    console.log('Statistics data:', statistics);
    console.log('Error state:', error);
  }, [loading, statistics, error]);

  // 임시 피드백 데이터 (나중에 실제 데이터로 대체해야 함)
  const feedbackData = [
    {
      roomName: '스터디룸 이름1',
      date: '2024-07-21',
      subject: '프로젝트',
      roomId: 1,
    },
    {
      roomName: '보안 스터디',
      date: '2024-06-12',
      subject: '보안',
      roomId: 2,
    },
  ];

  return (
    <div>
      <h1>통계 페이지</h1>
      {/* 구분선 */}
      <Divider />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 평가 점수 섹션 */}
        <div>
          <h2>평가 점수</h2>
          {statistics && (
            <div style={{ width: '400px', height: '400px' }}>
              <RadarChart data={statistics} />
            </div>
          )}
        </div>

        {/* 피드백 모아보기 섹션 */}
        <div>
          <h2>피드백 모아보기</h2>
          {/* 구분선 */}
          <Divider />
          <FeedbackHeader>
            <span>스터디룸 이름</span>
            <span>날짜</span>
            <span>주제</span>
          </FeedbackHeader>
          <FeedbackListContainer>
            {feedbackData.map((feedback) => (
              <FeedbackListItem
                key={feedback.roomId}
                roomName={feedback.roomName}
                date={feedback.date}
                subject={feedback.subject}
                roomId={feedback.roomId}
              />
            ))}
          </FeedbackListContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
