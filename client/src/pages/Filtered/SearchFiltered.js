/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  CommunityCategory,
  FilteredStyle,
  LicenseCategory,
  Filteredform,
  Licensere,
  Pagination,
  PageButton,
  Comresult,
} from './FilteredStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ComCard from '../../components/ComCard/Comcard';
import InfoCard from '../../components/LicenseCard/LicenseCard';
import Modal from '../../components/Modal/Modal';
import { LeftArrow, RightArrow } from '../../utils/svg';
import axios from 'axios';

const SearchFiltered = () => {
  const query = localStorage.getItem('savedKeywords');
  const token = localStorage.getItem('authorization');
  const PageSize = 3;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isIndex, setIndex] = useState();
  const [filteredLicenseData, setFilteredLicenseData] = useState([]); // 라이선스 데이터 상태
  const [filteredCommunityData, setFilteredCommunityData] = useState([]); // 커뮤니티 데이터 상태
  const [currentPageLicense, setCurrentPageLicense] = useState(1);
  // const [currentPageCommunity, setCurrentPageCommunity] = useState(1);
  const modal = (index) => {
    if (isModalOpen === false) {
      setModalOpen(true);
    }
    setIndex(index);
  };

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style = `overflow:hidden`;
    } else {
      document.body.style = `overflow:display`;
    }
  });

  useEffect(() => {
    // 라이선스 데이터를 가져오는 함수 (예: API 호출)
    const fetchLicenseData = async () => {
      try {
        const params = {
          keyword: query,
        };

        // 데이터를 가져오는 비동기 작업 수행
        const res = await axios.get(`${process.env.REACT_APP_API}search`, {
          headers: {
            Authorization: token,
            'ngrok-skip-browser-warning': '2',
          },
          params: params, // memberId를 쿼리 매개변수로 추가합니다.
        }); // 라이선스 데이터와 커뮤니티 데이터를 설정합니다.
        setFilteredLicenseData(res.data.licenses.data);
        setFilteredCommunityData(res.data.boards);
      } catch (error) {
        console.error('라이선스 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    // 라이선스 데이터 가져오기 함수 호출
    fetchLicenseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const LicensereComponent = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const PageSize = 3; // Number of items to display per page
    const totalPages = Math.ceil(data.length / PageSize);
    const startIndex = (currentPage - 1) * PageSize;
    const endIndex = startIndex + PageSize;
    const currentData = data.slice(startIndex, endIndex);
    const maxDisplayedPages = 5; // 최대 표시 페이지 수
    const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);
    let startPage, endPage;
    // const cpage = localStorage.getItem('page');

    if (totalPages <= maxDisplayedPages) {
      // 페이지가 5개 이하인 경우 모든 페이지를 표시
      startPage = 1;
      endPage = totalPages;
    } else {
      // 페이지가 5개를 초과하는 경우 현재 페이지 주변 페이지만 표시
      if (currentPage <= halfDisplayedPages) {
        startPage = 1;
        endPage = maxDisplayedPages;
      } else if (currentPage + halfDisplayedPages >= totalPages) {
        startPage = totalPages - maxDisplayedPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfDisplayedPages;
        endPage = currentPage + halfDisplayedPages;
      }
    }

    const handlePageChange = (page) => {
      setCurrentPage(page);
      localStorage.setItem('page', page);
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

    return (
      <div>
        <Licensere>
          {currentData.map((info, index) => (
            <InfoCard
              key={index}
              title={info.name}
              date={info.date}
              isIndex={(currentPage - 1) * PageSize + index === isIndex}
              onClick={() => {
                modal((currentPage - 1) * PageSize + index); // Pass the updated index to modal
              }}
            />
          ))}
        </Licensere>
        <Pagination>
          <LeftArrow onClick={handlePrevPage} />
          {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
            const page = startPage + i;
            return (
              <PageButton
                key={page}
                data-currentPage={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PageButton>
            );
          })}
          <RightArrow onClick={handleNextPage} />
        </Pagination>
      </div>
    );
  };

  LicensereComponent.propTypes = {
    data: PropTypes.array.isRequired,
  };

  const CommunityComponent = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / PageSize);
    const startIndex = (currentPage - 1) * PageSize;
    const endIndex = startIndex + PageSize;
    const currentData = data.slice(startIndex, endIndex);

    const maxDisplayedPages = 5; // 최대 표시 페이지 수
    const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);
    let startPage, endPage;
    if (totalPages <= maxDisplayedPages) {
      // 페이지가 5개 이하인 경우 모든 페이지를 표시
      startPage = 1;
      endPage = totalPages;
    } else {
      // 페이지가 5개를 초과하는 경우 현재 페이지 주변 페이지만 표시
      if (currentPage <= halfDisplayedPages) {
        startPage = 1;
        endPage = maxDisplayedPages;
      } else if (currentPage + halfDisplayedPages >= totalPages) {
        startPage = totalPages - maxDisplayedPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfDisplayedPages;
        endPage = currentPage + halfDisplayedPages;
      }
    }
    const handlePageChange = (page) => {
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

    return (
      <div>
        <Comresult>
          {currentData.map((info) => (
            <Link
              to={'/community/detail/boards/' + info.boardId}
              key={info.boardId}
            >
              <ComCard
                title={info.title}
                username={info.name}
                email={info.email}
                onClick={() => {
                  localStorage.setItem('boardId', info.boardId);
                }}
              />
            </Link>
          ))}
        </Comresult>
        <Pagination>
          <LeftArrow onClick={handlePrevPage} />
          {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
            const page = startPage + i;
            return (
              <PageButton
                key={page}
                data-currentPage={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PageButton>
            );
          })}
          <RightArrow onClick={handleNextPage} />
        </Pagination>
      </div>
    );
  };

  CommunityComponent.propTypes = {
    data: PropTypes.array.isRequired,
  };

  let noResultsMessage1 = null;
  if (filteredLicenseData.length === 0) {
    noResultsMessage1 = (
      <div className="notting">앗! 등록된 정보가 없어요😅</div>
    );
  }

  let noResultsMessage2 = null;
  if (filteredCommunityData.length === 0) {
    noResultsMessage2 = (
      <div className="notting">앗! 등록된 정보가 없어요😅</div>
    );
  }

  return (
    <FilteredStyle>
      <Header />
      <Filteredform>
        <div className="title">{`'${query}'에 관한 결과입니다.`}</div>
        <LicenseCategory>
          <div className="subtitle1">자격증 정보</div>
          {filteredLicenseData.length > 0 ? (
            <>
              <LicensereComponent
                data={filteredLicenseData}
                currentPage={currentPageLicense}
                setCurrentPage={setCurrentPageLicense}
              />
              {noResultsMessage1}
            </>
          ) : (
            noResultsMessage1
          )}
        </LicenseCategory>
        <CommunityCategory>
          <div className="subtitle2">커뮤니티 정보</div>
          {filteredCommunityData.length > 0 ? (
            <>
              <CommunityComponent data={filteredCommunityData} />
              {noResultsMessage2}
            </>
          ) : (
            noResultsMessage2
          )}
        </CommunityCategory>
      </Filteredform>
      <Footer />
      {isModalOpen === true && (
        <Modal
          date={
            filteredLicenseData[(currentPageLicense - 1) * PageSize + isIndex]
              ?.date
          }
          setModalOpen={setModalOpen}
          name={
            filteredLicenseData[(currentPageLicense - 1) * PageSize + isIndex]
              ?.name
          }
        />
      )}
    </FilteredStyle>
  );
};

export default SearchFiltered;
