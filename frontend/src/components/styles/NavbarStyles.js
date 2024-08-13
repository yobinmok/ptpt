import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 스타일 컴포넌트 정의
export const StyledNavbar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 0 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0; /* 오른쪽도 설정하여 전체 너비를 차지하도록 설정 */
  z-index: 1000;
  box-sizing: border-box; /* 박스 사이징 설정 */
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
  margin: 0 5px;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 20px;

  &:hover {
    background: #f0f0f0;
  }
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;
