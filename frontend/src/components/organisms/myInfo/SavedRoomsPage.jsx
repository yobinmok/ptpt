import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSavedRooms } from '../../../store/actions/savedRoomsActions';
import { getPresetList } from '../../../apis/preset';
import SoloRoomTab from './SoloRoomTab';
import MultiRoomTab from './MultiRoomTab';

const SavedRoomsPage = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('alone'); // 선택된 옵션 상태
  const oauthId = useSelector((state) => state.auth.user.oauthId); // 사용자 ID 가져오기
  const savedRooms = useSelector((state) => state.savedRooms);

  useEffect(() => {
    getPresetList(
      { oauthId },
      ({ data }) => {
        console.log(data);
        dispatch(setSavedRooms(data));
        console.log(savedRooms);
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

export default SavedRoomsPage;
