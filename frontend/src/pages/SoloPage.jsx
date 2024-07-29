import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import SideTab from '../components/organisms/SideTab';
import Sidebar from '../components/organisms/Sidebar';
import VoiceIcon from '@mui/icons-material/SpatialAudioOffOutlined';
import ScriptIcon from '@mui/icons-material/DescriptionOutlined';
const SoloPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Box
        display='flex'
        flexDirection='row'
        height='calc(100vh - 64px)'
        sx={{ borderTop: '1px solid #ddd' }}
      >
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
            {/* 여기에 다른 컨텐츠를 추가할 수 있습니다 */}
            <Button variant='contained' onClick={handleSidebarToggle}>
              {isSidebarOpen ? '닫기' : '열기'}
            </Button>
          </Box>

          <Box height={60} sx={{ margin: '10px', backgroundColor: '#d9d9d9' }}>
            {' '}
            하단바
          </Box>
        </Box>
        {/* 여닫히는 커스텀 사이드바 */}
        <SideTab
          isSidebarOpen={isSidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
        />
        {/* 우측 고정된 세로탭 */}
        <Sidebar
          tabItem={[
            { icon: VoiceIcon, text: '음성' },
            { icon: ScriptIcon, text: '스크립트' },
          ]}
          isSidebarOpen={isSidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
        />
      </Box>
    </>
  );
};

export default SoloPage;
