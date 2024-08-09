import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setRoomSession } from '../../store/actions/room';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createStudyRoom } from '../../apis/room';
import { setHost } from '../../store/actions/room';
import { saveMultiPreset } from '../../store/actions/multiAction';
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
} from '@mui/material';

const CreateRoomBlock = styled.div`
  height: 510px;
`;

const ProfileWrapper = styled.div`
  margin: 30px 0px;
`;

const CreateRoom = ({ onSave, onClose }) => {
  // user정보 불러와야함
  // const user = useSelector((state) => state.user.data.oauth_id);
  const nickname = useSelector((state) => state.user.nickname);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const minDateTime = new Date();
  minDateTime.setHours(17);
  const maxDateTime = new Date();
  maxDateTime.setHours(20);

  // 방에 입장하기 위한 세션 정보
  console.log(
    'create isside : ' + useSelector((state) => state.room.isSidebarOpen)
  );
  const onHandleEnterRoom = (roomId) => {
    const sessionData = {
      sessionName: `Session${roomId}`,
      roomId,
    };
    // console.log('create room ' + this.sessionData);
    dispatch(setRoomSession(sessionData));
    dispatch(setHost(nickname));
    // navigate('/room/detail');
    // navigate('/multi');
    navigate(`/multi/${roomId}`);
  };

  // 방 생성 시 설정할 요소들
  const [roomInfo, setRoomInfo] = useState({
    roomname: '',
    roomtopic: '',
    roomcomment: '',
    roompw: '',
    roomopen: 0, // 0: public, 1: private
    roomtime: '', // 시간으로 변경 필요
    roomhidden: 0, // 익명 공개 0이면 공개?
  });
  const [showPassword, setShowPassword] = useState(false);

  const onRoomInfoInput = (e) => {
    setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });
    console.log(roomInfo);
  };

  const onRoomInfoSubmit = async (e) => {
    // e.preventDefault();
    // 방 이름 유효성 검사
    if (roomInfo.roomname.length === 0) {
      console.log('방 이름이 없습니다.');
      alert('방 제목 설정 ');
      return;
    }
    // axios -> 방 생성 api 실행
    // const user = 789;
    const response = await createStudyRoom(userId, roomInfo);
    dispatch(saveMultiPreset(roomInfo));
    onHandleEnterRoom(response); // roomId를 props
  };

  const handleSave = () => {
    // onSave(roomInfo);
    onClose();
    onRoomInfoSubmit();
  };

  // roomopen을 의존성으로 대입하여, roomopen이 변할 때마다 호출
  useEffect(() => {
    if (roomInfo.roomopen === '1') {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  }, [roomInfo.roomopen]);
  return (
    <>
      <CreateRoomBlock>
        <ProfileWrapper>
          <TextField
            name='roomname'
            label='방 이름'
            fullWidth
            margin='normal'
            onChange={onRoomInfoInput}
            value={roomInfo.roomname}
          />
          <TextField
            name='roomtopic'
            label='방 주제'
            fullWidth
            margin='normal'
            onChange={onRoomInfoInput}
            value={roomInfo.roomtopic}
          />
          <TextField
            name='roomcomment'
            label='방 설명'
            fullWidth
            margin='normal'
            onChange={onRoomInfoInput}
            value={roomInfo.roomcomment}
          />
          <TextField
            name='roomtime'
            label='시작 시간'
            fullWidth
            type='datetime-local'
            margin='normal'
            // inputProps={{ min: `${today}T00:00`, max: `${today}T23:59` }}
            inputProps={{
              min: minDateTime.toISOString().slice(0, 16),
              max: maxDateTime.toISOString().slice(0, 16),
            }}
            InputLabelProps={{ shrink: true }}
            onChange={onRoomInfoInput}
            value={roomInfo.roomtime}
          />

          <FormControl component='fieldset' margin='normal'>
            <FormLabel component='legend'>방의 공개 여부</FormLabel>
            <RadioGroup
              row
              name='roomopen'
              value={roomInfo.roomopen}
              onChange={onRoomInfoInput}
            >
              <FormControlLabel value='0' control={<Radio />} label='공개' />
              <FormControlLabel value='1' control={<Radio />} label='비공개' />
            </RadioGroup>
          </FormControl>
          <br />
          {showPassword && (
            <TextField
              name='roompw'
              label='비밀번호'
              // fullWidth
              margin='normal'
              onChange={onRoomInfoInput}
              value={roomInfo.roompw}
            />
          )}
          <br />
          <FormControl component='fieldset' margin='normal'>
            <FormLabel component='legend'>평가 익명 여부</FormLabel>
            <RadioGroup
              row
              name='roomhidden'
              value={String(roomInfo.roomhidden)}
              onChange={onRoomInfoInput}
            >
              <FormControlLabel value='0' control={<Radio />} label='익명' />
              <FormControlLabel value='1' control={<Radio />} label='공개' />
            </RadioGroup>
          </FormControl>
          <br />
          <Box mt={2} display='flex' justifyContent='flex-end' gap={1}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSave}
              sx={{ marginRight: '8px' }}
            >
              저장
            </Button>
            <Button variant='contained' onClick={onClose}>
              닫기
            </Button>
          </Box>
        </ProfileWrapper>
      </CreateRoomBlock>
    </>
  );
};
export default CreateRoom;
