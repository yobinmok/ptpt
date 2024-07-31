// src/pages/SoloPage.jsx
import React from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SideTab from '../../components/organisms/SideTab';
import Sidebar from '../../components/organisms/Sidebar';
import VoiceIcon from '@mui/icons-material/SpatialAudioOffOutlined';
import ScriptIcon from '@mui/icons-material/DescriptionOutlined';
import VoiceTab from '../../components/organisms/solo/VoiceTab';
import { toggleSidebar, selectTab, clearTab } from '../../store/actions/room';

const SoloPage = () => {
  const tabItem = [
    { icon: VoiceIcon, text: '음성', content: <VoiceTab /> },
    { icon: ScriptIcon, text: '스크립트', content: 'script' },
  ];

  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.room.isSidebarOpen);
  const selectedTab = useSelector((state) => state.room.selectedTab);
  console.log("isSidebarOpen  " + isSidebarOpen)
  console.log("selecte tab index  " + selectedTab)

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
    console.log(index !== null ? tabItem[index] : tabItem[0])
    return index !== null ? tabItem[index] : tabItem[0];
  };

  return (
    <>
      <Box display='flex' flexDirection='row' height='calc(100vh - 64px)'>
        {/* 컨텐츠 영역 */}
        <Box display='flex' flexDirection='column' flexGrow={5}>
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
            발표자료 업로드
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

export default SoloPage;
