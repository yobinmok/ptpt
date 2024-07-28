import React, { useState } from 'react';
import { Box, Button, Typography, AppBar, Toolbar } from '@mui/material';
import Sidebar from '../components/organisms/Sidebar';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Box display='flex' flexDirection='column' height='100vh'>
        {/* 컨텐츠 영역 */}
        <Box display='flex' flexGrow={1}>
          {/* 좌측 컨텐츠 */}
          <Box
            flex={isDrawerOpen ? 0.7 : 1}
            p={2}
            transition='flex 0.3s'
            sx={{
              backgroundColor: '#f0f0f0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Button variant='contained' onClick={handleDrawerToggle}>
              {isDrawerOpen ? '닫기' : '열기'}
            </Button>
            {/* 여기에 다른 컨텐츠를 추가할 수 있습니다 */}
          </Box>

          {/* 우측 사이드탭 */}
          <Sidebar
            isDrawerOpen={isDrawerOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Box>
      </Box>
      <Box display='flex'>
        띠요옹 지금 이게 안보이걸랑요 해결 부탁해 미래의 요비나
      </Box>
    </>
  );
};

export default App;
