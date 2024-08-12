import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 피드백 항목 스타일 정의
const FeedbackItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const FeedbackItemText = styled.span`
  flex: 1;
  text-align: left; /* 왼쪽 정렬 */
`;

const FeedbackListItem = ({ roomName, subject, roomId }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/myinfo/statistics/evaluation/feedBack/${roomId}`);
  };

  return (
    <FeedbackItemContainer onClick={handleClick}>
      <FeedbackItemText>{roomName}</FeedbackItemText>
      <FeedbackItemText>{subject}</FeedbackItemText>
    </FeedbackItemContainer>
  );
};

export default FeedbackListItem;
