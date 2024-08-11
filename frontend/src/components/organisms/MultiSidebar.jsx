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
  const hostNickname = useSelector((state) => state.room.hostId);
  const nickname = useSelector((state) => state.auth.user.nickname);
  const hasExecuteRef = useRef(false);

  // dispatch(setPresentationTime('2024-08-07T15:37'));
  // hasExecuteRef.current = false;
  // const response = adminParticipants(studyRoomId, participants);

  // 시간 호출
  useEffect(() => {
    setRealTime(moment());
    hasExecuteRef.current = false;
  }, [presentationTime]);
  useInterval(() => {
    setRealTime(moment());
    console.log('222222222222222222');
    console.log(moment(realTime).isAfter(moment(presentationTime)));
    console.log(moment());
    console.log(moment(presentationTime).add(1, 'minute'));
    if (
      !hasExecuteRef.current &&
      moment(realTime).isAfter(moment(presentationTime).add(1, 'minute')) &&
      presentationTime
    ) {
      // 시간이 지나면 api호출
      console.log('1111111111111111111');
      console.log(hostNickname);
      console.log(nickname);
      if (hostNickname === nickname) {
        const response = adminParticipants(studyRoomId, participants);
      }
      hasExecuteRef.current = true;
    }
  }, 10000); // 1초마다 확인

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
    </Box>
  );
};

export default MultiSidebar;
