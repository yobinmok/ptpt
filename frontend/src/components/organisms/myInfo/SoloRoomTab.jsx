import { useDispatch, useSelector } from 'react-redux';
import SoloRoomItem from '../../molecules/SoloRoomItem';
import { initPreset } from '../../../store/actions/soloActions';
import { useNavigate } from 'react-router';

const SoloRoomTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedRooms = useSelector((state) => state.savedRooms.data || []); // 기본값으로 빈 배열 설정
  const soloRoom = savedRooms.filter((preset) => preset.presetType === 'solo');

  const handleItemClick = (item) => {
    console.log('Clicked item:', item);
    dispatch(initPreset(item));
    navigate('/solo');
  };
  return (
    <>
      {soloRoom.length > 0 ? (
        soloRoom.map((preset) => (
          <SoloRoomItem
            key={preset.presetId}
            item={preset.presetData}
            onClick={handleItemClick}
          />
        ))
      ) : (
        <p>저장한 스터디룸이 없습니다.</p>
      )}
    </>
  );
};

export default SoloRoomTab;
