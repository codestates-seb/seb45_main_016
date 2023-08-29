import React from 'react';
import * as Styled from './MainStyle'; // Adjust the import path based on your file structure
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Main = () => {
  // eslint-disable-next-line no-undef
  const imageUrl = process.env.PUBLIC_URL + '/STUDY_GROUND.JPG';

  return (
    <Styled.MainContainer>
      <Header />
      <Styled.ImageContainer>
        <Styled.Image src={imageUrl} alt="Your Image" />
      </Styled.ImageContainer>

      <Styled.TopContainer>
        <Styled.TopText>최근 가장 핫한 자격증</Styled.TopText>
        <Styled.Box />
        <Styled.Box />
        <Styled.Box />
      </Styled.TopContainer>

      <Styled.ComContainer>
        <Styled.TopText>COMMUNITY</Styled.TopText>
        <Styled.Box />
        <Styled.Box />
        <Styled.Box />
      </Styled.ComContainer>
      <Footer />
    </Styled.MainContainer>
  );
};

export default Main;
