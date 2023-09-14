import React, { useEffect, useState, useCallback } from 'react';
import * as Styled from './InfoStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import InfoCard from '../../components/LicenseCard/LicenseCard';
import Modal from '../../components/Modal/Modal';
import { LeftArrow, RightArrow } from '../../utils/svg';
import { InfoData } from './infoDummydata';
// import axios from 'axios';
// import NotFound from '../../components/404/404notfound';

const Info = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());
  const [isIndex, setIndex] = useState();
  // const [InfoData, setInfoData] = useState([]);
  // const [isError, setError] = useState();

  const totalItems = InfoData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // 중간 페이지 번호 표시에 사용할 변수
  const pagesToShow = 5; // 항상 5개의 페이지 번호를 표시
  const halfPagesToShow = Math.floor(pagesToShow / 2); // 현재 페이지 기준 양쪽에 표시할 페이지 번호 수의 절반

  const modal = (index) => {
    if (isModalOpen === false) {
      setModalOpen(true);
    }
    setIndex(index);
  };

  const handleResize = useCallback(() => {
    setItemsPerPage(calculateItemsPerPage());
  }, []);

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style = `overflow:hidden`;
    } else {
      document.body.style = `overflow:display`;
    }
  });

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // api요청- 상단의 코딩된 주석 4개 해체 후 함께 사용
  // useEffect(() => {
  //   axios
  //     .get('https://65a9-182-211-13-193.ngrok-free.app/boards', {
  //       headers: {
  //         'ngrok-skip-browser-warning': '1',
  //       },
  //     })
  //     .then((res) => console.log(res.data))
  //     .then((res) => setInfoData(res.data))
  //     .catch((e) => {
  //       console.log(e);
  //       if (e.status === 404) {
  //         setError(true);
  //       } else if (e.code === 'ERROR_NETWORK') {
  //         setError(true);
  //       }
  //     });
  // }, []);

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

  // 중간 페이지 번호 목록 생성
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

  function calculateItemsPerPage() {
    // 화면 크기에 따라 아이템 수를 동적으로 계산
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1400) {
      return 9; // 대형 화면
    } else if (screenWidth >= 992) {
      return 6; // 중형 화면
    } else if (screenWidth >= 768) {
      return 4; // 소형 화면
    } else {
      return 3; // 아주 작은 화면
    }
  }

  return (
    <Styled.InfoContainer>
      <Header />
      {/* {!isError ? ( */}
      <>
        <Styled.AlertContainer>
          자격증 정보, 한눈에 확인해보세요
        </Styled.AlertContainer>

        <Styled.GridContainer>
          {InfoData.slice(startIndex, endIndex).map((info, index) => (
            <InfoCard
              key={index}
              title={info.name}
              description={info.description}
              date={info.date}
              isIndex={isIndex}
              onClick={() => {
                modal(index);
              }}
            />
          ))}
        </Styled.GridContainer>

        {isModalOpen === true && (
          <Modal
            date={InfoData[isIndex].date}
            setModalOpen={setModalOpen}
            name={InfoData[isIndex].name}
          />
        )}

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
      {/* ) : (
        <NotFound />
      )} */}

      <Footer />
    </Styled.InfoContainer>
  );
};

export default Info;
