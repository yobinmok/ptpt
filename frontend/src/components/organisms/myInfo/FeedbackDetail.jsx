import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbackDetail } from '../../../store/actions/feedbackActions';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// 스타일 정의
const FeedbackDetailContainer = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const FeedbackItem = styled.div`
  margin-bottom: 20px;
`;

const FeedbackTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const FeedbackComment = styled.p`
  margin: 5px 0;
`;

const FeedbackScore = styled.p`
  margin: 5px 0;
  font-weight: bold;
`;

// FeedbackDetail 컴포넌트
const FeedbackDetail = () => {
  const { roomId } = useParams(); // URL에서 roomId를 가져옴
  const dispatch = useDispatch();
  const { feedback, loading, error } = useSelector((state) => state.feedback);
  const oauthId = useSelector((state) => state.auth.user.oauthId);

  useEffect(() => {
    if (oauthId && roomId) {
      dispatch(fetchFeedbackDetail(oauthId, roomId)); // roomId를 기반으로 피드백 가져오기
    }
  }, [dispatch, oauthId, roomId]);

  useEffect(() => {
    console.log('Feedback data:', feedback);
  }, [feedback]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <FeedbackDetailContainer>
      <h2>피드백 상세</h2>
      {feedback.length === 0 ? (
        <p>피드백이 없습니다.</p>
      ) : (
        feedback.map((item, index) => (
          <FeedbackItem key={index}>
            <FeedbackTitle>작성자 닉네임 : {item.nickname}</FeedbackTitle>
            <FeedbackComment>코멘트: {item.commentContent}</FeedbackComment>
            <FeedbackScore>발표력: {item.delivery}</FeedbackScore>
            <FeedbackScore>표현력: {item.expression}</FeedbackScore>
            <FeedbackScore>논리성: {item.logic}</FeedbackScore>
            <FeedbackScore>준비성: {item.preparation}</FeedbackScore>
            <FeedbackScore>적합성: {item.suitability}</FeedbackScore>
          </FeedbackItem>
        ))
      )}
    </FeedbackDetailContainer>
  );
};

export default FeedbackDetail;
