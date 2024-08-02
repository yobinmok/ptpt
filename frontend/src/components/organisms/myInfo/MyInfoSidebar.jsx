import React, { useState } from 'react';
import styled from 'styled-components';
import MyInfoSidebarOption from '../../molecules/MyInfoSidebarOption';
import ProfileEditModal from '../../molecules/ProfileEditModal';

// 사이드바 컨테이너 스타일
const SidebarContainer = styled.div`
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 프로필 섹션 스타일
const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

// 프로필 이미지 스타일
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

// 프로필 이름 스타일
const ProfileName = styled.h2`
  font-size: 20px;
  margin: 0;
`;

// MyInfoSidebar 컴포넌트 정의
const MyInfoSidebar = () => {
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 닉네임 상태 관리
  const [nickname, setNickname] = useState('황용주전자');

  // 모달 열기 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = () => {
    // 닉네임 중복 확인 로직을 여기에 추가하세요
    console.log('Check nickname:', nickname);
  };

  // 닉네임 저장 핸들러
  const handleSaveNickname = (newNickname) => {
    setNickname(newNickname);
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <SidebarContainer>
      <ProfileSection>
        <ProfileImage src='/path-to-profile-image' alt='Profile' />
        <ProfileName>{nickname}</ProfileName>
        {/* 프로필 수정 모달 열기 버튼 */}
        <button onClick={handleOpenModal}>Edit profile</button>
      </ProfileSection>
      {/* 사이드바 옵션 */}
      <MyInfoSidebarOption to='/myinfo/statistics' icon='📊'>
        통계
      </MyInfoSidebarOption>
      <MyInfoSidebarOption to='/myinfo/saved-rooms' icon='📁'>
        저장한 스터디룸
      </MyInfoSidebarOption>
      <MyInfoSidebarOption to='/myinfo/voice-model' icon='🎙️'>
        음성 모델 등록
      </MyInfoSidebarOption>
      {/* 프로필 수정 모달 */}
      {isModalOpen && (
        <ProfileEditModal
          nickname={nickname}
          onNicknameChange={() => {}} // 사용하지 않음
          onNicknameCheck={handleNicknameCheck}
          onSave={handleSaveNickname} // onSave 핸들러 전달
          onClose={handleCloseModal}
        />
      )}
    </SidebarContainer>
  );
};

export default MyInfoSidebar;
