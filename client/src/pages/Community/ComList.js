import React, { useState } from 'react';
import * as Styled from './ComListStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import ComCard from '../../components/Comcard';

const ComData = [
  {
    username: 'Username1',
    email: '123@gmail.com',
    tag: '[후기]',
    title: '정보처리기사 꿀팁 공유합니다.',
  },
  {
    username: 'Username2',
    email: '456@gmail.com',
    tag: '[질문]',
    title: '정보처리기사 꿀팁 공유합니다.',
  },
  {
    username: 'Username3',
    email: '789@gmail.com',
    tag: '[후기]',
    title: '정보처리기사 꿀팁 공유합니다.',
  },
  {
    username: 'Username4',
    email: 'qwe@gmail.com',
    tag: '[질문]',
    title: '정보처리기사 꿀팁 공유합니다.',
  },
  {
    username: 'Username5',
    email: 'ert@gmail.com',
    tag: '[후기]',
    title: '정보처리기사 꿀팁 공유합니다.',
  },
  {
    username: 'Username6',
    email: 'rty@gmail.com',
    tag: '[질문]',
    title: '정보처리기사 꿀팁 공유합니다.',
  },
  {
    username: 'Username7',
    email: 'tyu@gmail.com',
    tag: '[후기]',
    title: '정보처리기사 꿀팁 공유합니다.',
  },
  {
    username: 'Username8',
    email: 'yui@gmail.com',
    tag: '[질문]',
    title: '정보처리기사 꿀팁 공유합니다.',
  },
  {
    username: 'Username9',
    email: 'uio@gmail.com',
    tag: '[후기]',
    title: '정보처리기사 꿀팁 공유합니다.',
  },
  {
    username: 'Username10',
    email: 'iop@gmail.com',
    tag: '[질문]',
    title: '정보처리기사 꿀팁 공유합니다.',
  },
  {
    username: 'Username11',
    email: 'opp@gmail.com',
    tag: '[후기]',
    title: '정보처리기사 꿀팁 공유합니다.',
  },

  // ... 다른 글 데이터들
];

const ITEMS_PER_PAGE = 6; // 한 페이지에 보여줄 아이템 수

const ComList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = ComData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const navigator = useNavigate();

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const openDetail = () => {
    navigator('/community/detail');
  };

  return (
    <Styled.ComContainer>
      <Header />
      <Styled.AlertContainer>COMMUNITY</Styled.AlertContainer>
      <Styled.AddPostButton onClick={navigator('/write')}>
        글 작성하기
      </Styled.AddPostButton>
      <Styled.GridContainer>
        {ComData.slice(startIndex, endIndex).map((info, index) => (
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
    </Styled.ComContainer>
  );
};

export default ComList;
