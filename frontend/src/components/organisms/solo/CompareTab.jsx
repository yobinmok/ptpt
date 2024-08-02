import React, { useState } from 'react';
import { Button, Box, Divider } from '@mui/material';
import CustomSelect from '../../molecules/CustomSelect';
import CustomSlider from '../../molecules/CustomSlider';
import { useSelector, useDispatch } from 'react-redux';
import { registerGuideline } from '../../../store/actions/solo';
const CompareTab = () => {
  const dispatch = useDispatch();
  let soloPreset = useSelector((state) => state.solo);
  let scriptIdx = 0;

  return (
    <>
      <CustomSelect
        label='가이드라인 선택'
        options={soloPreset.guideline.map((item, index) => ({
          value: index,
          label: item,
        }))}
        onChange={(value) => {}}
      />
      <CustomSelect
        label='녹음본 선택'
        options={soloPreset.voiceRecord.map((item, index) => ({
          value: index,
          label: item,
        }))}
        onChange={(value) => {}}
        style={{ marginTop: '10px' }}
      />

      <Button
        onClick={() => {
          dispatch(registerGuideline(scriptIdx, voiceSetting));
        }}
        variant='contained'
        color='secondary'
      >
        등록
      </Button>
    </>
  );
};

export default CompareTab;
