/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import * as Styled from './ComListStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ComCard from '../../components/Comcard';
import { Link, useNavigate } from 'react-router-dom';
import { LeftArrow, RightArrow } from '../../utils/svg';

const ITEMS_PER_PAGE = 6; // 한 페이지에 보여줄 아이템 수

const ComListMock = ({ ComData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [comData, setComData] = useState([]);

  const totalItems = ComData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  // 중간 페이지 번호 표시에 사용할 변수
  const pagesToShow = 5; // 항상 5개의 페이지 번호를 표시
  const halfPagesToShow = Math.floor(pagesToShow / 2); // 현재 페이지 기준 양쪽에 표시할 페이지 번호 수의 절반

  const userId = localStorage.getItem('userId');

  const navigator = useNavigate();

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const middlePages = [];
  for (
    let i = currentPage - halfPagesToShow;
    i <= currentPage + halfPagesToShow;
    i++
  ) {
    if (i > 0 && i <= totalPages) {
      middlePages.push(i);
    }
  }

  // 중간 페이지 번호 목록이 부족할 경우 페이지 번호를 앞쪽에 추가
  while (middlePages.length < pagesToShow && middlePages[0] > 1) {
    middlePages.unshift(middlePages[0] - 1);
  }

  // 중간 페이지 번호 목록이 부족할 경우 페이지 번호를 뒤쪽에 추가
  while (
    middlePages.length < pagesToShow &&
    middlePages[middlePages.length - 1] < totalPages
  ) {
    middlePages.push(middlePages[middlePages.length - 1] + 1);
  }

  useEffect(() => {
    setComData(ComData);
  }, []);

  const route = () => {
    if (userId) {
      navigator('/write');
    } else {
      navigator('/login');
      alert('로그인이 필요합니다');
    }
  };

  return (
    <Styled.ComContainer>
      <Header />
      <Styled.AlertContainer>COMMUNITY</Styled.AlertContainer>
      <Styled.AddPostButton onClick={route}>글 작성하기</Styled.AddPostButton>

      <Styled.GridContainer>
        {comData &&
          comData.slice(startIndex, endIndex).map((info, index) => (
            <Link to={`/community/detail/${index}`} key={info.boardId}>
              <ComCard
                title={info.title}
                username={info.username}
                email={info.email}
                onClick={() => {
                  {
                    localStorage.setItem('mockid', index);
                  }
                }}
              />
            </Link>
          ))}
      </Styled.GridContainer>

      <Styled.PaginationContainer>
        <LeftArrow onClick={handlePrevPage} />
        {middlePages.map((page) => (
          <Styled.PaginationButton
            key={page}
            onClick={() => handleChangePage(page)}
            data-currentpage={currentPage === page}
            disabled={currentPage === page}
          >
            {page}
          </Styled.PaginationButton>
        ))}
        <RightArrow onClick={handleNextPage} />
      </Styled.PaginationContainer>
      <Footer />
    </Styled.ComContainer>
  );
};

export default ComListMock;
