import React from 'react';
import styled from 'styled-components';
import googleButtonImage from '../../assets/images/google-login-button.svg'; // 전체 버튼 이미지 파일 경로

// 버튼 컨테이너 스타일 정의
const ButtonContainer = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

// 이미지 스타일 정의
const ButtonImage = styled.img`
  width: ${(props) => props.width || '200px'}; // 이미지 크기 조정
`;

const GoogleButton = ({ onClick, ...styleProps }) => {
  /**
   * GoogleButton 컴포넌트
   * - onClick: 버튼 클릭 시 실행될 함수
   * - styleProps: 추가적인 스타일 속성들
   *
   * 작동 방식:
   * 1. 사용자가 버튼을 클릭하면 onClick 함수가 실행
   * 2. onClick 함수는 부모 컴포넌트에서 전달받은 함수로, 구글 로그인 URL로 리디렉트하는 기능 수행
   * 3. 스타일 속성들은 styled-components를 통해 동적으로 적용
   */
  return (
    <ButtonContainer onClick={onClick} {...styleProps}>
      <ButtonImage src={googleButtonImage} alt="Google Login Button" />
    </ButtonContainer>
  );
};

export default GoogleButton;
