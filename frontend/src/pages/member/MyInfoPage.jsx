import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MyInfoSidebar from '../../components/organisms/myInfo/MyInfoSidebar';
import StatisticsPage from '../../components/organisms/myInfo/StatisticsPage';
import SavedStudyRoomsPage from '../../components/organisms/myInfo/SavedStudyRoomsPage';
import VoiceModelPage from '../../components/organisms/myInfo/VoiceModelPage';
import FeedbackDetailsPage from '../../components/organisms/myInfo/FeedbackDetailsPage';
import { useSelector } from 'react-redux';
const Container = styled.div`
  display: flex;
`;

const MyInfoContent = styled.div`
  flex: 1;
  padding: 20px;
  background: #f9f9f9;
`;
console.log('--------------');
const MyInfoPage = () => {
  console.log(useSelector((state) => state.auth.user.oauthId));
  return (
    <Container>
      <MyInfoSidebar />
      <MyInfoContent>
        <Routes>
          <Route path='statistics' element={<StatisticsPage />} />
          <Route
            path='statistics/evaluation/feedBack/:roomId'
            element={<FeedbackDetailsPage />}
          />
          <Route path='saved-rooms' element={<SavedStudyRoomsPage />} />
          <Route path='voice-model' element={<VoiceModelPage />} />
          <Route path='/' element={<div>Welcome to My Info</div>} />
        </Routes>
      </MyInfoContent>
    </Container>
  );
};

export default MyInfoPage;
