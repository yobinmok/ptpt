import React from 'react';
import styled from 'styled-components';
import googleSymbolImage from '../../assets/images/google-symbol.svg'; // 투명 배경의 구글 로고 이미지 파일 경로

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff; // 구글 로그인 버튼의 배경색
  color: #000000;
  padding: 10px 20px;
  border-radius: 12px; // Kakao 버튼과 동일한 라운드 처리
  font-size: 16px;
  border: 1px solid #e0e0e0; // 구글 버튼 테두리 색상
  cursor: pointer;
  width: 215px; // Kakao 버튼과 동일한 폭
  height: 44px; // Kakao 버튼과 동일한 높이

  &:hover {
    background-color: #f0f0f0; // hover 시 색상
  }
`;

const Symbol = styled.img`
  width: 24px; // Kakao 버튼과 동일한 로고 크기
  height: 24px; // Kakao 버튼과 동일한 로고 크기
  margin-right: 8px; // Kakao 버튼과 동일한 마진
`;

const Label = styled.span`
  color: #000000;
  font-size: 16px;
`;

const GoogleButton = ({ onClick, children, ...styleProps }) => {
  return (
    <ButtonContainer onClick={onClick} {...styleProps}>
      <Symbol src={googleSymbolImage} alt='Google Symbol' />
      <Label>{children}</Label>
    </ButtonContainer>
  );
};

export default GoogleButton;
