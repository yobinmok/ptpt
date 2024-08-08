import React from 'react';
import styled from 'styled-components';

// 구분선 스타일 정의
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const FeedbackItem = ({ feedback }) => {
  return (
    <div>
      <p>
        {feedback.nickname} (Anonymity: {feedback.anonymity})
      </p>
      <p>Delivery: {feedback.delivery}</p>
      <p>Expression: {feedback.expression}</p>
      <p>Preparation: {feedback.preparation}</p>
      <p>Logic: {feedback.logic}</p>
      <p>Suitability: {feedback.suitability}</p>
      <p>Comment: {feedback.commentContent}</p>
      <Divider />
    </div>
  );
};

export default FeedbackItem;
