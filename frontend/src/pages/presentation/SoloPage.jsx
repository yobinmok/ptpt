import React, { useState } from 'react';
import { Box } from '@mui/material';
import SideTab from '../../components/organisms/SideTab';
import Sidebar from '../../components/organisms/Sidebar';
import VoiceIcon from '@mui/icons-material/SpatialAudioOffOutlined';
import ScriptIcon from '@mui/icons-material/DescriptionOutlined';
import VoiceTab from '../../components/organisms/solo/VoiceTab';

const SoloPage = () => {
  const tabItem = [
    { icon: VoiceIcon, text: '음성', content: <VoiceTab /> },
    { icon: ScriptIcon, text: '스크립트', content: 'script' },
  ];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  // 탭 클릭 시 호출되는 핸들러
  const handleTabClick = (index) => {
    if (selectedTab === index) {
      handleSidebarToggle();
      setSelectedTab(null);
    } else {
      setSelectedTab(index);
      if (!isSidebarOpen) {
        handleSidebarToggle();
      }
    }
  };

  // 사이드탭 오픈 여부
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 탭 별 conent 처리
  const getTabContent = (index) => {
    return index ? tabItem[index] : tabItem[0];
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
          isSidebarOpen={isSidebarOpen}
        />
        {/* 우측 고정된 세로탭 */}
        <Sidebar
          tabItem={tabItem}
          handleTabClick={handleTabClick}
          selectedTab={selectedTab}
        />
      </Box>
    </>
  );
};

export default SoloPage;
