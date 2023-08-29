// Info.js
import React, { useState } from 'react';
import * as Styled from './InfoStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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
  const totalItems = InfoData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

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
          <Styled.InfoBox key={index}>
            <Styled.Title>{info.title}</Styled.Title>
            <Styled.Description>{info.description}</Styled.Description>
          </Styled.InfoBox>
        ))}
      </Styled.GridContainer>

      <Styled.PaginationContainer>
        {Array.from({ length: totalPages }, (_, index) => (
          <Styled.PaginationButton
            key={index}
            onClick={() => handleChangePage(index + 1)}
            currentPage={currentPage === index + 1} // currentPage 값 전달
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
