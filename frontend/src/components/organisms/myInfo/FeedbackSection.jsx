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
          <FeedbackListItem
            key={feedback.studyRoomId}
            roomName={`Study Room ${feedback.studyRoomId}`}
            date={'2024-08-09'} // 실제 날짜를 사용해야 합니다.
            subject={'Sample Subject'} // 실제 주제를 사용해야 합니다.
            roomId={feedback.studyRoomId}
          />
        ))}
      </FeedbackListContainer>
    </div>
  );
};

export default FeedbackSection;
