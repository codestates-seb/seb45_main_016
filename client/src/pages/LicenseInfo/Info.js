// Info.js
import React, { useEffect, useState } from 'react';
import * as Styled from './InfoStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import InfoCard from '../../components/LicenseCard/LicenseCard';
import Modal from '../../components/Modal/Modal';

const InfoData = [
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 2', description: '자격증 2에 대한 설명' },
  { title: '자격증 3', description: '자격증 3에 대한 설명' },
  { title: '자격증 3', description: '자격증 3에 대한 설명' },
  { title: '자격증 3', description: '자격증 3에 대한 설명' },
  { title: '자격증 3', description: '자격증 3에 대한 설명' },
  { title: '자격증 3', description: '자격증 3에 대한 설명' },
  { title: '자격증 3', description: '자격증 3에 대한 설명' },
  { title: '자격증 3', description: '자격증 3에 대한 설명' },
  { title: '자격증 3', description: '자격증 3에 대한 설명' },
  { title: '자격증 3', description: '자격증 3에 대한 설명' },
  { title: '자격증 3', description: '자격증 3에 대한 설명' },
  { title: '자격증 3', description: '자격증 3에 대한 설명' },
  // ... 다른 자격증 데이터들
];

const ITEMS_PER_PAGE = 9; // 한 페이지에 보여줄 아이템 수

const Info = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const totalItems = InfoData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const route = () => {
    if (isModalOpen === false) {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style = `overflow:hidden`;
    } else {
      document.body.style = `overflow:display`;
    }
  });

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <Styled.InfoContainer>
      <Header />
      <Styled.AlertContainer>
        자격증 정보, 한눈에 확인해보세요
      </Styled.AlertContainer>

      <Styled.GridContainer>
        {InfoData.slice(startIndex, endIndex).map((info, index) => (
          <InfoCard
            key={index}
            title={info.title}
            description={info.description}
            onClick={route}
          />
        ))}
      </Styled.GridContainer>
      {isModalOpen === true && <Modal setModalOpen={setModalOpen} />}

      <Styled.PaginationContainer>
        {Array.from({ length: totalPages }, (_, index) => (
          <Styled.PaginationButton
            key={index}
            onClick={() => handleChangePage(index + 1)}
            data-currentpage={currentPage === index + 1} // 커스텀 속성으로 변경
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </Styled.PaginationButton>
        ))}
      </Styled.PaginationContainer>
      <Footer />
    </Styled.InfoContainer>
  );
};

export default Info;
