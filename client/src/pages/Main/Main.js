/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './MainStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// import axios from 'axios';
import InfoCard from '../../components/LicenseCard/LicenseCard';
import Modal from '../../components/Modal/Modal';
import { Link } from 'react-router-dom';

const Main = ({ InfoData, ComData }) => {
  const imageUrl = process.env.PUBLIC_URL + '/studyground.png';

  const imageUrl1 = process.env.PUBLIC_URL + '/ava.png';

  const [isModalOpen, setModalOpen] = useState(false);
  const [isIndex, setIndex] = useState();

  const modal = (index) => {
    if (isModalOpen === false) {
      setModalOpen(true);
    }
    setIndex(index);
  };

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style = `overflow:hidden`;
    } else {
      document.body.style = `overflow:display`;
    }
  });

  // const [certificationData, setCertificationData] = useState(LicenseData);
  // const [communityData, setCommunityData] = useState(CommunityData);

  // useEffect(() => {
  //   // 자격증 데이터 가져오기
  //   axios
  //     .get('YOUR_CERTIFICATION_API_URL')
  //     .then((response) => {
  //       setCertificationData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching certification data:', error);
  //     });

  //   // 커뮤니티 데이터 가져오기
  //   axios
  //     .get('YOUR_COMMUNITY_API_URL')
  //     .then((response) => {
  //       setCommunityData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching community data:', error);
  //     });
  // }, []);

  const sortedInfo = [...InfoData]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 커뮤니티 데이터를 조회수(count)에 따라 정렬
  const sortedComData = [...ComData]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const navigator = useNavigate();

  const openDetail = () => {
    navigator('/community/detail');
  };

  return (
    <Styled.MainContainer>
      <Header />
      {isModalOpen === true && (
        <Modal
          date={InfoData[isIndex].date}
          setModalOpen={setModalOpen}
          name={InfoData[isIndex].name}
        />
      )}
      <Styled.ImageContainer>
        <Styled.Image src={imageUrl} alt="Your Image" />
      </Styled.ImageContainer>

      <Styled.TopContainer>
        <Styled.TopText>
          최근 가장 핫한 자격증 TOP 5
          <Link to="/Info">
            <button className="more1">더 많은 자격증 보러가기 ▶</button>
          </Link>
        </Styled.TopText>

        <Styled.InfoCardContainer>
          {sortedInfo.map((info, index) => (
            <InfoCard
              key={index}
              title={info.name}
              description={info.description}
              date={info.date}
              isIndex={isIndex}
              onClick={() => {
                modal(index);
              }}
            />
          ))}
        </Styled.InfoCardContainer>
      </Styled.TopContainer>
      <Styled.TopText className="ComText">
        COMMUNITY
        <Link to="/community">
          <button className="more2">더 많은 정보 보러가기 ▶</button>
        </Link>
      </Styled.TopText>
      <Styled.ComContainer onClick={openDetail}>
        {sortedComData.map((post) => (
          <Styled.Box key={post.id}>
            <Styled.Comuseravatar>
              {/*{post.useravatar}*/}
              <img src={imageUrl1} alt="useravater" />
            </Styled.Comuseravatar>
            <Styled.ComText>
              <Styled.Comid>{post.username}</Styled.Comid>
              <Styled.Comtitle>{post.title}</Styled.Comtitle>
              <Styled.Compreview>{post.content}</Styled.Compreview>
            </Styled.ComText>
          </Styled.Box>
        ))}
      </Styled.ComContainer>
      <Footer />
    </Styled.MainContainer>
  );
};

export default Main;
