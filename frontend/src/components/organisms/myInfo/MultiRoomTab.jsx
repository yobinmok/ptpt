import { useSelector } from 'react-redux';
import MultiRoomItem from '../../molecules/MultiRoomItem';
import MultiRoomListItem from '../MultiRoomListItem';

const MultiRoomTab = () => {
  const savedRoom = useSelector((state) => state.savedRooms.data);
  const multiRoom = savedRoom.filter((preset) => preset.presetType === 'multi');

  return (
    <>
      {multiRoom.length > 0 ? (
        multiRoom.map((preset) => (
          <MultiRoomListItem key={preset.presetId} item={preset.presetData} />
        ))
      ) : (
        <p>저장한 스터디룸이 없습니다.</p>
      )}
    </>
  );
};

export default MultiRoomTab;
