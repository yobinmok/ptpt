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
      <Box display='flex' flexDirection='row' height='100vh'>
        {/* 컨텐츠 영역 */}
        <Box display='flex' flexGrow={5}>
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

          {/* 여닫히는 커스텀 사이드바 */}
          <CustomSidebar
            isOpen={isSidebarOpen}
            handleSidebarToggle={handleSidebarToggle}
          />
        </Box>
        {/* 우측 고정된 세로탭 */}
        <Box
          // width={80} // 고정된 너비
          flexGrow={0}
        >
          <Typography variant='h6'>고정된 세로탭</Typography>
          <Button variant='contained' onClick={handleSidebarToggle}>
            {isSidebarOpen ? '닫기' : '열기'}
          </Button>
          {/* 여기에 세로 탭 컨텐츠 추가 */}
        </Box>
      </Box>
    </>
  );
};

export default SoloPage;
