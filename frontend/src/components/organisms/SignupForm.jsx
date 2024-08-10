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
  max-width: 400px; // 가로 길이 제한
  margin: 0 auto; // 가운데 정렬
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

const NicknamePreview = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
`;

// 회원가입 폼 컴포넌트
const SignupForm = ({ onSubmit }) => {
  // formData: 닉네임과 프로필 이미지를 저장하는 상태
  const [formData, setFormData] = useState({
    nickname: '',
    profileImage: null,
    selectedProfileImage: null,
  });

  // nicknameMessage: 닉네임 중복 확인 메시지를 저장하는 상태
  // isNicknameValid: 닉네임 유효성을 저장하는 상태
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      // 프로필 이미지가 변경된 경우
      setFormData({
        ...formData,
        profileImage: files[0],
        selectedProfileImage: null, // 파일 업로드 시 기존 선택 이미지 초기화
      });
    } else {
      // 닉네임이 변경된 경우
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // 닉네임 중복 확인을 위한 useEffect
  useEffect(() => {
    if (formData.nickname) {
      // 닉네임 중복 확인 함수
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

      // 닉네임 중복 확인 디바운싱
      const debounceCheck = setTimeout(checkNickname, 500);

      return () => clearTimeout(debounceCheck);
    } else {
      // 닉네임이 비어있는 경우 메시지 초기화
      setNicknameMessage('');
      setIsNicknameValid(false);
    }
  }, [formData.nickname]);

  // 폼 제출 핸들러
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
      <NicknamePreview>입력된 닉네임: {formData.nickname}</NicknamePreview>
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
