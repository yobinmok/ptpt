import React, { useState } from 'react';
import { CustomTextField } from './CustomTextarea';
// 커스텀 스타일 적용

function CustomInput() {
  const [inputValue, setInputValue] = useState(''); // 상태를 관리할 useState 훅

  const handleChange = (event) => {
    setInputValue(event.target.value); // 입력값 업데이트
  };
  return (
    <CustomTextField
      placeholder='제목을 입력하세요'
      multiline
      variant='outlined'
      fullWidth
      value={inputValue} // 상태 값을 value로 전달
      onChange={handleChange} // 입력값 변경 시 상태 업데이트
      sx={{
        border: '1px solid #E1E3E1', // 경계선 색상 설정
        borderRadius: '5px', // 경계선 둥글기
      }}
    />
  );
}

export default CustomInput;
