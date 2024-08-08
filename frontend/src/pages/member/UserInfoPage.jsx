import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/actions/authActions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

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

const UserInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, memberId } = location.state || {};
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
    setProfilePicture(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = {
        oauthId: memberId,
        nickName: nickname,
        memberPicture: profilePicture || 'default-profile.png',
      };

      console.log('Sending profile data:', profileData); // 데이터 확인

      await updateProfile(profileData);
      dispatch(setAuth(token, profileData));
      console.log('회원가입 성공');
      navigate('/');
    } catch (error) {
      console.error('회원가입 에러', error);
    }
  };

  const checkNicknameDuplicate = async () => {
    try {
      console.log(`Checking nickname: ${nickname}`);
      const response = await axios.get(`/member/${nickname}`);
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
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <h2>Enter Your Information</h2>
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
      </Form>
    </Container>
  );
};

export default UserInfoPage;
