import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import RoomListItem from '../components/organisms/RoomListItem';
import { searchByStudyRoomName } from '../apis/room';
import styled from 'styled-components';
import { loadRoomList } from '../apis/room';
import {
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CreateRoom from './room/CreateRoom';
import Modal from '../components/molecules/RoomCreateModal';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60px; // 버튼 컨테이너의 높이
  display: flex;
  justify-content: end; // 기본적으로 버튼을 좌측 정렬
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 0; // 오른쪽 끝으로 위치
  transform: translateX(
    calc(0.67% - 106px)
  ); // 중간에서 2/3 지점으로 이동 (16px은 버튼의 여백을 고려)
  margin-right: 16px; // 버튼과 컨테이너 오른쪽 끝 사이의 간격
`;

const RecommendInnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 260px;
  margin-top: 20px;
  margin-bottom: 50px;
  justify-content: center;
  width: 100%;
  background-color: ${(props) => props.backgroundcolor};
`;

const RecommendLetter = styled.p`
  font-size: ${(props) => props.size};
  background-color: black;
  color: ${(props) => props.color};
  margin-top: ${(props) => props.margintop};
  margin-bottom: ${(props) => props.marginbottom};
  background-color: ${(props) => props.backgroundcolor};
`;

const LiButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  color: cornflowerblue;
`;

const RoomListPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onLoadRoomList();
  }, []); // 빈 배열을 추가하여 useEffect가 처음 렌더링될 때 한 번만 실행되도록 설정

  const [currentList, setCurrentList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchType, setSearchType] = useState('roomname'); // 검색 유형 상태
  const [searchName, setSearchName] = useState(''); // 검색어 상태
  const [selectedTopics, setSelectedTopics] = useState([]); // 선택된 주제 상태

  const onLoadRoomList = async () => {
    const response = await loadRoomList();
    setCurrentList([...response.data]);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    if (searchType === 'roomname') {
      // 제목으로 찾기
      console.log(searchName);
      const response = searchByStudyRoomName(searchName);
      // response 보고 수정하기
      setCurrentList([...response.data]);
    } else if (searchType === 'subject') {
      // 주제로 찾기
      console.log(selectedTopics);
    }
  };

  const handleTopicChange = (topic) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((t) => t !== topic)
        : [...prevTopics, topic]
    );
  };

  // const handleRoomSave = (roomInfo) => {
  //   handleModalClose();
  // };

  return (
    <>
      <div>
        <div>
          <div>
            <h1>방 목록</h1>
          </div>
          <SearchContainer>
            <TextField
              select
              label='검색 유형'
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value='roomname'>제목</MenuItem>
              <MenuItem value='subject'>주제</MenuItem>
            </TextField>

            {searchType === 'roomname' ? (
              <TextField
                label='검색어'
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                sx={{ minWidth: 300 }}
              />
            ) : (
              <div>
                {['웹', 'ros', 'ai'].map((topic) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicChange(topic)}
                      />
                    }
                    label={topic}
                    key={topic}
                  />
                ))}
              </div>
            )}

            <Button variant='contained' color='primary' onClick={handleSearch}>
              검색
            </Button>
          </SearchContainer>
          <div>
            <ButtonContainer>
              <StyledButton
                onClick={handleModalOpen}
                variant='contained'
                color='primary'
              >
                방 생성하기
              </StyledButton>
            </ButtonContainer>
            <Modal
              open={isModalOpen}
              onClose={handleModalClose}
              title='방 생성'
              // onSave={handleRoomSave}
            >
              {/* <CreateRoom onSave={handleRoomSave} onClose={handleModalClose} /> */}
              <CreateRoom onClose={handleModalClose} />
            </Modal>
          </div>
          <RecommendInnerWrapper>
            {currentList.length === 0 ? (
              <RecommendLetter color={'#EAF1FF'}>
                최근에 만들어진 방이 없어요.
                <LiButton onClick={() => navigate('/createroom')}>
                  방을 만들어볼까요?
                </LiButton>
              </RecommendLetter>
            ) : (
              <>
                {currentList.map((room, index) => (
                  <RoomListItem {...room} key={index} />
                ))}
              </>
            )}
          </RecommendInnerWrapper>
        </div>
      </div>
    </>
  );
};

export default RoomListPage;
