import React, { useState, useEffect } from 'react';
import * as Styled from './ComListStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import ComCard from '../../components/Comcard';

const ITEMS_PER_PAGE = 6; // 한 페이지에 보여줄 아이템 수

const ComList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [comData, setComData] = useState([]);
  const [param, setParam] = useState();
  const totalItems = comData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const navigator = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const openDetail = () => {
    navigator(`/community/detail${param}`);
  };

  const route = () => {
    if (userId) {
      navigator('/write');
    } else {
      navigator('/login');
      alert('로그인이 필요합니다');
    }
  };

  useEffect(() => {
    fetch('../data.json')
      .then((res) => res.json())
      .then((res) => {
        res.data;
        setComData(res.data);
        setParam(res.data.headers.location);
      });
  });

  return (
    <Styled.ComContainer>
      <Header />
      <Styled.AlertContainer>COMMUNITY</Styled.AlertContainer>
      <Styled.AddPostButton onClick={route}>글 작성하기</Styled.AddPostButton>


      <Styled.GridContainer>
        {comData.slice(startIndex, endIndex).map((info, index) => (
          <ComCard
            key={index}
            username={info.username}
            email={info.email}
            tag={info.tag}
            title={info.title}
            onClick={openDetail}
          />
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

export default ComList;
