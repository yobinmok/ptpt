import React, { useEffect } from 'react';
import { useState } from 'react';
import CustomSlider from './CustomSlider';
import { TextField, Box, Divider, Button } from '@mui/material';
import { submitEvaluate } from '../../apis/room';

const EvaluateContent = () => {
  //   const [evaluateInfo, setEvaluateInfo] = useState([]);

  // 평가 당하는 사람의 유저 아이디를 가져와야함
  // api를 사용해서 가져오기??
  const evaluateInfo = {
    delivery: 0,
    expression: 0,
    preparation: 0,
    logic: 0,
    suitability: 0,
    commentContent: '',
  };

  const onRoomInfoInput = (e) => {
    // setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });
    // console.log(roomInfo);
    evaluateInfo.commentContent = e.target.value;
  };

  // 점수와 코멘트 제출
  const onHandleSubmit = async () => {
    const response = await submitEvaluate(evaluateInfo);
  };

  return (
    <div>
      {/*      
       memberId: 1234,
      commentContent: '',
      isAnonymous: 0, */}
      <p>전달력</p>
      <CustomSlider
        defaultValue={50}
        step={5}
        min={0}
        max={100}
        labels={[0, 100]}
        handleChange={(event, newValue) => {
          evaluateInfo.delivery = newValue;
        }}
      />
      <p>표현럭</p>
      <CustomSlider
        defaultValue={50}
        step={5}
        min={0}
        max={100}
        labels={[0, 100]}
        handleChange={(event, newValue) => {
          evaluateInfo.expression = newValue;
        }}
      />
      <p>적합성</p>
      <CustomSlider
        defaultValue={50}
        step={5}
        min={0}
        max={100}
        labels={[0, 100]}
        handleChange={(event, newValue) => {
          evaluateInfo.suitability = newValue;
        }}
      />
      <p>논리성</p>
      <CustomSlider
        defaultValue={50}
        step={5}
        min={0}
        max={100}
        labels={[0, 100]}
        handleChange={(event, newValue) => {
          evaluateInfo.logic = newValue;
        }}
      />
      <p>준비성</p>
      <CustomSlider
        defaultValue={50}
        step={5}
        min={0}
        max={100}
        labels={[0, 100]}
        handleChange={(event, newValue) => {
          evaluateInfo.preparation = newValue;
        }}
      />
      <Divider style={{ margin: '20px 0px' }} />
      <p>코멘트</p>

      <TextField
        //   id='outlined-multiline-static'
        label='Multiline'
        multiline
        fullWidth
        rows={4}
        defaultValue='피드백을 남겨주세요'
        onChange={onRoomInfoInput}
        value={evaluateInfo.commentContent}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={onHandleSubmit}
        sx={{ mt: '10px', marginRight: '8px' }}
      >
        평가 제출하기
      </Button>
    </div>
  );
};

export default EvaluateContent;
