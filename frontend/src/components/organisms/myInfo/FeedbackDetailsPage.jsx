import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedback } from '../../../store/actions/feedbackActions';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// 구분선 스타일 정의
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const FeedbackDetailsPage = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const { loading, feedback, error } = useSelector((state) => state.feedback);

  useEffect(() => {
    const oauthId = 'G123'; // 실제 oauthId
    dispatch(fetchFeedback(roomId, oauthId));
  }, [dispatch, roomId]);

  useEffect(() => {
    console.log('Loading state:', loading);
    console.log('Feedback data:', feedback);
    console.log('Error state:', error);
  }, [loading, feedback, error]);

  return (
    <div>
      <h1>Feedback Details</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {feedback && feedback.length > 0 ? (
        feedback.map((item) => (
          <div key={item.evaluationId}>
            <p>
              {item.nickname} (Anonymity: {item.anonymity})
            </p>
            <p>Delivery: {item.delivery}</p>
            <p>Expression: {item.expression}</p>
            <p>Preparation: {item.preparation}</p>
            <p>Logic: {item.logic}</p>
            <p>Suitability: {item.suitability}</p>
            <p>Comment: {item.commentContent}</p>
            <Divider />
          </div>
        ))
      ) : (
        <p>No feedback available</p>
      )}
    </div>
  );
};

export default FeedbackDetailsPage;
