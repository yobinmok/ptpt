import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import togetherImage from '../../assets/images/together.png';

// 버튼 컨테이너 스타일
const ButtonContainer = styled.div`
  position: relative;
  width: 45%; // 버튼 너비
  height: 500px; // 버튼 높이
  margin: 10px; // 버튼 간격
  cursor: pointer; // 커서 모양
  transition: transform 0.3s ease; // 크기 변경 애니메이션

  // 마우스를 올렸을 때 크기 확대
  &:hover {
    transform: scale(1.05);
  }
`;

// 이미지 스타일
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px; // 모서리 둥글게
`;

// 라벨 스타일
const Label = styled.span`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); // 그림자 효과
`;

const MultiOptionButton = () => {
  const navigate = useNavigate();

  // 버튼 클릭 시 /multi 페이지로 이동
  const handleClick = () => {
    navigate('/multi');
  };

  return (
    <ButtonContainer onClick={handleClick}>
      <Image src={togetherImage} alt='같이 하기' />
      <Label>같이 하기</Label>
    </ButtonContainer>
  );
};

export default MultiOptionButton;
