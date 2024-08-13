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
  Typography,
  Pagination,
  Stack,
} from '@mui/material';
import CreateRoom from './room/CreateRoom';
import Modal from '../components/molecules/RoomCreateModal';
import { askGpt } from '../apis/gpt';
import GptResponseModal from '../components/molecules/GPTModal';

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
  const [searchList, setSearchList] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchType, setSearchType] = useState('roomname'); // 검색 유형 상태
  const [searchName, setSearchName] = useState(''); // 검색어 상태
  const [selectedTopics, setSelectedTopics] = useState([]); // 선택된 주제 상태
  // page 처리 -> size와 sort도 선택을 원하면 추가
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const onLoadRoomList = async () => {
    const response = await loadRoomList(page - 1);
    console.log(response);
    setCurrentList([...response.data.content]);
    setTotalPage(response.data.totalPages);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSearch = async () => {
    if (searchType === 'roomname') {
      // 제목으로 찾기
      setPage(1);
      const response = await searchByStudyRoomName(searchName, page - 1);
      setTotalPage(response.data.totalPages);
      setSearchList([...response.data.content]);
      // response 보고 수정하기
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

  const handleChange = async (event, value) => {
    setPage(value);
    const response = await loadRoomList(value - 1);
    setCurrentList([...response.data.content]);
  };

  const [gptOpen, setGptOpen] = useState(false);
  const [gptRes, setGptRes] = useState("")
  const handleGPT = async (question) => {
    const response = await askGpt(question);
    setGptOpen(true);
    console.log(response);
    setGptRes(response);
  }

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

            <button onClick={() => handleGPT('한국 노래 추천해줘')}>Ask GPT</button>

      {gptOpen && (
        <GptResponseModal
          open={gptOpen}
          onClose={() => setGptOpen(false)}
          response={gptResponse}
        />
      )}
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
            >
              <CreateRoom onClose={handleModalClose} />
            </Modal>
          </div>
          <RecommendInnerWrapper>
            {searchList.length > 0 ? (
              searchList.map((room, index) => (
                <RoomListItem {...room} key={index} />
              ))
            ) : currentList.length === 0 ? (
              <Typography>생성된 방이 없습니다</Typography>
            ) : (
              currentList.map((room, index) => (
                <RoomListItem {...room} key={index} />
              ))
            )}
          </RecommendInnerWrapper>
        </div>
        <div>
          <Stack
            spacing={2}
            alignItems='center' // 가운데 정렬
            justifyContent='center' // 가운데 정렬
            sx={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Typography>Page: {page}</Typography>
            <Pagination count={totalPage} page={page} onChange={handleChange} />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default RoomListPage;
