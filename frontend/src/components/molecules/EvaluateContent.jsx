import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import CustomSlider from './CustomSlider';
import { TextField, Box, Divider, Button } from '@mui/material';
import { submitEvaluate } from '../../apis/room';
import { useSelector } from 'react-redux';
import CustomSelect from './CustomSelect';

const EvaluateContent = ({}) => {
  const [evaluateInfo, setEvaluateInfo] = useState({
    delivery: 0,
    expression: 0,
    preparation: 0,
    logic: 0,
    suitability: 0,
    commentContent: '',
    anonymity: 0,
    master: '',
    slave: '',
  });
  const studyRoomId = useSelector((state) => state.room.roomId);
  const isAnonymous = useSelector((state) => state.room.isAnonymous);
  const participants = useSelector((state) => state.participant.participants);
  // const userId = useSelector((state) => state.user.data);
  // 자기 자신을 제외한 참가자 목록을 평가지에 올림
  const userId = 'G41';
  const participantsWithoutMe = participants.filter(
    (participant) => participant !== userId
  );

  // 익명 평가이면, master 공백으로 넘김
  useEffect(() => {
    if (isAnonymous) {
      setEvaluateInfo((prevInfo) => ({
        ...prevInfo,
        anonymity: isAnonymous,
        master: userId,
      }));
    } else {
      setEvaluateInfo((prevInfo) => ({
        ...prevInfo,
        anonymity: isAnonymous,
      }));
    }
  }, [isAnonymous]);

  /*
  {     평가 한 사람도 필요
  "studyRoomId": 0,
  "delivery": 0,
  "expression": 0,
  "preparation": 0,
  "logic": 0,
  "suitability": 0,
  "master": "string", // 평가하는 사람
  "slave" : "string", // 평가 당하는 사람
  "commentContent": "string",
  "anonymity": 0
} 


  */

  const onEvaluateInfoInput = (e) => {
    setEvaluateInfo({ ...evaluateInfo, [e.target.name]: e.target.value });
    // evaluateInfo.commentContent = e.target.value;
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(evaluateInfo);
  };

  // 점수와 코멘트 제출
  const onHandleSubmit = async () => {
    const response = await submitEvaluate(evaluateInfo, studyRoomId);
    // 평가는 제출하면 끝이므로 추가적인 로직 필요 없음
  };

  const handleSelectChange = (value) => {
    setEvaluateInfo((prevInfo) => ({
      ...prevInfo,
      slave: participantsWithoutMe[value],
    }));
  };

  return (
    <div>
      {/* 평가 항목과 평가 여부 */}
      <CustomSelect
        label='발표자 선택'
        options={participantsWithoutMe.map((item, index) => ({
          value: index,
          label: item,
        }))}
        onChange={(value) => {
          handleSelectChange(value);
        }}
      />

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
        name='commentContent'
        label='Comment'
        multiline
        fullWidth
        rows={4}
        onChange={onEvaluateInfoInput}
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
