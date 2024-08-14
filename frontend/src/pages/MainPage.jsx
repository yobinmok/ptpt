import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Button from '../components/atoms/Button';
import { testRVC } from '../apis/voice';
import {
  Container,
  Overlay,
  Content,
  ProjectCard,
  ProjectImage,
  ProjectTitle,
  ProjectDescription,
  ProjectLink,
} from '../components/styles/MainPageStyles';
import section2Image from '../assets/images/section2.jpg';
import section3Image from '../assets/images/section3.jpg';
import section4Image from '../assets/images/section4.jpg';

const MainPage = () => {
  const navigate = useNavigate();
  const [isSection2Visible, setIsSection2Visible] = useState(false);
  const [isSection3Visible, setIsSection3Visible] = useState(false);
  const [isSection4Visible, setIsSection4Visible] = useState(false);
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
      if (scrollPosition > 1300) {
        setIsSection4Visible(true);
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
            <ProjectCard>
              <ProjectImage src={section2Image} alt='Section 2 Project' />
              <ProjectTitle>Section 2 Project</ProjectTitle>
              <ProjectDescription>
                This is a description of the project for section 2.
              </ProjectDescription>
              <ProjectLink href='#'>View Project</ProjectLink>
            </ProjectCard>
          </Content>
          <Content isVisible={isSection3Visible}>
            <ProjectCard>
              <ProjectImage src={section3Image} alt='Section 3 Project' />
              <ProjectTitle>Section 3 Project</ProjectTitle>
              <ProjectDescription>
                This is a description of the project for section 3.
              </ProjectDescription>
              <ProjectLink href='#'>View Project</ProjectLink>
            </ProjectCard>
          </Content>
          <Content isVisible={isSection4Visible}>
            <ProjectCard>
              <ProjectImage src={section4Image} alt='Section 4 Project' />
              <ProjectTitle>Section 4 Project</ProjectTitle>
              <ProjectDescription>
                This is a description of the project for section 4.
              </ProjectDescription>
              <ProjectLink href='#'>View Project</ProjectLink>
            </ProjectCard>
            <Button onClick={MoveCreateRoom}>방 생성하기</Button>
          </Content>
        </>
      )}
    </Container>
  );
};

export default MainPage;
