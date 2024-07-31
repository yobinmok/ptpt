import React, { useState } from 'react';
import { Button, Box, Divider, Slider } from '@mui/material';
import CustomSelect from '../../molecules/CustomSelect';
import CustomSlider from '../../molecules/CustomSlider';
const VoiceTab = () => {
  const options = [
    { value: 'Neural-FEMALE10', label: 'Neural-FEMALE10' },
    { value: 'WAVENET-20', label: 'WAVENET-20' },
    { value: '내 음성모델', label: '내 음성모델' },
  ];

  const handleSelectChange = (value) => {};
  return (
    <>
      <CustomSelect
        label='음성모델 선택'
        options={options}
        onChange={handleSelectChange}
      />
      <CustomSelect
        label='스크립트 선택'
        options={options}
        onChange={handleSelectChange}
        style={{ marginTop: '10px' }}
      />
      <Divider style={{ margin: '20px 0px' }} />
      <div style={{ fontSize: '17px', marginBottom: '10px' }}>톤 조정</div>
      <CustomSlider
        defaultValue={30}
        step={10}
        min={10}
        max={110}
        handleChange={() => {}}
        labels={['낮음', '보통', '높음']}
      ></CustomSlider>

      <div
        style={{
          fontWeight: 'bold',
          marginTop: '25px',
          marginBottom: '10px',
          fontSize: '17px',
        }}
      >
        속도 조정
      </div>
      <CustomSlider
        defaultValue={30}
        step={10}
        min={10}
        max={110}
        handleChange={() => {}}
        labels={['느림', '보통', '빠름']}
      ></CustomSlider>

      <br></br>
      <Box
        display='flex'
        justifyContent='space-evenly'
        sx={{ paddingTop: '15px' }}
      >
        <Button variant='contained' color='secondary'>
          ▶ &nbsp;재생
        </Button>
        <Button variant='contained' color='secondary'>
          등록
        </Button>
      </Box>
    </>
  );
};

export default VoiceTab;
