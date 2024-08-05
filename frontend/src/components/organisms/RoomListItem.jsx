import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Modal, Box, Button } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setRoomSession } from '../../store/actions/room';
import { checkStudyRoomPW } from '../../apis/room';
import { setAnonymous } from '../../store/actions/room';
const { VITE_API_URL } = import.meta.env;

const Card = styled.div`
  position: relative;
  width: calc(
    33.333% - 20px
  ); // 카드가 3개씩 배치되도록 설정, 각 카드 간에 20px 간격 유지
  max-width: 300px; // 최대 너비 설정
  min-width: 250px; // 최소 너비 설정
  height: 200px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 10px; // 각 카드 간에 10px 간격 유지
`;

const CardImage = styled.div`
  position: relative;
  height: 60%;
  background-color: #f0f0f0;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const RoomTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 8px 0;
`;

const RoomSubject = styled.p`
  font-size: 14px;
  margin: 0;
`;

const RoomListItem = ({
  studyRoomTitle,
  subject,
  studyRoomId,
  isPublic,
  description,
  presentationTime,
  anonymity,
  studyRoomPw,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(setAnonymous(anonymity));

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [roomInfo, setRoomInfo] = useState(0);
  const [isJoinDisabled, setIsJoinDisabled] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleJoin = async () => {
    if (studyRoomPw === '') {
      setRoomInfo(studyRoomId);
      return;
    } else {
      console.log('id : ' + studyRoomId + ' pw : ' + password);
      const response = await checkStudyRoomPW(studyRoomId, password);
      console.log(response);
      if (response.status == '200') {
        setRoomInfo(studyRoomId);
      } else {
        alert('비밀번호 오류');
        return;
      }
    }
  };

  useEffect(() => {
    if (roomInfo) {
      const sessionData = {
        sessionName: `Session${roomInfo}`,
        roomId: roomInfo,
      };
      console.log('roominfo : ', roomInfo);
      dispatch(setRoomSession(sessionData));
      navigate(`/multi/${roomInfo}`);
    }
  }, [roomInfo]);

  // 현재 시간이 생성 시간을 초과하면 참가 버튼 비활성화
  useEffect(() => {
    const currentTime = new Date();
    const presentationDateTime = new Date(presentationTime);
    if (currentTime > presentationDateTime) {
      setIsJoinDisabled(true);
    }
  }, [presentationTime]);

  return (
    <>
      <Card onClick={handleOpen}>
        <CardImage>
          {!isPublic ? (
            <LockOpenIcon style={{ position: 'absolute', top: 8, right: 8 }} />
          ) : (
            <LockIcon style={{ position: 'absolute', top: 8, right: 8 }} />
          )}
        </CardImage>
        <CardContent>
          <RoomTitle>{studyRoomTitle}</RoomTitle>
          <RoomSubject>{subject}</RoomSubject>
          <RoomSubject>{presentationTime}</RoomSubject>
        </CardContent>
      </Card>
      <Modal open={showModal} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>{studyRoomTitle}</h2>
          <p>{description}</p>
          <p>{subject}</p>
          <p>{presentationTime}</p>
          {isPublic && (
            <div>
              <input
                type='password'
                placeholder='비밀번호 입력'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <Button
            variant='contained'
            onClick={handleJoin}
            disabled={isJoinDisabled}
          >
            참가
          </Button>
          <Button variant='contained' onClick={handleClose}>
            닫기
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default RoomListItem;
