import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVoiceModel,
  uploadVoiceModel,
} from '../../../store/actions/voiceModelActions';

const VoiceModelPage = () => {
  const dispatch = useDispatch();
  const voiceModel = useSelector((state) => state.voiceModel.data);
  const error = useSelector((state) => state.voiceModel.error);
  const oauthId = useSelector((state) => state.user.data?.id); // 사용자 ID 가져오기
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (oauthId) {
      dispatch(fetchVoiceModel(oauthId));
    }
  }, [dispatch, oauthId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file && oauthId) {
      dispatch(uploadVoiceModel(oauthId, file));
    }
  };

  if (error) {
    return <div>Error loading voice model: {error.message}</div>;
  }

  return (
    <div>
      <h1>음성 모델 페이지</h1>
      {voiceModel ? (
        <div>
          <p>Voice Model ID: {voiceModel.id}</p>
          <p>Voice Model Description: {voiceModel.description}</p>
        </div>
      ) : (
        <p>No voice model available.</p>
      )}
      <div>
        <input type='file' onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload Voice Model</button>
      </div>
    </div>
  );
};

export default VoiceModelPage;
