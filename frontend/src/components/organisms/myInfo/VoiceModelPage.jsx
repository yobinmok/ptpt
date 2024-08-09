import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProfile } from '../../../apis/auth';
import { trainModelApi } from '../../../apis/voice';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../store/actions/voiceModelActions';

const VoiceModelPage = () => {
  const dispatch = useDispatch();
  const oauthId = useSelector((state) => state.auth.user.oauthId);
  const loading = useSelector((state) => state.voiceModel.loading);
  const [file, setFile] = useState(null);
  const [voiceModelCreated, setVoiceModelCreated] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile(oauthId);
        setVoiceModelCreated(profile.voiceModelCreated);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, [oauthId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append('oauthId', oauthId);
      formData.append('audio', file);
      trainModelApi(
        formData,
        (res) => {
          console.log(res);
          setVoiceModelCreated(true);
          dispatch(setLoading(false));
        },
        (err) => {
          console.log(err);
          dispatch(setLoading(false)); // 로딩 종료
        }
      );
    }
  };

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
        <button onClick={handleFileUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Voice Model'}
        </button>
        {loading && <div>Loading...</div>} {/* 로딩 표시 */}
      </div>
    </div>
  );
};

export default VoiceModelPage;
