/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './MainStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import InfoCard from '../../components/LicenseCard/LicenseCard';
import Modal from '../../components/Modal/Modal';
import { Link } from 'react-router-dom';

const Main = () => {
  const imageUrl = process.env.PUBLIC_URL + '/studyground.png';
  const [isModalOpen, setModalOpen] = useState(false);
  const [isIndex, setIndex] = useState();
  const [licenseData, setLicenseData] = useState([]); // 자격증 데이터를 저장하는 상태
  const [ComData, setComData] = useState([]);

  const token = localStorage.getItem('authorization');

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

  const navigator = useNavigate();

  const openDetail = (boardId) => {
    navigator(`/community/detail/boards/${boardId}`);
  };

  // 자격증 데이터를 가져오는 함수 (예: API 호출)
  const fetchLicenseData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}search/top5`,

        {
          headers: {
            Authorization: token,
            'ngrok-skip-browser-warning': '2',
          },
        },
      );
      const data = await response.json();

      setLicenseData(data.licenses.data); // 데이터에서 licenses 배열을 사용
      setComData(data.boards);
    } catch (error) {
      console.error('Error fetching license data:', error);
    }
  };

  // Fetch license data when the component mounts
  useEffect(() => {
    fetchLicenseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 페이지가 마운트될 때 한 번만 실행

  return (
    <Styled.MainContainer>
      <Header />
      {isModalOpen === true && (
        <Modal
          date={licenseData[isIndex].date}
          setModalOpen={setModalOpen}
          name={licenseData[isIndex].name}
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
          {licenseData.map((info, index) => (
            <InfoCard
              key={index}
              title={info.name}
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
      <Styled.ComContainer>
        {ComData.map((post) => (
          <Styled.Box
            key={post.boardId}
            onClick={() => openDetail(post.boardId)}
          >
            <Styled.Comuseravatar>
              <img src={post.boardCreator.profileImage} alt="프로필 이미지" />
            </Styled.Comuseravatar>
            <Styled.ComText>
              <Styled.Comid>{post.boardCreator.name}</Styled.Comid>
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
