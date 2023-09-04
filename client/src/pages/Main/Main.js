// import React, { useState, useEffect } from 'react';
import * as Styled from './MainStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// import info from '../../utils/Api';

const Main = () => {
  // eslint-disable-next-line no-undef
  const imageUrl = process.env.PUBLIC_URL + '/STUDY_GROUND.JPG';

  // 가상의 자격증 데이터
  const certificationData = [
    { id: 1, name: '자격증 1', views: 100 },
    { id: 2, name: '자격증 2', views: 200 },
    { id: 3, name: '자격증 3', views: 600 },
    { id: 4, name: '자격증 4', views: 400 },
    { id: 5, name: '자격증 5', views: 500 },
    // 더 많은 자격증 데이터
  ];

  // 가상의 커뮤니티 데이터
  const communityData = [
    { id: 1, title: '글 1', views: 50 },
    { id: 2, title: '글 2', views: 75 },
    { id: 3, title: '글 3', views: 60 },
    { id: 4, title: '글 4', views: 90 },
    { id: 5, title: '글 5', views: 120 },
    // 더 많은 커뮤니티 데이터
  ];

  // 조회수에 따라 데이터 정렬
  const sortedCertifications = certificationData
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
  const sortedCommunity = communityData
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <Styled.MainContainer>
      <Header />
      <Styled.ImageContainer>
        <Styled.Image src={imageUrl} alt="Your Image" />
      </Styled.ImageContainer>

      <Styled.TopContainer>
        <Styled.TopText>최근 가장 핫한 자격증</Styled.TopText>
        {sortedCertifications.map((certification) => (
          <Styled.Box key={certification.id}>
            {certification.name} - 조회수: {certification.views}
          </Styled.Box>
        ))}
      </Styled.TopContainer>

      <Styled.ComContainer>
        <Styled.TopText>COMMUNITY</Styled.TopText>
        {sortedCommunity.map((post) => (
          <Styled.Box key={post.id}>
            {post.title} - 조회수: {post.views}
          </Styled.Box>
        ))}
      </Styled.ComContainer>
      <Footer />
    </Styled.MainContainer>
  );
};

export default Main;
