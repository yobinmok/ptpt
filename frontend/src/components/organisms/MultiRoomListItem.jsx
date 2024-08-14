import React from 'react';
import styled from 'styled-components';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useState, useEffect } from 'react';

// 스타일 정의
export const Card = styled.div`
  position: relative;
  width: calc(
    33.333% - 20px
  ); // 카드가 3개씩 배치되도록 설정, 각 카드 간에 20px 간격 유지
  max-width: 300px; // 최대 너비 설정
  min-width: 250px; // 최소 너비 설정
  height: 200px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 10px; // 각 카드 간에 10px 간격 유지
`;

export const CardImage = styled.div`
  position: relative;
  height: 60%;
  background-color: #f0f0f0;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`}; // 배경 이미지 설정
  background-size: cover; // 이미지 크기 조정
  background-position: center; // 이미지 위치 조정
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const RoomTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 8px 0;
`;

export const RoomSubject = styled.p`
  font-size: 14px;
  margin: 0;
`;

// 컴포넌트 정의
const MultiRoomListItem = ({ item, onClick }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // 1부터 5까지의 숫자 중 랜덤 선택
    const randomNum = Math.floor(Math.random() * 4) + 1;
    setImageUrl(`/img_thumbnail${randomNum}.jpg`);
  }, []);

  return (
    <Card onClick={onClick}>
      <CardImage imageUrl={imageUrl}>
        {!item.isPublic ? (
          <LockOpenIcon style={{ position: 'absolute', top: 8, right: 8 }} />
        ) : (
          <LockIcon style={{ position: 'absolute', top: 8, right: 8 }} />
        )}
      </CardImage>
      <CardContent>
        <RoomTitle>{item.studyRoomTitle}</RoomTitle>
        <RoomSubject>{item.subject}</RoomSubject>
        <RoomSubject>{item.presentationTime}</RoomSubject>
      </CardContent>
    </Card>
  );
};

export default MultiRoomListItem;
