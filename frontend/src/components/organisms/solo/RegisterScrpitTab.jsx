import React from 'react';
import CustomTextarea from '../../molecules/CustomTextarea';
import CustomInput from '../../molecules/CustomInput';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleScriptSelect } from '../../../store/actions/room';

const RegisterScriptTab = ({ content, title }) => {
  const dispatch = useDispatch();
  const saveClickListener = () => {
    // 제목 및 텍스트 저장
    dispatch(toggleScriptSelect());
  };
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
        <Button
          onClick={saveClickListener()}
          variant='contained'
          color='secondary'
        >
          저장
        </Button>
        <Button
          onClick={() => {
            dispatch(toggleScriptSelect());
          }}
          variant='contained'
          color='neutral'
        >
          취소
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterScriptTab;
