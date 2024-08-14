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

// 개별 프로젝트 카드를 위한 스타일 정의
export const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.8); /* 흰색 반투명 배경 */
  padding: 20px;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 800px;
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    opacity: 0.9;
  }
`;

// 프로젝트 이미지 스타일 정의
export const ProjectImage = styled.img`
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 20px;
`;

// 프로젝트 제목 및 설명 스타일 정의
export const ProjectTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

export const ProjectDescription = styled.p`
  font-size: 16px;
  color: #777;
  text-align: center;
`;

// 링크 버튼 스타일 정의
export const ProjectLink = styled.a`
  margin-top: 10px;
  font-size: 16px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
