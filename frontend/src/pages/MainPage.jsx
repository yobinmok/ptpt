import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Button from '../components/atoms/Button';
import {
  Container,
  Overlay,
  Content,
} from '../components/styles/MainPageStyles';
import { testRVC } from '../apis/voice';
const MainPage = () => {
  const navigate = useNavigate();
  const [isSection2Visible, setIsSection2Visible] = useState(false);
  const [isSection3Visible, setIsSection3Visible] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const MoveCreateRoom = () => {
    navigate('/createroom');
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (!isAuthenticated) {
      if (scrollPosition > 300) {
        setIsSection2Visible(true);
      }
      if (scrollPosition > 800) {
        setIsSection3Visible(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAuthenticated]);

  const rvctest = () => {
    testRVC(
      {
        data: [],
      },
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <Container isAuthenticated={isAuthenticated}>
      <Overlay />
      {isAuthenticated ? (
        <Content isVisible={true}>
          <h1>Main Page - Logged In</h1>
          <h2>Welcome, User!</h2>
          <Button onClick={rvctest}>test</Button>
          <Button onClick={MoveCreateRoom}>Create Room</Button>
        </Content>
      ) : (
        <>
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
            <Button onClick={rvctest}>test</Button>
          </Content>
        </>
      )}
    </Container>
  );
};

export default MainPage;
