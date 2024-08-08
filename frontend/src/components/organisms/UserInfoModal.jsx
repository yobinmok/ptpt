import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const FileInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Message = styled.p`
  color: ${(props) => (props.$isError ? 'red' : 'blue')};
  margin: 5px 0;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  width: 100%;
  text-align: left;
`;

const UserInfoModal = ({ showModal, setShowModal, handleSubmit }) => {
  const [nickname, setNickname] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [voiceModel, setVoiceModel] = useState(null);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameMessage('');
    setIsNicknameValid(false);
  };

  const handleVoiceModelChange = (e) => {
    setVoiceModel(e.target.files[0]);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(nickname, profilePicture || 'default-profile.png');
    setShowModal(false);
  };

  const checkNicknameDuplicate = async () => {
    try {
      console.log(`Checking nickname: ${nickname}`);
      // TODO: API 함수로 수정
      const response = await axios.get(`/member/${nickname}`);
      console.log('Nickname check response:', response);
      if (response.status === 200) {
        setNicknameMessage('사용 가능한 닉네임입니다.');
        setIsNicknameValid(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNicknameMessage('이미 존재하는 닉네임입니다.');
        setIsNicknameValid(false);
      } else {
        setNicknameMessage('닉네임 중복 확인 중 오류가 발생했습니다.');
        setIsNicknameValid(false);
      }
      console.error('Error checking nickname:', error);
    }
  };

  return (
    showModal && (
      <ModalBackground>
        <ModalContainer>
          <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
          <h2>Enter Your Information</h2>
          <form onSubmit={handleFormSubmit}>
            <NicknameContainer>
              <Input
                type='text'
                placeholder='Nickname'
                value={nickname}
                onChange={handleNicknameChange}
                required
              />
              <Button type='button' onClick={checkNicknameDuplicate}>
                Check
              </Button>
            </NicknameContainer>
            {nicknameMessage && (
              <Message $isError={!isNicknameValid}>{nicknameMessage}</Message>
            )}
            <Label>Profile Picture</Label>
            <FileInput type='file' onChange={handleProfilePictureChange} />
            <Label>Voice Model</Label>
            <FileInput type='file' onChange={handleVoiceModelChange} />
            <ButtonContainer>
              <Button type='submit' disabled={!isNicknameValid}>
                회원가입
              </Button>
            </ButtonContainer>
          </form>
        </ModalContainer>
      </ModalBackground>
    )
  );
};

export default UserInfoModal;
