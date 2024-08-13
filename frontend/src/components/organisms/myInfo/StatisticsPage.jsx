import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../../store/actions/statisticsActions';
import { fetchFeedback } from '../../../store/actions/feedbackActions';
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

  const [page, setPage] = useState(0); // 페이지 상태
  const { loading, statistics, error } = useSelector(
    (state) => state.statistics
  );
  const {
    feedback,
    loading: feedbackLoading,
    error: feedbackError,
  } = useSelector((state) => state.feedback);
  const oauthId = useSelector((state) => state.auth.user.oauthId);

  useEffect(() => {
    if (oauthId) {
      dispatch(fetchStatistics(oauthId));
      dispatch(fetchFeedback(oauthId, page)); // 모든 피드백 가져오기
    }
  }, [dispatch, oauthId, page]);

  useEffect(() => {
    console.log('Loading state:', loading);
    console.log('Statistics data:', statistics);
    console.log('Error state:', error);
    console.log('Feedback data:', feedback); // 피드백 데이터를 콘솔에 출력
  }, [loading, statistics, error, feedback]);

  // // studyRoomId를 기준으로 중복 제거
  // const uniqueFeedback = feedback.reduce((acc, current) => {
  //   const x = acc.find((item) => item.studyRoomId === current.studyRoomId);
  //   if (!x) {
  //     return acc.concat([current]);
  //   } else {
  //     return acc;
  //   }
  // }, []);
  // console.log(uniqueFeedback)
  const uniqueFeedback = feedback;

  // 페이지네이션을 위한 다음 페이지로 이동하는 함수
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // 페이지네이션을 위한 이전 페이지로 이동하는 함수
  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  return (
    <div>
      <h1>통계 페이지</h1>
      <Divider />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h2>평가 점수</h2>
          <ChartContainer>
            {statistics && (
              <div style={{ width: '400px', height: '400px' }}>
                <RadarChart data={statistics} />
              </div>
            )}
            <ExplanationSection />
          </ChartContainer>
        </div>

        {/* 피드백 모아보기 섹션 */}
        {feedbackLoading && <p>Loading feedback...</p>}
        {feedbackError && <p>Error: {feedbackError}</p>}
        <FeedbackSection feedbackData={uniqueFeedback} />

        {/* 페이지네이션 버튼 추가 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <button onClick={handlePreviousPage} disabled={page === 0}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={feedback.length === 0}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
