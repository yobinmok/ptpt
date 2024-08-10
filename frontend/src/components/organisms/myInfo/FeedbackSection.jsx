import React from 'react';
import styled from 'styled-components';
import FeedbackListItem from './FeedbackListItem';

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
const FeedbackSection = ({ feedbackData }) => {
  return (
    <div>
      <h2>피드백 모아보기</h2>
      <Divider />
      <FeedbackHeader>
        <span>스터디룸 이름</span>
        <span>날짜</span>
        <span>주제</span>
      </FeedbackHeader>
      <FeedbackListContainer>
        {feedbackData.map((feedback) => (
          // FeedbackItem 컴포넌트로 분리
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
  );
};

export default FeedbackSection;
