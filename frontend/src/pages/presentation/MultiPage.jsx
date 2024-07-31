import React from 'react';
import { Box } from '@mui/material';
// import SideTab from '../components/organisms/SideTab';
import Sidebar from '../../components/organisms/Sidebar';
import SideTab from '../../components/organisms/SideTab';
import VideoRoomComponent from '../room/openVidu/VideoRoomComponent'
import PersonIcon from '@mui/icons-material/Person';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, selectTab, clearTab } from '../../store/actions/room';

const MultiPage = () => {
  const tabItem = [
    { icon: PersonIcon, text: '참가자', content: "수정" },
    { icon: ChecklistIcon, text: '평가', content: '수정' },
    { icon: SettingsIcon, text: '설정', content: '수정' },
  ];
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.room.isSidebarOpen);
  const selectedTab = useSelector((state) => state.room.selectedTab);

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

  // 탭 별 content 처리
  const getTabContent = (index) => {
    // console.log(index !== null ? tabItem[index] : tabItem[0])
    return index !== null ? tabItem[index] : tabItem[0];
  };

  return (
    <>
      <Box display='flex' flexDirection='row' height='calc(100vh - 64px)'>
        {/* 컨텐츠 영역 */}
        <Box display='flex' flexDirection='column' flexGrow={5}>
          <VideoRoomComponent />
          {/* 좌측 컨텐츠 */}
          <Box
            flex={1}
            p={2}
            sx={{
              backgroundColor: '#f0f0f0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            화상 채팅
            <Box backgroundColor='black'></Box>
          </Box>

          <Box height={60} sx={{ margin: '10px', backgroundColor: '#d9d9d9' }}>
            {' '}
            하단바
          </Box>
        </Box>
        {/* 여닫히는 커스텀 사이드바 */}
        <SideTab
          item={getTabContent(selectedTab)}
          // isSidebarOpen={isSidebarOpen}
        />
        {/* 우측 고정된 세로탭 */}
        <Sidebar
          tabItem={tabItem}
          handleTabClick={handleTabClick}
          // selectedTab={selectedTab}
        />
      </Box>
    </>
  );
};

export default MultiPage;
