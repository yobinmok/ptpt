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
  padding: 10px;
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

// 파일 선택 버튼 스타일 (label 사용)
const FileLabel = styled.label`
  display: inline-block;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

// 파일 업로드 입력 스타일 (숨김)
const FileInput = styled.input`
  display: none;
`;

// 파일 이름 표시 스타일
const FileName = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  text-align: center;
`;

// ProfileImageEditModal 컴포넌트 정의
const ProfileImageEditModal = ({ onClose, oauthId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  // 파일 선택 시 호출되는 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : '');
  };

  // 저장 버튼 클릭 시 호출되는 핸들러
  const handleSave = async () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const response = await axios.put(`/member/${oauthId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile image updated:', response.data);
      onClose();
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Change Profile Picture</ModalHeader>
        <FileInput
          type='file'
          id='fileInput'
          accept='image/*'
          onChange={handleFileChange}
        />
        <FileLabel htmlFor='fileInput'>Choose File</FileLabel>
        {/* 선택한 파일 이름 표시 */}
        {fileName && <FileName>Selected file: {fileName}</FileName>}
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <ModalButton onClick={handleSave} disabled={!selectedFile}>
            Save
          </ModalButton>
          <ModalButton onClick={onClose}>Cancel</ModalButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileImageEditModal;
