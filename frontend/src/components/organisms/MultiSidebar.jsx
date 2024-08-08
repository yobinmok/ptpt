// src/components/organisms/Sidebar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import IconButton from '../atoms/IconButton';
import { toggleSidebar, selectTab, clearTab } from '../../store/actions/room';
import { adminParticipants } from '../../apis/room';
import moment from 'moment';
import useInterval from '../../util/useInterval';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { setPresentationTime } from '../../store/actions/room';

const MultiSidebar = ({ tabItem }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.room.selectedTab);
  const isSidebarOpen = useSelector((state) => state.room.isSidebarOpen);
  // 현재 시간을 저장하기 위함 -> moment.js
  const [realTime, setRealTime] = useState(moment());
  const studyRoomId = useSelector((state) => state.room.roomId);
  const presentationTime = useSelector((state) => state.room.presentationTime);
  const participants = useSelector((state) => state.participant.participants);
  const hasExecuteRef = useRef(false);

  // dispatch(setPresentationTime('2024-08-07T15:37'));
  // hasExecuteRef.current = false;
  // const response = adminParticipants(studyRoomId, participants);

  // 시간 호출
  useEffect(() => {
    setRealTime(moment());
  }, []);
  useInterval(() => {
    setRealTime(moment());
    if (
      !hasExecuteRef.current &&
      moment(realTime).isAfter(presentationTime) &&
      presentationTime
    ) {
      // 시간이 지나면 api호출
      const response = adminParticipants(studyRoomId, participants);
      console.log('response : ' + response);
      hasExecuteRef.current = true;
    }
  }, 1000); // 1초마다 확인

  // 탭 클릭 시 호출되는 핸들러
  const handleTabClick = (index) => {
    if (selectedTab === index) {
      dispatch(toggleSidebar());
      // dispatch(clearTab());
    } else {
      dispatch(selectTab(index));
      if (!isSidebarOpen) {
        dispatch(toggleSidebar());
      }
    }
  };

  return (
    <Box
      width={80} // 고정된 너비
      backgroundColor='#e0e0e0'
    >
      {tabItem.map((item, index) => (
        <IconButton
          handleSidebarToggle={() => handleTabClick(index)}
          key={index}
          icon={item.icon}
          text={item.text}
          isSelected={selectedTab === index}
        />
      ))}
      {/* 여기에 세로 탭 컨텐츠 추가 */}
    </Box>
  );
};

export default MultiSidebar;
