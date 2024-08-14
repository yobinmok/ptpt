import React from 'react';
import { useNavigate } from 'react-router-dom';
import togetherImage from '../../assets/images/together.png';
import { ButtonContainer, Image, Label, Overlay } from './SoloOptionButton';

const MultiOptionButton = () => {
  const navigate = useNavigate();

  // 버튼 클릭 시 /multi 페이지로 이동
  const handleClick = () => {
    navigate('/room/list');
  };

  return (
    <ButtonContainer onClick={handleClick}>
      <Image src={'img_multi.webp'} alt='같이 하기' />
      <Overlay />
      <Label>같이 하기</Label>
    </ButtonContainer>
  );
};

export default MultiOptionButton;
