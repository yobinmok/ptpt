import React, { useState, useEffect } from 'react';
import { TextField, styled, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { toggleScriptSelect } from '../../store/actions/room';
import { useTempScript, deleteScript } from '../../store/actions/solo';
import { DeleteDialog } from './DeleteDialog';

function CustomTextarea({ placeholder, editFlag }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const tempScript = useSelector((state) => state.solo.tempScript);

  const handleChange = (event) => {
    const { index, script } = tempScript;

    const updatedScript = {
      ...script,
      content: event.target.value,
    };

    dispatch(useTempScript(index, updatedScript));
  };

  return (
    <ScriptContainer>
      <CustomTextField
        placeholder={placeholder}
        multiline
        rows={13}
        value={tempScript?.script.content}
        onChange={handleChange} // onChange 핸들러 추가
        variant='outlined'
        fullWidth
        InputProps={{
          readOnly: !editFlag, // editFlag가 false일 때만 readOnly
          style: { color: 'inherit' }, // 텍스트 색상 변경 방지
        }}
      />
      {!editFlag && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '8px 0', // 위아래 패딩 추가
          }}
        >
          <DeleteIcon
            onClick={handleClickOpen}
            sx={{
              cursor: 'pointer',
              color: '#7A7A7A',
              marginRight: '5px',
            }}
          />
          <EditIcon
            onClick={() => {
              dispatch(toggleScriptSelect(true));
            }}
            sx={{
              cursor: 'pointer',
              color: '#7A7A7A',
              marginRight: '5px',
            }}
          />
        </Box>
      )}
      <DeleteDialog
        open={open}
        deleteAction={deleteScript}
        handleClose={handleClose}
      />
    </ScriptContainer>
  );
}

export const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none', // 경계선 제거
    },
    '&:hover fieldset': {
      border: 'none', // 호버 시 경계선 제거
    },
    '&.Mui-focused fieldset': {
      border: 'none', // 포커스 시 경계선 제거
    },
  },
}));

// 스크립트 컨테이너를 위한 스타일
const ScriptContainer = styled(Box)(({ theme }) => ({
  border: '1px solid #E1E3E1', // 경계선 색상 설정
  borderRadius: '4px', // 경계선 둥글기
  padding: '2px', // 패딩
}));

export default CustomTextarea;
