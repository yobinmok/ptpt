import React from 'react';
import { Box } from '@mui/material';
import IconButton from '../atoms/IconButton';
const Sidebar = ({ tabItem, handleTabClick, selectedTab }) => {
  return (
    <>
      <Box
        width={80} // 고정된 너비
        backgroundColor='#e0e0e0'
      >
        {tabItem.map((item, index) => (
          <IconButton
            handleSidebarToggle={() => {
              handleTabClick(index);
            }}
            key={index}
            icon={item.icon}
            text={item.text}
            isSelected={selectedTab === index}
          />
        ))}
        {/* 여기에 세로 탭 컨텐츠 추가 */}
      </Box>
    </>
  );
};

export default Sidebar;
