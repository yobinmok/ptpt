import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// 모달의 배경을 어둡게 만드는 오버레이 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 모달의 콘텐츠 스타일
const ModalContent = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 모달의 헤더 스타일
const ModalHeader = styled.h3`
  margin: 0;
  text-align: center;
`;

// 모달의 버튼 스타일
const ModalButton = styled.button`
  margin-top: 10px;
`;

// 닉네임 입력 섹션 스타일
const NicknameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// 닉네임 입력 필드 스타일
const NicknameInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
`;

// ProfileEditModal 컴포넌트 정의
// props:
// nickname: 현재 닉네임
// onNicknameChange: 닉네임 변경 핸들러
// onNicknameCheck: 닉네임 중복 확인 핸들러
// onSave: 닉네임 저장 핸들러
// onClose: 모달 닫기 핸들러
const ProfileEditModal = ({
  nickname,
  onNicknameChange,
  onNicknameCheck,
  onSave,
  onClose,
}) => {
  const [tempNickname, setTempNickname] = useState(nickname);

  // 저장 버튼 클릭 시 호출되는 핸들러
  const handleSave = () => {
    onSave(tempNickname);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        {/* 닉네임 입력 섹션 */}
        <NicknameSection>
          <NicknameInput
            type='text'
            value={tempNickname} // 수정된 닉네임 사용
            onChange={(e) => setTempNickname(e.target.value)} // 임시 닉네임 상태 업데이트
            placeholder='Enter new nickname'
          />
          {/* 닉네임 중복 확인 버튼 */}
          <button onClick={onNicknameCheck}>Check</button>
        </NicknameSection>
        {/* 모달 하단 버튼 섹션 */}
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          {/* 닉네임 저장 버튼 */}
          <ModalButton onClick={handleSave}>Save</ModalButton>
          {/* 모달 닫기 버튼 */}
          <ModalButton onClick={onClose}>Cancel</ModalButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileEditModal;
