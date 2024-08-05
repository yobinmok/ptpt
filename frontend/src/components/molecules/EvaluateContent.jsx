import React, { useEffect } from 'react';
import { useState } from 'react';
import CustomSlider from './CustomSlider';
import { TextField, Box, Divider, Button } from '@mui/material';
import { submitEvaluate } from '../../apis/room';
import { useSelector } from 'react-redux';
import CustomSelect from './CustomSelect';

const EvaluateContent = ({}) => {
  //   const [evaluateInfo, setEvaluateInfo] = useState([]);
  const studyRoomId = useSelector((state) => state.room.roomId);
  const isAnonymous = useSelector((state) => state.room.isAnonymous);
  const participants = useSelector((state) => state.participant.participants);
  // 평가 당하는 사람의 유저 아이디를 가져와야함
  // api를 사용해서 가져오기??
  const evaluateInfo = {
    delivery: 0,
    expression: 0,
    preparation: 0,
    logic: 0,
    suitability: 0,
    commentContent: '',
    isAnonymous: isAnonymous,
  };

  const onRoomInfoInput = (e) => {
    // setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });
    evaluateInfo.commentContent = e.target.value;
  };

  // 점수와 코멘트 제출
  const onHandleSubmit = async () => {
    const response = await submitEvaluate(evaluateInfo, studyRoomId);
    // 평가는 제출하면 끝이므로 추가적인 로직 필요 없음
  };

  return (
    <div>
      {/* 평가 항목과 평가 여부 */}
      <CustomSelect
        label='발표자 선택'
        options={participants.map((item, index) => ({
          value: index,
          label: item,
        }))}
        onChange={(value) => {}}
      />
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
        label='Comment'
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
