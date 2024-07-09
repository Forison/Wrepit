// HeroSection.js
import React from 'react'
import styled from 'styled-components'
import heading from '../images/heading.jpg'

const HeroContainer = styled.section`
  background-color: #000;
  color: #fff;
  padding: 50px;
  text-align: center;
  display: flex;
  margin-top: 60px;
`;

const HeroTag = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  width: 50%;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
`;

const Image = styled.img`
  width: 35%;
  height: 100%;
`;

const HeroSection = () => {
  return (
    <HeroContainer id='home'>
      <HeroTag>
        <HeroTitle>Be Flexible, Wrepit</HeroTitle>
        <HeroSubtitle>When you need payment on your terms.</HeroSubtitle>
        <HeroSubtitle>App coming soon</HeroSubtitle>
      </HeroTag>

      <Image src={heading} alt='Wrepit Goods' />
    </HeroContainer>
  );
};

export default HeroSection
