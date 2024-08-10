import React from 'react';
import styled from 'styled-components';

const ExplanationContainer = styled.div`
  max-width: 300px;
  padding: 0 20px;
  margin-left: 200px;
`;

const ExplanationTitle = styled.h3`
  margin-bottom: 10px;
`;

const ExplanationText = styled.p`
  margin-bottom: 10px;
`;

const ExplanationSection = ({ explanations }) => {
  return (
    <ExplanationContainer>
      <ExplanationTitle>평가 점수 설명</ExplanationTitle>
    </ExplanationContainer>
  );
};

export default ExplanationSection;
