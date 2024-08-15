import React from 'react';
import {
  Container,
  Content,
  ProjectCard,
  ProjectImage,
  ProjectTitle,
  ProjectDescription,
  ProjectLink,
  ProjectTextWrapper,
  IntroContent,
} from '../components/styles/MainPageStyles';
import section2Image from '../assets/images/section2.jpg';
import section3Image from '../assets/images/section3.jpg';

const MainPage = () => {
  return (
    <Container>
      {/* Section 1 */}
      <IntroContent>
        <h1>Section 1 / 영상?</h1>
        <h2>Welcome to Our Site</h2>
        <p>Please log in to access more features.</p>
      </IntroContent>

      {/* Section 2 */}
      <Content $isVisible={true}>
        <ProjectCard>
          <ProjectImage
            src={section2Image}
            alt='AI 음성 학습을 통한 발표 연습'
          />
        </ProjectCard>
        <ProjectTextWrapper>
          <ProjectTitle>내 목소리로 완성하는 완벽한 발표</ProjectTitle>
          <ProjectDescription>
            발표 준비, 이제 더 이상 혼자가 아닙니다. AI가 여러분의 목소리를
            학습해, 보다 정확하고 자연스러운 발표를 도와드립니다. 스크립트를
            업로드하고, AI가 제안하는 최적의 톤과 속도로 발표를 연습해보세요.
            당신만의 스타일을 유지하면서도, 더 자신감 있는 발표를 완성할 수
            있습니다.
          </ProjectDescription>
          <ProjectLink href='#'>더 알아보기</ProjectLink>
        </ProjectTextWrapper>
      </Content>

      {/* Section 3 */}
      <Content $isVisible={true} $reverse={true}>
        <ProjectCard>
          <ProjectImage
            src={section3Image}
            alt='AI와 함께하는 실전 같은 발표 연습'
          />
        </ProjectCard>
        <ProjectTextWrapper>
          <ProjectTitle>모두가 놀랄 발표, AI로 준비하세요</ProjectTitle>
          <ProjectDescription>
            중요한 발표를 앞두고 계신가요? AI가 제공하는 모범 답안을 통해 내
            발표를 더욱 완벽하게 다듬어보세요. 다양한 음성 모델을 활용해 실제
            발표와 유사한 상황을 시뮬레이션하고, 내 발표를 AI의 가이드와
            비교해볼 수 있습니다. 이제, 실전에서도 자신 있게 발표하세요.
          </ProjectDescription>
          <ProjectLink href='#'>더 알아보기</ProjectLink>
        </ProjectTextWrapper>
      </Content>
    </Container>
  );
};

export default MainPage;
