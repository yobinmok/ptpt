import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// 스타일 정의
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  font-size: 14px;
  color: ${(props) => (props.isValid ? 'green' : 'red')};
`;

const SignupForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    profileImage: null,
    selectedProfileImage: null,
  });
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({
        ...formData,
        profileImage: files[0],
        selectedProfileImage: null, // 파일 업로드 시 기존 선택 이미지 초기화
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (formData.nickname) {
      const checkNickname = async () => {
        try {
          const response = await axios.post(
            'http://localhost:8080/api/v1/check-nickname',
            {
              nickname: formData.nickname,
            }
          );
          if (response.data.isValid) {
            setNicknameMessage('사용 가능한 닉네임입니다.');
            setIsNicknameValid(true);
          } else {
            setNicknameMessage('이미 사용 중인 닉네임입니다.');
            setIsNicknameValid(false);
          }
        } catch (error) {
          console.error('Error checking nickname:', error);
          setNicknameMessage('닉네임 확인 중 오류가 발생했습니다.');
          setIsNicknameValid(false);
        }
      };

      const debounceCheck = setTimeout(checkNickname, 500);

      return () => clearTimeout(debounceCheck);
    } else {
      setNicknameMessage('');
      setIsNicknameValid(false);
    }
  }, [formData.nickname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNicknameValid) {
      alert('닉네임을 확인해 주세요.');
      return;
    }

    const data = new FormData();
    data.append('nickname', formData.nickname);
    if (formData.profileImage) {
      data.append('profileImage', formData.profileImage);
    } else {
      alert('프로필 이미지를 선택하세요.');
      return;
    }

    console.log('회원가입 요청 데이터:', data);
    onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='nickname'>닉네임</Label>
      <Input
        type='text'
        id='nickname'
        name='nickname'
        placeholder='닉네임'
        value={formData.nickname}
        onChange={handleChange}
        maxLength='30'
      />
      {nicknameMessage && (
        <Message isValid={isNicknameValid}>{nicknameMessage}</Message>
      )}
      <Label htmlFor='profileImage'>프로필 사진 업로드</Label>
      <Input
        type='file'
        id='profileImage'
        name='profileImage'
        accept='image/*'
        onChange={handleChange}
      />
      <Button type='submit'>가입하기</Button>
    </Form>
  );
};

export default SignupForm;
