import React, { useState } from 'react';
import { Button, Box, Divider } from '@mui/material';
import CustomSelect from '../../molecules/CustomSelect';
import CustomSlider from '../../molecules/CustomSlider';
import { useSelector, useDispatch } from 'react-redux';
import { registerGuideline } from '../../../store/actions/solo';
import { textToSpeeachApi } from '../../../apis/voice';

const VoiceTab = () => {
  const dispatch = useDispatch();
  const options = [
    { value: 0, label: 'ko-KR-Standard-A' },
    { value: 1, label: 'ko-KR-Standard-B' },
    { value: 2, label: 'ko-KR-Standard-C' },
    { value: 3, label: 'ko-KR-Standard-D' },
  ];

  const param = {
    voice: {
      languageCode: 'ko-KR',
      name: 'ko-KR-Wavenet-A',
    },
    input: {
      text: '네 안녕하세요 발표 시작하도록 하겠습니다',
    },
    audioConfig: {
      audioEncoding: 'linear16',
      pitch: 0,
      speakingRate: 1,
    },
  };

  const textToSpeeach = () => {
    textToSpeechApi(
      param,
      ({ data }) => {
        var audioFile = new Audio();
        let audioBlob = base64ToBlob(data.audioContent, 'wav');
        audioFile.src = window.URL.createObjectURL(audioBlob);
        audioFile.playbackRate = 1; //재생속도
        audioFile.play();
      },
      (res) => {
        console.log(res);
      }
    );
  };

  const base64ToBlob = (base64, fileType) => {
    let typeHeader = 'data:application/' + fileType + ';base64,'; // base64 헤더 파일 유형 정의
    let audioSrc = typeHeader + base64;
    let arr = audioSrc.split(',');
    let array = arr[0].match(/:(.*?);/);
    let mime = (array && array.length > 1 ? array[1] : type) || type;
    let bytes = window.atob(arr[1]);
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {
      type: mime,
    });
  };

  let soloPreset = useSelector((state) => state.solo);
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
        options={soloPreset.script.map((item, index) => ({
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
        defaultValue={0}
        // step={10}
        min={-20}
        max={20}
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
        defaultValue={1}
        step={0.01}
        min={0.25}
        max={2}
        handleChange={(event, newValue) => {
          voiceSetting.speed = newValue;
        }}
        labels={['느림', '', '빠름']}
      ></CustomSlider>

      <br></br>
      <Box
        display='flex'
        justifyContent='space-evenly'
        sx={{ paddingTop: '15px' }}
      >
        <Button variant='contained' color='secondary' onClick={textToSpeeach}>
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
