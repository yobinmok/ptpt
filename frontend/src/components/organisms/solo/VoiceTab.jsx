import React, { useState } from 'react';
import { Button, Box, Divider } from '@mui/material';
import CustomSelect from '../../molecules/CustomSelect';
import CustomSlider from '../../molecules/CustomSlider';
import { useSelector, useDispatch } from 'react-redux';
import { registerGuideline } from '../../../store/actions/solo';
const VoiceTab = () => {
  const dispatch = useDispatch();
  const options = [
    { value: 0, label: 'Neural-FEMALE10' },
    { value: 1, label: 'WAVENET-20' },
    { value: 2, label: '내 음성모델' },
  ];

  let stateSoloPreset = useSelector((state) => state.solo);
  console.log(stateSoloPreset);
  let scriptIdx = 0;
  const voiceSetting = {
    model: 0,
    speed: 0,
    tone: 0,
  };

  return (
    <>
      <CustomSelect
        label='음성모델 선택'
        options={options}
        onChange={(value) => {
          voiceSetting.model = value;
        }}
      />
      <CustomSelect
        label='스크립트 선택'
        options={stateSoloPreset.script.map((item, index) => ({
          value: index,
          label: item.title,
        }))}
        onChange={(value) => {
          scriptIdx = value;
        }}
        style={{ marginTop: '10px' }}
      />
      <Divider style={{ margin: '20px 0px' }} />
      <div style={{ fontSize: '17px', marginBottom: '10px' }}>톤 조정</div>
      <CustomSlider
        defaultValue={30}
        step={10}
        min={10}
        max={110}
        handleChange={(event, newValue) => {
          voiceSetting.tone = newValue;
        }}
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
        handleChange={(event, newValue) => {
          voiceSetting.speed = newValue;
        }}
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
        <Button
          onClick={() => {
            dispatch(registerGuideline(scriptIdx, voiceSetting));
          }}
          variant='contained'
          color='secondary'
        >
          등록
        </Button>
      </Box>
    </>
  );
};

export default VoiceTab;
