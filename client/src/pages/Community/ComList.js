/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import * as Styled from './ComListStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ComCard from '../../components/ComCard/Comcard';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LeftArrow } from '../../utils/svg';
import { RightArrow } from '../../utils/svg';
import { GetAllCommunityPostsList } from '../../utils/API';

const ComList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [comData, setComData] = useState([]);
  const [totalItems, setTotalItems] = useState();

  const authorization = localStorage.getItem('authorization');
  const navigator = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await GetAllCommunityPostsList(currentPage); // currentPage를 API 호출에 전달
        setComData(res.data);
        setTotalItems(res.pageInfo.totalPage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    localStorage.setItem('comId', page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      localStorage.setItem('comId', currentPage - 1); // 이전 페이지 값으로 업데이트
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalItems) {
      setCurrentPage((prevPage) => prevPage + 1);
      localStorage.setItem('comId', currentPage + 1); // 다음 페이지 값으로 업데이트
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
    if (i > 0 && i <= totalItems) {
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
    middlePages[middlePages.length - 1] < totalItems
  ) {
    middlePages.push(middlePages[middlePages.length - 1] + 1);
  }

  const route = () => {
    if (authorization) {
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
              to={'/community/detail/boards/' + info.boardId}
              key={info.boardId}
            >
              <ComCard
                title={info.title}
                username={info.boardCreator.name}
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
            {page}
          </Styled.PaginationButton>
        ))}
        <RightArrow onClick={handleNextPage} />
      </Styled.PaginationContainer>
      <Footer />
    </Styled.ComContainer>
  );
};

export default ComList;
