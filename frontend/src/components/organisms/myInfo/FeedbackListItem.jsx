import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const FeedbackItemText = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeedbackItemTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const FeedbackItemDate = styled.p`
  margin: 0;
  color: #888;
`;

const FeedbackItemSubject = styled.p`
  margin: 0;
  color: #555;
`;

const FeedbackListItem = ({ roomName, date, subject, roomId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/myinfo/statistics/evaluation/feedBack/${roomId}`);
  };

  return (
    <FeedbackItemContainer onClick={handleClick}>
      <FeedbackItemText>
        <FeedbackItemTitle>{roomName}</FeedbackItemTitle>
      </FeedbackItemText>
      <FeedbackItemText>
        <FeedbackItemDate>{date}</FeedbackItemDate>
      </FeedbackItemText>
      <FeedbackItemText>
        <FeedbackItemSubject>{subject}</FeedbackItemSubject>
      </FeedbackItemText>
    </FeedbackItemContainer>
  );
};

export default FeedbackListItem;
