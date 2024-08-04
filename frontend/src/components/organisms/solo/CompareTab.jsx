import React, { useState } from 'react';
import CustomSelect from '../../molecules/CustomSelect';
import { useSelector } from 'react-redux';
import AudioWaveform from '../../molecules/AudioWaveform';

const CompareTab = () => {
  let soloPreset = useSelector((state) => state.solo);
  const [guideIdx, setGuideIdx] = useState();
  const [voiceRecordIdx, setVoiceRecord] = useState();

  return (
    <>
      <CustomSelect
        label='가이드라인 선택'
        options={soloPreset.guideline.map((item, index) => ({
          value: index,
          label: item,
        }))}
        onChange={(value) => {
          console.log(value);
        }}
      />
      <CustomSelect
        label='녹음본 선택'
        options={soloPreset.voiceRecord.map((item, index) => ({
          value: index,
          label: item,
        }))}
        onChange={(value) => {}}
        style={{ margin: '10px 0px' }}
      />
      <AudioWaveform title={'가이드라인'} audioUrl='' />
      <AudioWaveform title={'내 녹음본'} audioUrl='' />
    </>
  );
};

export default CompareTab;
