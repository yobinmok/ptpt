import styled from 'styled-components';
import ThreeDImage from '../../assets/images/section1.png';

// 컨테이너 스타일 정의
export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; /* 고정된 길이 */
  padding: 20px;
  background: url(${ThreeDImage}) no-repeat center center fixed;
  background-size: cover;
`;

// 소개 섹션 스타일
export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  padding: 40px;
  background: transparent;
  border-radius: 10px;
  opacity: 1;
  text-align: center; /* 텍스트를 중앙 정렬 */
`;

// 콘텐츠 스타일 정의 (transient props 사용)
export const Content = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.$reverse ? 'row-reverse' : 'row'}; /* $reverse prop에 따라 정렬 */
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 60px;
  padding: 40px;
  background: transparent; /* 배경을 투명하게 설정 */
  border-radius: 10px;
  opacity: 1; /* 항상 보이게 설정 */
  transition: opacity 1s ease-in-out;

  /* 추가: $reverse가 true일 때 텍스트와 이미지 간의 마진 조정 */
  ${(props) =>
    props.$reverse &&
    `
      & > ${ProjectTextWrapper} {
        padding-left: 0;
        padding-right: 20px; /* 텍스트와 이미지 간의 여백 */
      }
    `}
`;

// 개별 프로젝트 카드를 위한 스타일 정의
export const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent; /* 배경을 완전히 투명하게 설정 */
  margin: 20px 0;
  width: 80%;
  max-width: 800px;
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
`;
// 프로젝트 텍스트 래퍼 스타일 정의
export const ProjectTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 수평 중앙 정렬 */
  text-align: center; /* 텍스트 자체도 가운데 정렬 */
  width: 60%; /* 텍스트가 차지할 넓이 */
  padding-left: 20px; /* 이미지와 텍스트 간의 여백 */
`;

// 프로젝트 이미지 스타일 정의
export const ProjectImage = styled.img`
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 20px;
  background: transparent; /* 이미지 배경을 투명하게 설정 */
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
