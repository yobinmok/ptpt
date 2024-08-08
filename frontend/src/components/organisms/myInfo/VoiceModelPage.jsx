import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVoiceModel } from '../../../store/actions/voiceModelActions';
import { getProfile } from '../../../apis/auth';

const VoiceModelPage = () => {
  const dispatch = useDispatch();
  // const voiceModel = useSelector((state) => state.voiceModel.data);
  // const error = useSelector((state) => state.voiceModel.error);
  const oauthId = useSelector((state) => state.auth.user.oauthId);
  const [file, setFile] = useState(null);
  const [voiceModelCreated, setVoiceModelCreated] = useState(false);

  useEffect(async () => {
    const profile = await getProfile(oauthId);
    console.log(profile);
    setVoiceModelCreated(profile.voiceModelCreated);
  }, []);

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
      {voiceModelCreated ? (
        <div>음성 모델이 등록되어 있습니다.</div>
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
