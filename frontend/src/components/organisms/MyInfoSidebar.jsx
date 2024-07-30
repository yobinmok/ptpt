import React from 'react';
import styled from 'styled-components';
import MyInfoSidebarOption from '../molecules/MyInfoSidebarOption';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ProfileName = styled.h2`
  font-size: 20px;
  margin: 0;
`;

const MyInfoSidebar = () => {
  return (
    <SidebarContainer>
      <ProfileSection>
        <ProfileImage src='/path-to-profile-image' alt='Profile' />
        <ProfileName>황용주전자</ProfileName>
        <button>Edit profile</button>
      </ProfileSection>
      <MyInfoSidebarOption to='/myinfo/statistics' icon='📊'>
        통계
      </MyInfoSidebarOption>
      <MyInfoSidebarOption to='/myinfo/saved-rooms' icon='📁'>
        저장한 스터디룸
      </MyInfoSidebarOption>
      <MyInfoSidebarOption to='/myinfo/voice-model' icon='🎙️'>
        음성 모델 등록
      </MyInfoSidebarOption>
    </SidebarContainer>
  );
};

export default MyInfoSidebar;
