import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CustomSidebar from '../components/organisms/CustomSidebar';

const SoloPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Box display='flex' flexDirection='column' height='100vh'>
        {/* 컨텐츠 영역 */}
        <Box display='flex' flexGrow={1}>
          {/* 좌측 컨텐츠 */}
          <Box
            flex={isSidebarOpen ? 0.7 : 1}
            p={2}
            sx={{
              backgroundColor: '#f0f0f0',
              display: 'flex',
              flexDirection: 'column',
              marginRight: '80px',
            }}
          >
            {/* 여기에 다른 컨텐츠를 추가할 수 있습니다 */}
            <Button variant='contained' onClick={handleSidebarToggle}>
              {isSidebarOpen ? '닫기' : '열기'}
            </Button>
          </Box>

          {/* 여닫히는 커스텀 사이드바 */}
          <CustomSidebar
            isOpen={isSidebarOpen}
            handleSidebarToggle={handleSidebarToggle}
          />

          {/* 우측 고정된 세로탭 */}
          {/* 우측 고정된 세로탭 */}
          <Box
            width={80} // 고정된 너비
            sx={{
              position: 'fixed', // 화면 오른쪽에 고정
              top: 64,
              right: 0,
              height: '100vh', // 전체 화면 높이 차지
              backgroundColor: '#e0e0e0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant='h6'>고정된 세로탭</Typography>
            <Button variant='contained' onClick={handleSidebarToggle}>
              {isSidebarOpen ? '닫기' : '열기'}
            </Button>
            {/* 여기에 세로 탭 컨텐츠 추가 */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SoloPage;
