import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavedRooms } from '../../../store/actions/savedRoomsActions';

const SavedRoomsPage = () => {
  const dispatch = useDispatch();
  const savedRooms = useSelector((state) => state.savedRooms.data);
  const error = useSelector((state) => state.savedRooms.error);
  const oauthId = useSelector((state) => state.user.data?.id); // 사용자 ID 가져오기

  useEffect(() => {
    if (oauthId) {
      dispatch(fetchSavedRooms(oauthId));
    }
  }, [dispatch, oauthId]);

  if (error) {
    return <div>Error loading saved rooms: {error.message}</div>;
  }

  return (
    <div>
      <h1>저장한 스터디룸 페이지22</h1>
      {/* 저장한 스터디룸 데이터를 기반으로 표시 */}
      {savedRooms.length > 0 ? (
        <ul>
          {savedRooms.map((room) => (
            <li key={room.id}>
              <p>Room Name: {room.name}</p>
              <p>Room Description: {room.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved rooms available.</p>
      )}
    </div>
  );
};

export default SavedRoomsPage;
