import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSavedStudyRooms,
  setSavedStudyRooms,
} from '../../../store/actions/savedStudyRoomActions';

import { getPresetList } from '../../../apis/preset';
import SoloRoomTab from './SoloRoomTab';
import MultiRoomTab from './MultiRoomTab';

const SavedStudyRoomsPage = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('alone'); // 선택된 옵션 상태
  const oauthId = useSelector((state) => state.auth.user.oauthId); // 사용자 ID 가져오기
  const savedStudyRooms = useSelector((state) => state.savedStudyRooms); // Redux 상태에서 저장된 스터디룸 가져오기

  useEffect(() => {
    if (oauthId) {
      dispatch(fetchSavedStudyRooms(oauthId)); // 저장된 스터디룸 데이터 가져오기
    }
  }, [dispatch, oauthId]);

  useEffect(() => {
    getPresetList(
      { oauthId },
      ({ data }) => {
        console.log(data);
        dispatch(setSavedStudyRooms(data));
      },
      (err) => {
        console.log(err);
      }
    );
  }, [oauthId]); // 빈 배열이면 onMounted와 동일 / prev: [dispatch, oauthId]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <h1>저장한 스터디룸 페이지</h1>

      {/* 옵션 선택 */}
      <div style={{ marginBottom: '20px' }}>
        <span
          style={{
            cursor: 'pointer',
            fontWeight: selectedOption === 'alone' ? 'bold' : 'normal',
            marginRight: '10px',
          }}
          onClick={() => handleOptionChange('alone')}
        >
          혼자하기
        </span>
        |
        <span
          style={{
            cursor: 'pointer',
            fontWeight: selectedOption === 'together' ? 'bold' : 'normal',
            marginLeft: '10px',
          }}
          onClick={() => handleOptionChange('together')}
        >
          같이하기
        </span>
      </div>

      {selectedOption === 'together' && <MultiRoomTab />}
      {selectedOption === 'alone' && <SoloRoomTab />}
    </div>
  );
};

export default SavedStudyRoomsPage;
