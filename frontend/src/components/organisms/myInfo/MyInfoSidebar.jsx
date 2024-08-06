import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MyInfoSidebarOption from '../../molecules/MyInfoSidebarOption';
import ProfileEditModal from '../../molecules/ProfileEditModal';
import ProfileImageEditModal from '../../molecules/ProfileImageEditModal';

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

// 프로필 이미지 스타일 (원형으로 표시, 클릭 가능)
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;

// 프로필 이름 스타일
const ProfileName = styled.h2`
  font-size: 20px;
  margin: 0;
`;

// 파일 업로드 입력 스타일 (숨김)
const FileInput = styled.input`
  display: none;
`;

// MyInfoSidebar 컴포넌트 정의
const MyInfoSidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const user = useSelector((state) => state.user.data) || {};
  const { oauthId, nickname, memberPicture } = user;

  // 프로필 수정 모달 열기 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 프로필 수정 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 프로필 이미지 수정 모달 열기 핸들러
  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  // 프로필 이미지 수정 모달 닫기 핸들러
  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
  };

  return (
    <SidebarContainer>
      <ProfileSection>
        {/* 프로필 이미지 (클릭 시 파일 입력 창 열기) */}
        <ProfileImage
          src={memberPicture || '/path-to-default-profile-image'}
          alt='Profile'
          onClick={handleImageClick}
        />
        {/* 프로필 이름 */}
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
          onClose={handleCloseModal}
          oauthId={oauthId} // oauthId 전달
        />
      )}
      {/* 프로필 이미지 수정 모달 */}
      {isImageModalOpen && (
        <ProfileImageEditModal
          onClose={handleImageModalClose}
          oauthId={oauthId} // oauthId 전달
        />
      )}
    </SidebarContainer>
  );
};

export default MyInfoSidebar;
