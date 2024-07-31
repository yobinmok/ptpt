import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThreeDImage from '../assets/images/section1.png'; // 3D 이미지 파일 경로
import { useNavigate } from 'react-router';
import Button from '../components/atoms/Button';

// 컨테이너 스타일 정의
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300vh; /* 길이를 늘려서 스크롤이 가능하도록 설정 */
  padding: 20px;
  background: url(${ThreeDImage}) no-repeat center center fixed;
  background-size: cover; /* 이미지를 화면에 맞게 조정 */
`;

// 흰색 그라디언트 오버레이 정의
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    white 0%,
    white 49px,
    rgba(255, 255, 255, 0) 200px
  );
  pointer-events: none; /* 오버레이가 클릭 등의 이벤트를 차단하지 않도록 설정 */
`;

// 콘텐츠 스타일 정의
const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isVisible',
})`
  position: relative;
  z-index: 1; /* 오버레이 위에 위치하도록 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh; /* 섹션을 화면 전체 높이로 설정 */
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const MainPage = () => {
  const navigate = useNavigate();
  const [isSection2Visible, setIsSection2Visible] = useState(false);
  const [isSection3Visible, setIsSection3Visible] = useState(false);

  const MoveCreateRoom = () => {
    navigate('/createroom');
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    // 스크롤 위치에 따라 섹션의 가시성을 업데이트
    if (scrollPosition > 300) {
      setIsSection2Visible(true);
    }
    if (scrollPosition > 800) {
      setIsSection3Visible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container>
      <Overlay /> {/* 흰색 그라디언트 오버레이 추가 */}
      <Content isVisible={true}>
        <h1>Main Page</h1>
        <h2>Welcome to Our Site</h2>
        <p>Please log in to access more features.</p>
      </Content>
      <Content isVisible={isSection2Visible}>
        <h2>Section 2</h2>
        <p>This is the second section of the main page content.</p>
      </Content>
      <Content isVisible={isSection3Visible}>
        <h2>Section 3</h2>
        <p>This is the third section of the main page content.</p>
        <Button onClick={MoveCreateRoom}>방 생성하기</Button>
      </Content>
    </Container>
  );
};

export default MainPage;
