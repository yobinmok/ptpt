import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const MultiRoomListItem = ({ item, onClick }) => {
  // onClick 시 방 만들기 모달 띄우기
  return (
    <>
      <Card onClick={onClick}>
        <CardImage>
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
    </>
  );
};

const Card = styled.div`
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

const CardImage = styled.div`
  position: relative;
  height: 60%;
  background-color: #f0f0f0;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const RoomTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 8px 0;
`;

const RoomSubject = styled.p`
  font-size: 14px;
  margin: 0;
`;

export default MultiRoomListItem;
