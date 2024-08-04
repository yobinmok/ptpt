import React, { useState, useEffect, useRef } from 'react';
import { Button, Box, Divider } from '@mui/material';
import CustomSelect from '../../molecules/CustomSelect';
import CustomSlider from '../../molecules/CustomSlider';
import { useSelector, useDispatch } from 'react-redux';
import {
  registerGuideline,
  updateVoiceSetting,
} from '../../../store/actions/solo';
import { base64ToBlob } from '../../../hooks/voice';
import { textToSpeechApi } from '../../../apis/voice';

const VoiceTab = () => {
  const dispatch = useDispatch();
  let soloPreset = useSelector((state) => state.solo);
  let scriptIdx = 0;
  const param = {
    voice: {
      languageCode: 'ko-KR',
      name: '',
    },
    input: {
      text: '',
    },
    audioConfig: {
      audioEncoding: 'linear16',
      pitch: 0,
      speakingRate: 1,
    },
  };
  const voiceSetting = useRef({
    model: 0,
    speed: 1,
    tone: 0,
  });

  const textToSpeech = (registerFlag) => {
    const text = soloPreset.script[scriptIdx].content;
    param.voice.name = soloPreset.voiceModel[voiceSetting.current.model];
    param.audioConfig.pitch = voiceSetting.current.tone;
    param.audioConfig.speakingRate = voiceSetting.current.speed;

    param.input.text = registerFlag
      ? text
      : text.length <= 100
        ? text
        : text.substring(0, 100);

    if (voiceSetting.current.model === 4) {
      // 내 음성모델을 고른 경우
      // 하단에서 tts 음성파일(.wav) 생성 -> infer 후 output 생성
      // 후 그 파일 play......?..........(10초 이상 걸릴 듯)
    }

    textToSpeechApi(
      param,
      ({ data }) => {
        let audioBlob = base64ToBlob(data.audioContent, 'wav');
        // data.audioContent 값을 가이드라인에 저장하고 재생할 때는 아래처럼 url로 변환하기
        if (registerFlag) {
          dispatch(registerGuideline(scriptIdx, data.audioContent));
          dispatch(updateVoiceSetting(scriptIdx, voiceSetting.current));
        } else {
          var audioFile = new Audio();
          audioFile.src = window.URL.createObjectURL(audioBlob);
          audioFile.play();
        }
      },
      (res) => {
        console.log(res.response.data.error);
      }
    );
  };

  return (
    <>
      <CustomSelect
        label='음성모델 선택'
        options={soloPreset.voiceModel.map((item, index) => ({
          value: index,
          label: item,
        }))}
        onChange={(value) => {
          voiceSetting.current.model = value;
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
        min={-20}
        max={20}
        handleChange={(event, newValue) => {
          voiceSetting.current.tone = newValue;
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
          voiceSetting.current.speed = newValue;
        }}
        labels={['느림', '', '빠름']}
      ></CustomSlider>

      <br></br>
      <Box
        display='flex'
        justifyContent='space-evenly'
        sx={{ paddingTop: '15px' }}
      >
        <Button
          variant='contained'
          color='secondary'
          onClick={() => textToSpeech(false)}
        >
          ▶ &nbsp;재생
        </Button>
        <Button
          onClick={() => {
            textToSpeech(true);
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
