import React from 'react';
import { Box, Typography } from '@mui/material';

const CustomSidebar = ({ isOpen, handleSidebarToggle }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 64, // 내비게이션 바 높이만큼 마진을 줌
        right: isOpen ? 80 : -300, // 열렸을 때는 고정된 세로탭 바로 옆, 닫혔을 때는 화면 밖으로 이동
        width: 300,
        height: 'calc(100% - 64px)',
        backgroundColor: '#00ff00',
      }}
    >
      <Box p={2}>
        <Typography variant='h6'>커스텀 사이드바</Typography>
        {/* 여기에 사이드바 컨텐츠를 추가할 수 있습니다 */}
      </Box>
    </Box>
  );
};

export default CustomSidebar;
