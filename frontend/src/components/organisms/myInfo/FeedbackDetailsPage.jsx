import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedback } from '../../../store/actions/feedbackActions';
import { useParams } from 'react-router-dom';
import FeedbackItem from './FeedbackItem';

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
          <FeedbackItem key={item.evaluationId} feedback={item} />
        ))
      ) : (
        <p>No feedback available</p>
      )}
    </div>
  );
};

export default FeedbackDetailsPage;
