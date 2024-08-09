import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../../store/actions/statisticsActions';
import RadarChart from './RadarChart';
import ExplanationSection from './ExplanationSection';
import FeedbackSection from './FeedbackSection';
import styled from 'styled-components';

// 구분선 스타일 정의
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const ChartContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const StatisticsPage = () => {
  const dispatch = useDispatch();
  const { loading, statistics, error } = useSelector(
    (state) => state.statistics
  );
  const oauthId = useSelector((state) => state.auth.user.oauthId);
  console.log('접속한 oauthId', oauthId);
  useEffect(() => {
    if (oauthId) {
      dispatch(fetchStatistics(oauthId));
    }
  }, [dispatch, oauthId]);

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

  // 설명 데이터
  const explanations = {
    delivery:
      '발표력이 낮으면 발표력이 낮아지고, 신뢰성이 떨어질 수 있어요. 이로 인해 청중을 설득하기 어려워집니다.',
    expression:
      '표현력이 낮으면 청중의 이해도가 낮아지고, 발표의 신뢰성이 떨어질 수 있어요. 이로 인해 청중을 설득하기 어려워집니다.',
    logic:
      '논리성이 낮으면 발표의 이해도가 낮아지고, 발표의 신뢰성이 떨어질 수 있어요. 이로 인해 청중을 설득하기 어려워집니다.',
    preparation:
      '준비성이 낮으면 발표의 신뢰성이 떨어질 수 있어요. 이로 인해 청중을 설득하기 어려워집니다.',
    suitability:
      '적합성이 낮으면 발표의 신뢰성이 떨어질 수 있어요. 이로 인해 청중을 설득하기 어려워집니다.',
  };

  return (
    <div>
      <h1>통계 페이지</h1>
      <Divider />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 평가 점수 섹션 */}
        <div>
          <h2>평가 점수</h2>
          <ChartContainer>
            {statistics && (
              <div style={{ width: '400px', height: '400px' }}>
                <RadarChart data={statistics} />
              </div>
            )}
            <ExplanationSection explanations={explanations} />
          </ChartContainer>
        </div>

        {/* 피드백 모아보기 섹션 */}
        <FeedbackSection feedbackData={feedbackData} />
      </div>
    </div>
  );
};

export default StatisticsPage;
