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

const ITEMS_PER_PAGE = 6; // 한 페이지에 보여줄 아이템 수

const ComListMock = ({ ComData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [comData, setComData] = useState([]);

  const totalItems = ComData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const userId = localStorage.getItem('userId');

  const navigator = useNavigate();

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setComData([...ComData]);
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
          comData.slice(startIndex, endIndex).map((info) => (
            <Link to={'/community/detail/' + info.boardId} key={info.boardId}>
              <ComCard
                title={info.title}
                username={info.username}
                email={info.email}
                onClick={() => {
                  localStorage.setItem('boardId', info.boardId);
                }}
              />
            </Link>
          ))}
      </Styled.GridContainer>

      <Styled.PaginationContainer>
        {Array.from({ length: totalPages }, (index) => (
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
    </Styled.ComContainer>
  );
};

export default ComListMock;
