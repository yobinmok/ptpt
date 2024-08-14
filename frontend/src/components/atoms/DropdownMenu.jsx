import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

const DropdownMenu = ({ Icon, options, onSelect, info }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const menuRef = useRef(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, value) => {
    event.stopPropagation();
    onSelect(event, value); // 부모 컴포넌트로 선택된 값 전달
    handleClose(); // 메뉴 닫기
  };

  // 외부 클릭을 감지하여 메뉴를 닫기 위한 로직
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef}>
      <Tooltip title={info}>
        <IconButton
          aria-controls={open ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <Icon />
        </IconButton>
      </Tooltip>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5, // Menu의 최대 높이 설정
            width: '20ch', // Menu의 너비 설정
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={option.value}
            onClick={(event) => handleMenuItemClick(event, option.value)} // 이벤트 객체와 값을 모두 전달
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
