import React, { useState } from 'react';
import CustomSelect from '../../molecules/CustomSelect';
import { useSelector } from 'react-redux';
import AudioWaveform from '../../molecules/AudioWaveform';
import { base64ToBlob } from '../../../hooks/voice';

const CompareTab = () => {
  let soloPreset = useSelector((state) => state.solo);
  console.log(soloPreset);
  const [guide, setGuide] = useState();
  const [voiceRecordIdx, setVoiceRecord] = useState();

  return (
    <>
      <CustomSelect
        label='가이드라인 선택'
        options={soloPreset.script.map((item, index) => ({
          value: index,
          label: item.title,
        }))}
        onChange={(index) => {
          console.log(index);
          const guideline = soloPreset.guideline.find(
            (g) => g.index === index
          ).guideline;
          let audioBlob = base64ToBlob(guideline, 'wav');
          setGuide(window.URL.createObjectURL(audioBlob));
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
      <AudioWaveform title={'가이드라인'} audioUrl={guide} />
      <AudioWaveform title={'내 녹음본'} audioUrl='' />
    </>
  );
};

export default CompareTab;
