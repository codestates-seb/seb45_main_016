<<<<<<< Updated upstream
/* eslint-disable react/prop-types */
// SearchFiltered.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

=======
// SearchFiltered.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
>>>>>>> Stashed changes
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
import ComCard from '../../components/Comcard';
<<<<<<< Updated upstream
import InfoCard from '../../components/LicenseCard/LicenseCard';
import Modal from '../../components/Modal/Modal';
import { LeftArrow, RightArrow } from '../../utils/svg';
=======
import LicenseCard from '../../components/LicenseCard/LicenseCard';
import Modal from '../../components/Modal/Modal';

const InfoData = [
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 2', description: '자격증 1에 대한 설명' },
];

const comData = [
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 1', description: '자격증 1에 대한 설명' },
  { title: '자격증 2', description: '자격증 1에 대한 설명' },
  { title: '자격증 2', description: '자격증 1에 대한 설명' },
  { title: '자격증 2', description: '자격증 1에 대한 설명' },
];
>>>>>>> Stashed changes

//테스트 시 주석해제
// import { GetSearchedlicense } from '../../utils/API';

const SearchFiltered = ({ InfoData, ComData }) => {
  const query = localStorage.getItem('savedKeywords');
  const PageSize = 3;
<<<<<<< Updated upstream
  const [isModalOpen, setModalOpen] = useState(false); // 모달 열림 상태 관리
  const [isSelectedLicenseDate, setSelectedLicenseDate] = useState(); // 선택한 자격증 정보 - 날짜
  const [isSelectedLicenseName, setSelectedLicenseName] = useState(); // 선택한 자격증 정보 - 이름
  const [isparam, setParam] = useState();

  //테스트 시 주석해제
  // const [InfoData, setInfoData] = useState();

  //테스트 시 주석해제
  // useEffect(() => {
  //   GetSearchedlicense().then((res) => setInfoData([...res.data]));
  // });

  const modal = (license) => {
    if (isModalOpen === false) {
      setModalOpen(true);
    }
    setSelectedLicenseDate(license.date);
    setSelectedLicenseName(license.name);
  };

  const openDetail = (community) => {
    setParam(community.boardId);
  };

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style = `overflow:hidden`;
    } else {
      document.body.style = `overflow:display`;
    }
  });

  const filteredLicenseData = InfoData.filter((data) =>
    data.name.includes(query),
  );

  const filteredCommunityData = ComData.filter((data) =>
=======

  const [isModalOpen, setModalOpen] = useState(false); // 모달 열림 상태 관리
  const [selectedLicense, setSelectedLicense] = useState(null); // 선택한 자격증 정보

  const openModal = (license) => {
    setSelectedLicense(license);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLicense(null);
    setModalOpen(false);
  };

  const filteredLicenseData = InfoData.filter((data) =>
    data.title.includes(query),
  );

  const filteredCommunityData = comData.filter((data) =>
>>>>>>> Stashed changes
    data.title.includes(query),
  );

  const LicensereComponent = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / PageSize);
    const startIndex = (currentPage - 1) * PageSize;
    const endIndex = startIndex + PageSize;
    const currentData = data.slice(startIndex, endIndex);

<<<<<<< Updated upstream
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
=======
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
>>>>>>> Stashed changes

    return (
      <div>
        <Licensere>
          {currentData.map((license, index) => (
<<<<<<< Updated upstream
            <InfoCard
              key={index}
              title={license.name}
              onClick={() => modal(license)} // 클릭 시 모달 열기
              date={license.date}
=======
            <LicenseCard
              key={index}
              title={license.title}
              onClick={() => openModal(license)} // 클릭 시 모달 열기
>>>>>>> Stashed changes
            />
          ))}
        </Licensere>
        <Pagination>
<<<<<<< Updated upstream
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
=======
          {Array.from({ length: totalPages }).map((_, page) => (
            <PageButton
              key={page}
              isActive={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </PageButton>
          ))}
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
>>>>>>> Stashed changes

    return (
      <div>
        <Comresult>
          {currentData.map((community, index) => (
<<<<<<< Updated upstream
            <Link to={'/community/detail/' + isparam} key={index}>
              <ComCard
                title={community.title}
                username={community.username}
                email={community.email}
                onClick={openDetail(community)}
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
=======
            <ComCard key={index} title={community.title} />
          ))}
        </Comresult>
        <Pagination>
          {Array.from({ length: totalPages }).map((_, page) => (
            <PageButton
              key={page}
              isActive={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </PageButton>
          ))}
>>>>>>> Stashed changes
        </Pagination>
      </div>
    );
  };

  CommunityComponent.propTypes = {
    data: PropTypes.array.isRequired,
  };

  let noResultsMessage1 = null;
  if (filteredLicenseData.length === 0) {
<<<<<<< Updated upstream
    noResultsMessage1 = (
      <div className="notting">앗! 등록된 정보가 없어요😅</div>
    );
=======
    noResultsMessage1 = <div className="notting">해당 내용이 없습니다.</div>;
>>>>>>> Stashed changes
  }

  let noResultsMessage2 = null;
  if (filteredCommunityData.length === 0) {
<<<<<<< Updated upstream
    noResultsMessage2 = (
      <div className="notting">앗! 등록된 정보가 없어요😅</div>
    );
=======
    noResultsMessage2 = <div className="notting">해당 내용이 없습니다.</div>;
>>>>>>> Stashed changes
  }

  return (
    <FilteredStyle>
      <Header />
      <Filteredform>
        <div className="title">{`'${query}'에 관한 결과입니다.`}</div>
        <LicenseCategory>
          <div className="subtitle1">자격증 정보</div>
<<<<<<< Updated upstream
          {filteredLicenseData.length > 0 ? (
            <>
              <LicensereComponent data={filteredLicenseData} />
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
          date={isSelectedLicenseDate}
          setModalOpen={setModalOpen}
          name={isSelectedLicenseName}
=======
          <LicensereComponent data={filteredLicenseData} />
          {noResultsMessage1}
        </LicenseCategory>
        <CommunityCategory>
          <div className="subtitle2">커뮤니티 정보</div>
          <CommunityComponent data={filteredCommunityData} />
          {noResultsMessage2}
        </CommunityCategory>
      </Filteredform>
      <Footer />
      {isModalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          isOpen={isModalOpen}
          closeModal={closeModal}
          selectedLicense={selectedLicense}
>>>>>>> Stashed changes
        />
      )}
    </FilteredStyle>
  );
};

export default SearchFiltered;
