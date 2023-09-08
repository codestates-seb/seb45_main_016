import React, { useState, useEffect } from 'react';
import * as Styled from './MainStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import InfoCard from '../../components/LicenseCard/LicenseCard';

const Main = () => {
  // eslint-disable-next-line no-undef
  const imageUrl = process.env.PUBLIC_URL + '/STUDY_GROUND.JPG';

  const [certificationData, setCertificationData] = useState([]);
  const [communityData, setCommunityData] = useState([]);

  useEffect(() => {
    // 자격증 데이터 가져오기
    axios
      .get('YOUR_CERTIFICATION_API_URL')
      .then((response) => {
        setCertificationData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching certification data:', error);
      });

    // 커뮤니티 데이터 가져오기
    axios
      .get('YOUR_COMMUNITY_API_URL')
      .then((response) => {
        setCommunityData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching community data:', error);
      });
  }, []);

  const sortedCertifications = certificationData
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 커뮤니티 데이터를 조회수(count)에 따라 정렬
  const sortedCommunity = communityData
    .sort((a, b) => b.count - a.count)
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
          // Use InfoCard component for each certification
          <InfoCard
            key={certification.id}
            title={certification.name}
            count={certification.count}
          />
        ))}
      </Styled.TopContainer>

      <Styled.ComContainer>
        <Styled.TopText>COMMUNITY</Styled.TopText>
        {sortedCommunity.map((post) => (
          <Styled.Box key={post.id}>
            {post.title} - 조회수: {post.count}
          </Styled.Box>
        ))}
      </Styled.ComContainer>
      <Footer />
    </Styled.MainContainer>
  );
};

export default Main;
