/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import * as Styled from './MainStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import InfoCard from '../../components/LicenseCard/LicenseCard';
import Modal from '../../components/Modal/Modal';

const Main = () => {
  const imageUrl = process.env.PUBLIC_URL + '/studyground.png';

  const imageUrl1 = process.env.PUBLIC_URL + '/ava.png';

  const [isModalOpen, setModalOpen] = useState(false);

  const route = () => {
    if (isModalOpen === false) {
      setModalOpen(true);
    }
  };

  const LicenseData = [
    { id: 1, name: '정보처리기사', count: 100 },
    { id: 2, name: '웹디자인기능사', count: 75 },
    { id: 3, name: '멀티미디어콘텐츠제작전문가', count: 50 },
    { id: 4, name: '스포츠경영관리사', count: 30 },
    { id: 5, name: '건설안전기사', count: 10 },
  ];

  const CommunityData = [
    {
      useravatar: '이미지',
      id: '잔디조아쿼카 / 123@naver.com',
      title: '[후기] 정보처리기사 꿀팁 공유합니다.',
      preview:
        '꿀팁 내용입니다 저는 이런 유튜브 보고 공부했고여  책은 이거 추천합니다. 어쩌고 저쩌고 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어 버리었읍니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는',
    },
    {
      useravatar: '이미지',
      id: '잔디조아쿼카 / 123@naver.com',
      title: '[질문] 컬러리스트기사 공부방법 추천해주세요',
      preview:
        '꿀팁 내용입니다 저는 이런 유튜브 보고 공부했고여  책은 이거 추천합니다. 어쩌고 저쩌고 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어 버리었읍니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는',
    },
    {
      useravatar: '이미지',
      id: '잔디조아쿼카 / 123@naver.com',
      title: '[후기] 시각디자인산업기사 실기합격 꿀팁',
      preview:
        '꿀팁 내용입니다 저는 이런 유튜브 보고 공부했고여  책은 이거 추천합니다. 어쩌고 저쩌고 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어 버리었읍니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는',
    },
    {
      useravatar: '이미지',
      id: '잔디조아쿼카 / 123@naver.com',
      title: '[질문] 이번 소방설비기사',
      preview:
        '꿀팁 내용입니다 저는 이런 유튜브 보고 공부했고여  책은 이거 추천합니다. 어쩌고 저쩌고 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어 버리었읍니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는',
    },
    {
      useravatar: '이미지',
      id: '잔디조아쿼카 / 123@naver.com',
      title: '[후기] 건축기사필기시험 후기',
      preview:
        '꿀팁 내용입니다 저는 이런 유튜브 보고 공부했고여  책은 이거 추천합니다. 어쩌고 저쩌고 계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어 버리었읍니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이 지나가는 하늘에는',
    },
  ];

  const [certificationData, setCertificationData] = useState(LicenseData);
  const [communityData, setCommunityData] = useState(CommunityData);

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

  const sortedCertifications = certificationData;

  // 커뮤니티 데이터를 조회수(count)에 따라 정렬
  const sortedCommunity = communityData;

  return (
    <Styled.MainContainer>
      <Header />
      <Styled.ImageContainer>
        <Styled.Image src={imageUrl} alt="Your Image" />
      </Styled.ImageContainer>

      <Styled.TopContainer>
        <Styled.TopText>최근 가장 핫한 자격증 TOP 5</Styled.TopText>

        <Styled.InfoCardContainer>
          {sortedCertifications.map((certification) => (
            // Use InfoCard component for each certification

            <InfoCard
              className="LicenseCard"
              onClick={route}
              key={certification.id}
              title={certification.name}
              count={certification.count}
            />
          ))}
          {isModalOpen === true && <Modal setModalOpen={setModalOpen} />}
        </Styled.InfoCardContainer>
      </Styled.TopContainer>
      <Styled.TopText className="ComText">COMMUNITY</Styled.TopText>
      <Styled.ComContainer>
        {sortedCommunity.map((post) => (
          <Styled.Box key={post.id}>
            <Styled.Comuseravatar>
              {/*{post.useravatar}*/}
              <img src={imageUrl1} alt="useravater" />
            </Styled.Comuseravatar>
            <Styled.ComText>
              <Styled.Comid>{post.id}</Styled.Comid>
              <Styled.Comtitle>{post.title}</Styled.Comtitle>
              <Styled.Compreview>{post.preview}</Styled.Compreview>
            </Styled.ComText>
          </Styled.Box>
        ))}
      </Styled.ComContainer>
      <Footer />
    </Styled.MainContainer>
  );
};

export default Main;
