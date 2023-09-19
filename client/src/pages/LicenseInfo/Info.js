/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import * as Styled from './InfoStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import InfoCard from '../../components/LicenseCard/LicenseCard';
import Modal from '../../components/Modal/Modal';
import { LeftArrow, RightArrow } from '../../utils/svg';
import { GetAllLicensesList } from '../../utils/API';
// import NotFound from '../../components/404/404notfound';
// const itemsPerPage = 9;

const Info = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isIndex, setIndex] = useState();
  const [InfoData, setInfoData] = useState([]);
  const [totalItems, setTotalItems] = useState();
  // const [isError, setError] = useState();
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  // 중간 페이지 번호 표시에 사용할 변수
  const pagesToShow = 5; // 항상 5개의 페이지 번호를 표시
  const halfPagesToShow = Math.floor(pagesToShow / 2); // 현재 페이지 기준 양쪽에 표시할 페이지 번호 수의 절반
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await GetAllLicensesList(currentPage); // currentPage를 API 호출에 전달
        console.log('info', res.data);
        setInfoData(res.data.data);
        setTotalItems(res.data.pageInfo.totalPage);
        // if (isModalOpen === true) {
        //   document.body.style = `overflow:hidden`;
        // } else {
        //   document.body.style = `overflow:auto`;
        // }
        console.log(InfoData);
        console.log(totalItems);
        console.log('page', res.data.pageInfo.totalPage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [currentPage]);
  const modal = (index) => {
    if (isModalOpen === false) {
      setModalOpen(true);
    }
    setIndex(index);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
    localStorage.setItem('licenseListId', page);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      localStorage.setItem('licenseListId', currentPage - 1); // 이전 페이지 값으로 업데이트
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalItems) {
      setCurrentPage((prevPage) => prevPage + 1);
      localStorage.setItem('licenseListId', currentPage + 1); // 다음 페이지 값으로 업데이트
    }
  };

  // 중간 페이지 번호 목록 생성
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

  return (
    <Styled.InfoContainer>
      <Header />
      <>
        {isModalOpen === true && (
          <Modal
            date={InfoData[isIndex].date}
            setModalOpen={setModalOpen}
            name={InfoData[isIndex].name}
            code={InfoData[isIndex].code}
          />
        )}
        <Styled.AlertContainer>
          자격증 정보, 한눈에 확인해보세요
        </Styled.AlertContainer>

        <Styled.GridContainer>
          {InfoData.map((info, index) => (
            <InfoCard
              key={index}
              title={info.name}
              date={info.date}
              isIndex={isIndex}
              onClick={() => {
                modal(index);
              }}
            />
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
      </>
      <Footer />
    </Styled.InfoContainer>
  );
};

export default Info;
