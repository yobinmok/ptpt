import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Typography, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DropdownMenu from '../atoms/DropdownMenu';
const StyledBox = styled(Box)`
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 10px;
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: space-between;
`;

const SoloRoomItem = ({ item, onClick }) => {
  const [isCompleted, setIsCompleted] = useState(item.isCompleted);

  const handleClick = () => {
    onClick(item);
  };

  const toggleCompletionStatus = (event) => {
    event.stopPropagation();
    setIsCompleted((prev) => !prev);
  };

  return (
    <StyledBox onClick={handleClick}>
      <Typography style={{ fontWeight: 'bold' }}>{item.title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant='outlined'
          size='small'
          onClick={toggleCompletionStatus}
          sx={{
            borderColor: isCompleted ? '#CC9D9B' : '#97C5B1',
            backgroundColor: isCompleted ? '#FFE3DD' : '#E4F1EC',
            color: 'black',
            '&:hover': {
              borderColor: isCompleted ? '#CC9D9B' : '#97C5B1',
              backgroundColor: isCompleted ? '#FFE3DD' : '#E4F1EC',
            },
          }}
        >
          {isCompleted ? '종료' : '연습 중'}
        </Button>
        <Typography variant='body2' sx={{ ml: 2, mr: 2 }}>
          {item.createdTime}
        </Typography>
        <DropdownMenu
          Icon={MoreVertIcon}
          options={[
            {
              value: '삭제하기',
              label: '삭제하기',
            },
          ]}
          onSelect={(item) => {
            console.log(item);
          }}
        />
      </Box>
    </StyledBox>
  );
};

export default SoloRoomItem;
