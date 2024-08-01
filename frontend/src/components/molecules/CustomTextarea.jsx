import React from 'react';
import TextField from '@mui/material/TextField';
import { styled, Box } from '@mui/material';

// 경계선 없는 텍스트 필드를 위한 스타일
const CustomTextField = styled(TextField)(({ theme }) => ({
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
  '& .MuiInputLabel-root': {
    display: 'none', // 레이블 숨기기
  },
  //   '& .MuiInputBase-input': {
  //     padding: '16.5px 14px', // 플레이스홀더가 잘 보이도록 패딩 조정
  //   },
}));

// 스크립트 컨테이너를 위한 스타일
const ScriptContainer = styled(Box)(({ theme }) => ({
  border: '1px solid #E1E3E1', // 경계선 색상 설정
  borderRadius: '4px', // 경계선 둥글기
  padding: '2px', // 패딩
}));

function CustomTextarea() {
  return (
    <ScriptContainer>
      <CustomTextField
        placeholder='스크립트를 입력하세요'
        multiline
        rows={4}
        variant='outlined'
        fullWidth
      />
      <Box>여기에 버튼 두개</Box>
    </ScriptContainer>
  );
}

export default CustomTextarea;
