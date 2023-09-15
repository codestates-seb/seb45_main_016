/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import * as Styled from './ComListStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ComCard from '../../components/Comcard';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LeftArrow } from '../../utils/svg';
import { RightArrow } from '../../utils/svg';
import { GetAllCommunityPostsList } from '../../utils/API';

const ITEMS_PER_PAGE = 6; // 한 페이지에 보여줄 아이템 수

const ComList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [comData, setComData] = useState([]);

  const totalItems = comData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const userId = localStorage.getItem('userId');
  const navigator = useNavigate();

  useEffect(() => {
    GetAllCommunityPostsList().then((res) => setComData(res.data));
  }, []);
  console.log(comData);

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

  // 중간 페이지 번호 표시에 사용할 변수
  const pagesToShow = 5; // 항상 5개의 페이지 번호를 표시
  const halfPagesToShow = Math.floor(pagesToShow / 2);

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
          comData.map((info) => (
            <Link
              to={'/community/detail/boards/' + info.boardCreator}
              key={info.boardId}
            >
              <ComCard
                title={info.title}
                username={info.boardCreator}
                email={info.email}
                onClick={() => {
                  localStorage.setItem('boardId', info.boardId);
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
            {currentPage}
          </Styled.PaginationButton>
        ))}
        <RightArrow onClick={handleNextPage} />
      </Styled.PaginationContainer>
      <Footer />
    </Styled.ComContainer>
  );
};

export default ComList;
