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

const FeedbackLabel = styled.span`
  flex: 1; /* 텍스트를 균등하게 분배 */
`;

const FeedbackSection = ({ feedbackData }) => {
  return (
    <div>
      <h2>피드백 모아보기</h2>
      <Divider />
      <FeedbackHeader>
        <FeedbackLabel>스터디룸 이름</FeedbackLabel>
        <FeedbackLabel>주제</FeedbackLabel>
      </FeedbackHeader>
      <FeedbackListContainer>
        {feedbackData.map((feedback) => (
          <FeedbackListItem
            key={feedback.studyRoomId}
            roomName={feedback.studyRoomTitle}
            subject={feedback.subject}
            roomId={feedback.studyRoomId}
          />
        ))}
      </FeedbackListContainer>
    </div>
  );
};

export default FeedbackSection;
