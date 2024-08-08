import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateNickname,
  fetchUserProfile,
} from '../../store/actions/userActions';

// 모달의 배경을 어둡게 만드는 오버레이 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달의 콘텐츠 스타일
const ModalContent = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 모달의 헤더 스타일
const ModalHeader = styled.h3`
  margin: 0;
  text-align: center;
`;

// 모달의 버튼 스타일
const ModalButton = styled.button`
  margin-top: 10px;
`;

// 닉네임 입력 섹션 스타일
const NicknameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// 닉네임 입력 필드 스타일
const NicknameInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
`;

// 중복 확인 결과 스타일
const CheckResult = styled.div`
  color: ${(props) => (props.$isAvailable ? 'green' : 'red')};
  font-size: 14px;
  text-align: center;
`;

// axios 인스턴스

const instance = Axios();

// ProfileEditModal 컴포넌트 정의
const ProfileEditModal = ({ onClose, oauthId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data) || {};
  const { nickname = '' } = user;

  useEffect(() => {
    if (oauthId) {
      dispatch(fetchUserProfile(oauthId));
    }
  }, [dispatch, oauthId]);

  const [tempNickname, setTempNickname] = useState(nickname);
  const [checkResult, setCheckResult] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = async () => {
    try {
      const response = await instance.put(`/member/${oauthId}`, {
        nickname: tempNickname,
        checkOnly: true,
      });
      const available = response.data.isAvailable;
      setCheckResult(
        available ? 'Nickname is available.' : 'Nickname is already taken.'
      );
      setIsAvailable(available);
    } catch (error) {
      console.error('Error checking nickname:', error);
      setCheckResult('Error checking nickname.');
      setIsAvailable(false);
    }
  };

  // 저장 버튼 클릭 시 호출되는 핸들러
  const handleSave = async () => {
    if (isAvailable) {
      try {
        await instance.put(`/member/${oauthId}`, { nickname: tempNickname });
        dispatch(updateNickname(tempNickname));
        onClose();
      } catch (error) {
        setCheckResult('Error saving nickname.');
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        {/* 닉네임 입력 섹션 */}
        <NicknameSection>
          <NicknameInput
            type='text'
            value={tempNickname}
            onChange={(e) => {
              setTempNickname(e.target.value);
              setCheckResult(null);
              setIsAvailable(false);
            }}
            placeholder='Enter new nickname'
          />
          <button onClick={handleNicknameCheck}>Check</button>
        </NicknameSection>
        {/* 중복 확인 결과 표시 */}
        {checkResult && (
          <CheckResult $isAvailable={isAvailable}>{checkResult}</CheckResult>
        )}
        {/* 모달 하단 버튼 섹션 */}
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          {/* 닉네임 저장 버튼 */}
          <ModalButton onClick={handleSave} disabled={!isAvailable}>
            Save
          </ModalButton>
          {/* 모달 닫기 버튼 */}
          <ModalButton onClick={onClose}>Cancel</ModalButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileEditModal;
