import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Styled from './ComListStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import ComCard from '../../components/Comcard';

const ITEMS_PER_PAGE = 6; // 한 페이지에 보여줄 아이템 수

const ComList = () => {
  const ComData = [
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
    { username: 'test', email: 'test', title: 'test', tag: 'test' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [comData, setComData] = useState([]);
  const [isparam, setParam] = useState();

  const totalItems = ComData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const navigator = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const openDetail = (index) => {
    setParam(comData[index].boardId);
    localStorage.setItem('param', `/board/${isparam}`);
    navigator(`/community/detail${localStorage.getItem('param')}`);
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
    axios
      .get('https://7af2-182-211-13-193.ngrok-free.app/boards', {
        headers: {
          'ngrok-skip-browser-warning': '1',
        },
      })
      .then((res) => console.log(res.data))
      .then((res) => setComData(res.data));
  });

  return (
    <Styled.ComContainer>
      <Header />
      <Styled.AlertContainer>COMMUNITY</Styled.AlertContainer>
      <Styled.AddPostButton onClick={route}>글 작성하기</Styled.AddPostButton>

      <Styled.GridContainer>
        {comData.slice(startIndex, endIndex).map((info, index) => (
          <ComCard key={index} title={info.title} onClick={openDetail(index)} />
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
