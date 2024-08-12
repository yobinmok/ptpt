// src/components/organisms/Sidebar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import IconButton from '../atoms/IconButton';
import { toggleSidebar, selectTab, clearTab } from '../../store/actions/room';
import { adminParticipants } from '../../apis/room';
import useInterval from '../../util/useInterval';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const MultiSidebar = ({ tabItem }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.room.selectedTab);
  const isSidebarOpen = useSelector((state) => state.room.isSidebarOpen);
  // 현재 시간을 저장하기 위함 -> Date library 이용
  const [realTime, setRealTime] = useState(new Date());
  const studyRoomId = useSelector((state) => state.room.roomId);
  const presentationTime = useSelector((state) => state.room.presentationTime);
  const participants = useSelector((state) => state.participant.participants);
  const hostNickname = useSelector((state) => state.room.hostId);
  const nickname = useSelector((state) => state.auth.user.nickname);
  const hasExecuteRef = useRef(false);

  // 시간 호출
  useEffect(() => {
    setRealTime(new Date());
    hasExecuteRef.current = false;
  }, [presentationTime]);
  useInterval(() => {
    setRealTime(new Date());
    if (
      !hasExecuteRef.current &&
      realTime.getTime() - new Date(presentationTime).getTime() >= 0 &&
      presentationTime
    ) {
      // 시간이 지나면 api호출
      if (hostNickname === nickname) {
        const response = adminParticipants(studyRoomId, participants);
      }
      hasExecuteRef.current = true;
    }
  }, 5000); // 1초마다 확인

  // 탭 클릭 시 호출되는 핸들러
  const handleTabClick = (index) => {
    if (selectedTab === index) {
      dispatch(toggleSidebar());
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
    </Box>
  );
};

export default MultiSidebar;
