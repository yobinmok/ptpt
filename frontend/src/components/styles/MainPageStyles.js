import styled from 'styled-components';
import ThreeDImage from '../../assets/images/section1.png';

// 컨테이너 스타일 정의
export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isAuthenticated',
})`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: ${(props) =>
    props.isAuthenticated
      ? '100vh'
      : '300vh'}; /* 길이를 로그인 상태에 따라 설정 */
  padding: 20px;
  background: url(${ThreeDImage}) no-repeat center center fixed;
  background-size: cover;
`;

// 흰색 그라디언트 오버레이 정의
export const Overlay = styled.div`
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
  pointer-events: none;
`;

// 콘텐츠 스타일 정의
export const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isVisible',
})`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;
