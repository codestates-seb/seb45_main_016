import React, { useState } from 'react';
import * as Styled from './ComListStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';

const ComData = [
  { title: '제목 1', description: '글 내용 1' },
  { title: '제목 2', description: '글 내용 2' },
  { title: '제목 3', description: '글 내용 3' },
  { title: '제목 4', description: '글 내용 4' },
  { title: '제목 5', description: '글 내용 5' },
  { title: '제목 6', description: '글 내용 6' },
  { title: '제목 7', description: '글 내용 7' },
  { title: '제목 8', description: '글 내용 8' },
  { title: '제목 9', description: '글 내용 9' },
  { title: '제목 10', description: '글 내용 10' },
  { title: '제목 11', description: '글 내용 11' },
  { title: '제목 12', description: '글 내용 12' },
  { title: '제목 13', description: '글 내용 13' },
  // ... 다른 자격증 데이터들
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
      <Styled.AlertContainer>
        시험 꿀팁, 후기 함께 나눠요!
      </Styled.AlertContainer>
      <Styled.AddPostButton>
        <Link to="/write">글 작성하기</Link>
      </Styled.AddPostButton>
      <Styled.GridContainer>
        {ComData.slice(startIndex, endIndex).map((info, index) => (
          <Styled.ComBox key={index} onClick={openDetail}>
            <Styled.Title>{info.title}</Styled.Title>
            <Styled.Description>{info.description}</Styled.Description>
          </Styled.ComBox>
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
