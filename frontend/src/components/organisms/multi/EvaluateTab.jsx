import React, { useEffect } from 'react';
import { useState } from 'react';
import EvaluateContent from '../../molecules/EvaluateContent';
import { Box, Container, Slider, Button, ButtonGroup } from '@mui/material';
import MyEvaluateContent from '../../molecules/MyEvaluateContent';
// import MyEvaluateContent from '../../molecules/MyEvaluateContent';

const EvaluteTab = () => {
  // 평가하기와 내평가 상태 확인
  const [isMyEvaluate, setIsMyEvaluate] = useState(true); // true : 내평가
  const [evaluateInfo, setEvaluateInfo] = useState([]);
  const onHandleClickMyEvaluateTab = () => {
    // 내평가 클릭
    setIsMyEvaluate(true);
  };

  const onHandleClickEvaluateTab = () => {
    // 평가하기 클릭
    setIsMyEvaluate(false);
  };

  return (
    <div>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ButtonGroup >
      <Button
        variant='contained'
        color='primary'
        onClick={onHandleClickMyEvaluateTab}
        sx={{ marginRight: '8px', marginBottom: '20px' }}
      >
        내평가
      </Button>
      <Button
        variant='contained'
        color='primary'
        onClick={onHandleClickEvaluateTab}
        sx={{ marginRight: '8px', marginBottom: '20px' }}
      >
        평가하기
      </Button>
      </ButtonGroup>
      </Box>
      {/* 평가항목은 따로 컴포넌트 화 */}
      <Container
        sx={{ height: '500px', width: '100%', flex: 2, overflowX: 'auto' }}
      >
        {isMyEvaluate ? <MyEvaluateContent /> : <EvaluateContent />}
      </Container>
    </div>
  );
};

export default EvaluteTab;
