import React, { useState } from 'react';
import { Box, easing } from '@mui/material';
import { useTheme } from '@emotion/react';

const IconButton = ({ icon: IconComponent, text, handleSidebarToggle }) => {
  const theme = useTheme();
  const [isClicked, setIsClicked] = useState(false);

  const handleClicked = () => {
    setIsClicked(!isClicked);
    handleSidebarToggle();
  };
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{
        padding: '12px',
        cursor: 'pointer',
        marginRight: '3px',
        borderRadius: '0 15px 15px 0',
        backgroundColor: isClicked ? 'white' : '#e0e0e0',
        '&:hover': {
          backgroundColor: '#f5f5f5', // 부모 요소가 hover 상태일 때 적용
          '& svg': {
            color: theme.palette.primary.main, // 부모 요소가 hover 상태일 때 자식 svg 요소에 적용
          },
          '& div': {
            color: theme.palette.primary.main, // 부모 요소가 hover 상태일 때 자식 div 요소에 적용
          },
        },
      }}
      onClick={handleClicked}
    >
      <IconComponent
        style={{
          color: isClicked ? theme.palette.primary.main : '#B0B0B0',
          fontSize: 30,
        }}
      />
      <div
        style={{
          color: isClicked ? theme.palette.primary.main : '#B0B0B0',
          fontSize: 14,
          fontWeight: 'bold',
          paddingTop: 3,
        }}
      >
        {text}
      </div>
    </Box>
  );
};

export default IconButton;
