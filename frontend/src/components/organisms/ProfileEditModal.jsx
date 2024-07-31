// src/components/organisms/ProfileEditModal.jsx

import React, { useState } from 'react';
import styled from 'styled-components';

// 모달 오버레이 스타일 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 모달 콘텐츠 스타일 정의
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 100%;
  position: relative;
`;

// 닫기 버튼 스타일 정의
const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

// 버튼 그룹 스타일 정의
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

// 저장 버튼 스타일 정의
const SaveButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;

// 취소 버튼 스타일 정의
const CancelButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #e53935;
  }
`;

// 입력 필드 스타일 정의
const InputField = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

// 레이블 스타일 정의
const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

// 입력 그룹 스타일 정의 (닉네임 입력 필드와 중복 확인 버튼을 감싸는 컨테이너)
const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

// 입력 필드 스타일 정의
const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
`;

// 중복 확인 버튼 스타일 정의
const CheckButton = styled.button`
  background: #2196f3;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background: #1e88e5;
  }
`;

// ProfileEditModal 컴포넌트 정의
const ProfileEditModal = ({ isOpen, onClose }) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  // 저장 버튼 클릭 핸들러
  const handleSave = () => {
    // 저장 로직 구현
    console.log('Saved nickname:', nickname);
    console.log('Saved email:', email);
    onClose();
  };

  // 닉네임 중복 확인 버튼 클릭 핸들러
  const handleCheckNickname = () => {
    // 닉네임 중복 확인 로직 구현
    console.log('Checking nickname:', nickname);
    // 예시: API 호출을 통해 중복 확인
  };

  // 모달이 열려있지 않으면 null 반환
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Edit Profile</h2>
        <form>
          <InputField>
            <Label htmlFor='nickname'>Nickname:</Label>
            <InputGroup>
              <Input
                type='text'
                id='nickname'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <CheckButton type='button' onClick={handleCheckNickname}>
                Check
              </CheckButton>
            </InputGroup>
          </InputField>
          <InputField>
            <Label htmlFor='email'>Email:</Label>
            <Input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputField>
          <ButtonGroup>
            <SaveButton type='button' onClick={handleSave}>
              Save
            </SaveButton>
            <CancelButton type='button' onClick={onClose}>
              Cancel
            </CancelButton>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileEditModal;
