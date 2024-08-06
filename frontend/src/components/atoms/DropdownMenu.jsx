import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
const DropdownMenu = ({ list }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title='가이드라인 선택'>
        <IconButton
          aria-controls={open ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <ListIcon />
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
