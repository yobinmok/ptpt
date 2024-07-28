import React from 'react';
import { Drawer, Box, Typography } from '@mui/material';

const Sidebar = ({ isDrawerOpen, handleDrawerToggle }) => {
  return (
    <Drawer
      anchor='right'
      open={isDrawerOpen}
      onClose={handleDrawerToggle}
      variant='persistent'
      sx={{
        transition: 'width 0.3s',
        '& .MuiDrawer-paper': {
          width: '20%',
          boxSizing: 'border-box',
          marginTop: 8, // 내비게이션 바 높이만큼 마진을 줌
        },
      }}
    >
      <Box p={2} width='100%'>
        <Typography variant='h6'>우측 사이드탭</Typography>
        {/* 여기에 사이드탭 컨텐츠를 추가할 수 있습니다 */}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
