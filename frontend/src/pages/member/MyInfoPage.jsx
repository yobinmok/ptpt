import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MyInfoSidebar from '../../components/organisms/myInfo/MyInfoSidebar';
import StatisticsPage from '../../components/organisms/myInfo/StatisticsPage';
import SavedRoomsPage from '../../components/organisms/myInfo/SavedRoomsPage';
import VoiceModelPage from '../../components/organisms/myInfo/VoiceModelPage';
import FeedbackDetail from '../../components/organisms/myInfo/FeedbackDetail';
import { useSelector } from 'react-redux';
const Container = styled.div`
  display: flex;
  padding: 0px 150px;
  @media (max-width: 1200px) {
    padding: 0px 100px;
  }

  @media (max-width: 768px) {
    padding: 0px 50px;
  }

  @media (max-width: 480px) {
    padding: 0px 20px;
  }
`;

const MyInfoContent = styled.div`
  flex: 1;
  padding: 20px;
  background: #f9f9f9;
`;
const MyInfoPage = () => {
  const user = useSelector((state) => state.auth.user);

  // Null 체크 추가
  const oauthId = user ? user.oauthId : 'Unknown';

  console.log('MyInfoPage Rendered');
  console.log('User:', user);
  console.log('OAuth ID:', oauthId); // 콘솔 로그 추가
  return (
    <Container>
      <MyInfoSidebar />
      <MyInfoContent>
        <Routes>
          <Route path='statistics' element={<StatisticsPage />} />
          <Route
            path='statistics/evaluation/feedBack/:roomId'
            element={<FeedbackDetail />}
          />
          <Route path='saved-rooms' element={<SavedRoomsPage />} />
          <Route path='voice-model' element={<VoiceModelPage />} />
          <Route path='/' element={<div>Welcome to My Info</div>} />
        </Routes>
      </MyInfoContent>
    </Container>
  );
};

export default MyInfoPage;
