import React from 'react';
import CustomTextarea from '../../molecules/CustomTextarea';
import CustomInput from '../../molecules/CustomInput';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const RegisterScriptTab = () => {
  const theme = useTheme();

  return (
    <Box>
      <div style={{ marginBottom: '10px' }}>
        <CustomInput />
      </div>

      <CustomTextarea
        placeholder={'스크립트를 입력해주세요'}
        content={''}
        editFlag={true}
      />
      <Box
        display='flex'
        justifyContent='space-evenly'
        sx={{ paddingTop: '15px' }}
      >
        <Button variant='contained' color='secondary'>
          저장
        </Button>
        <Button variant='contained' color='neutral'>
          취소
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterScriptTab;
