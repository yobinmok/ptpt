import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavbar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 하단 그림자 효과 */
  padding: 0 40px; /* 좌우 패딩 */
  box-sizing: border-box; /* 패딩을 포함한 전체 너비 계산 */
  position: fixed; /* 상단에 고정 */
  top: 0; /* 화면 상단에 위치 */
  left: 0;
  z-index: 1000; /* 다른 요소들 위에 위치 */
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
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

function Navbar() {
  return (
    <StyledNavbar>
      <LeftContainer>
        <Link to='/'>홈</Link>
      </LeftContainer>
      <RightContainer>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/practice'>Start</NavLink>
        <span>프로필 사진</span>
      </RightContainer>
    </StyledNavbar>
  );
}

export default Navbar;
