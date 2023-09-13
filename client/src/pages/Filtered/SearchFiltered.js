// SearchFiltered.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const SearchFiltered = () => {
  const query = localStorage.getItem('savedKeywords');
  const PageSize = 3;

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
    data.title.includes(query),
  );

  const LicensereComponent = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / PageSize);
    const startIndex = (currentPage - 1) * PageSize;
    const endIndex = startIndex + PageSize;
    const currentData = data.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
      <div>
        <Licensere>
          {currentData.map((license, index) => (
            <LicenseCard
              key={index}
              title={license.title}
              onClick={() => openModal(license)} // 클릭 시 모달 열기
            />
          ))}
        </Licensere>
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

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
      <div>
        <Comresult>
          {currentData.map((community, index) => (
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
        </Pagination>
      </div>
    );
  };

  CommunityComponent.propTypes = {
    data: PropTypes.array.isRequired,
  };

  let noResultsMessage1 = null;
  if (filteredLicenseData.length === 0) {
    noResultsMessage1 = <div className="notting">해당 내용이 없습니다.</div>;
  }

  let noResultsMessage2 = null;
  if (filteredCommunityData.length === 0) {
    noResultsMessage2 = <div className="notting">해당 내용이 없습니다.</div>;
  }

  return (
    <FilteredStyle>
      <Header />
      <Filteredform>
        <div className="title">{`'${query}'에 관한 결과입니다.`}</div>
        <LicenseCategory>
          <div className="subtitle1">자격증 정보</div>
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
        />
      )}
    </FilteredStyle>
  );
};

export default SearchFiltered;
