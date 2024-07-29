import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const SideTab = ({ isSidebarOpen }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: isSidebarOpen ? 'block' : 'none',
        top: 64, // 내비게이션 바 높이만큼 마진을 줌
        right: isSidebarOpen ? 80 : -300, // 열렸을 때는 고정된 세로탭 바로 옆, 닫혔을 때는 화면 밖으로 이동
        width: 300,
        height: 'calc(100vh - 64px)',
        backgroundColor: 'white',
        borderLeft: '1px solid #ddd', // 왼쪽 테두리
      }}
    >
      <Box p={2}>
        <Typography variant='h6'>커스텀 사이드바</Typography>
        {/* 여기에 사이드바 컨텐츠를 추가할 수 있습니다 */}
      </Box>
    </Box>
  );
};

export default SideTab;
