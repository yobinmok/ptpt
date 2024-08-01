import React, { useState } from 'react';
import { TextField, styled, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { toggleScriptSelect } from '../../store/actions/room';
// 경계선 없는 텍스트 필드를 위한 스타일
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

function CustomTextarea({ defaultContent, placeholder, editFlag }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(defaultContent); // 상태 추가

  const handleChange = (event) => {
    setContent(event.target.value); // 상태 업데이트
  };

  return (
    <ScriptContainer>
      <CustomTextField
        placeholder={placeholder}
        multiline
        rows={13}
        value={content}
        onChange={handleChange} // onChange 핸들러 추가
        variant='outlined'
        fullWidth
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
            onClick={() => {
              '클릭하면 삭제 모달 띄우기';
            }}
            sx={{
              color: '#7A7A7A',
              marginRight: '5px',
            }}
          />
          <EditIcon
            onClick={() => {
              dispatch(toggleScriptSelect());
            }}
            sx={{
              cursor: 'pointer',
              color: '#7A7A7A',
              marginRight: '5px',
            }}
          />
        </Box>
      )}
    </ScriptContainer>
  );
}

export default CustomTextarea;
