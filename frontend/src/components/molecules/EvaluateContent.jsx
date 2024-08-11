import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import CustomSlider from './CustomSlider';
import { TextField, Box, Divider, Button } from '@mui/material';
import { submitEvaluate } from '../../apis/room';
import { useSelector, useDispatch } from 'react-redux';
import CustomSelect from './CustomSelect';
import { isParticipantsEval } from '../../store/actions/participant';

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
  const dispatch = useDispatch();
  const studyRoomId = useSelector((state) => state.room.roomId);
  const isAnonymous = useSelector((state) => state.room.isAnonymous);
  const participants = useSelector((state) => state.participant.participants);
  // 평가한 사람 등록
  const evaluateParticipants = useSelector(
    (state) => state.participant.evaluateParticipants
  );
  // 자기 자신을 제외한 참가자 목록을 평가지에 올림
  // const userId = 'G41';
  // 평가를 등록할 때 master의 정보는 nickname으로 전송, 참가자 목록에서 nickname을 통해 자기 자신 제외
  const nickname = useSelector((state) => state.auth.user.nickname);

  const participantsWithoutMe = participants.filter(
    (participant) => participant !== nickname
  );

  // 익명 평가이면, master 공백으로 넘김
  useEffect(() => {
    if (isAnonymous === 0) {
      setEvaluateInfo((prevInfo) => ({
        ...prevInfo,
        anonymity: isAnonymous,
        master: nickname,
      }));
    } else {
      setEvaluateInfo((prevInfo) => ({
        ...prevInfo,
        anonymity: isAnonymous,
      }));
    }
  }, [isAnonymous]);

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
    dispatch(isParticipantsEval(evaluateInfo.slave));
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
      {evaluateParticipants.includes(evaluateInfo.slave) ? (
        <Button
          variant='contained'
          color='primary'
          disabled
          sx={{ mt: '10px', marginRight: '8px' }}
        >
          평가 완료
        </Button>
      ) : (
        <Button
          variant='contained'
          color='primary'
          onClick={onHandleSubmit}
          sx={{ mt: '10px', marginRight: '8px' }}
        >
          평가 제출하기
        </Button>
      )}
    </div>
  );
};

export default EvaluateContent;
