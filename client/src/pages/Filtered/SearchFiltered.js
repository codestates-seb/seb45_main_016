import React, { useState, useEffect } from 'react';
import {
  CommunityCategory,
  FilteredStyle,
  LicenseCategory,
  Paging,
} from './FilteredStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const SearchFiltered = () => {
  const query = localStorage.getItem('savedKeywords');
  const pageSize = 5; // 페이지당 정보 개수
  const [currentPage, setCurrentPage] = useState(1);
  const [licenseData, setLicenseData] = useState([]); // 자격증 정보 데이터 배열
  const [communityData, setCommunityData] = useState([]); // 커뮤니티 정보 데이터 배열

  useEffect(() => {
    // 가상의 자격증 정보 데이터 API로 가정
    fetch('https://api.example.com/licenses')
      .then((response) => response.json())
      .then((data) => {
        // 검색어를 포함하는 자격증 정보만 필터링
        const filteredData = data.filter((license) =>
          license.title.includes(query),
        );

        // 페이지에 맞게 데이터 슬라이스
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const slicedData = filteredData.slice(startIndex, endIndex);

        setLicenseData(slicedData);
      })
      .catch((error) => {
        console.error('Error fetching license data:', error);
      });

    // 가상의 커뮤니티 정보 데이터 API로 가정
    fetch('https://api.example.com/community')
      .then((response) => response.json())
      .then((data) => {
        // 검색어를 포함하는 커뮤니티 정보만 필터링
        const filteredData = data.filter((community) =>
          community.title.includes(query),
        );

        // 페이지에 맞게 데이터 슬라이스
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const slicedData = filteredData.slice(startIndex, endIndex);

        setCommunityData(slicedData);
      })
      .catch((error) => {
        console.error('Error fetching community data:', error);
      });
  }, [currentPage, query]);

  const pagingNum = Array.from(
    { length: Math.ceil(licenseData.length / pageSize) },
    (_, index) => index + 1,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <FilteredStyle>
      <Header />
      <div className="title">{`'${query}'에 관한 결과입니다.`}</div>
      <LicenseCategory>
        <p>자격증 정보</p>
        {licenseData.map((license) => (
          <div key={license.id}>{license.title}</div>
        ))}
      </LicenseCategory>
      <CommunityCategory>
        <p>커뮤니티 정보</p>
        {communityData.map((community) => (
          <div key={community.id}>{community.title}</div>
        ))}
      </CommunityCategory>
      <Paging>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {`<`}
        </button>
        {pagingNum.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagingNum.length}
        >
          {`>`}
        </button>
      </Paging>
      <Footer />
    </FilteredStyle>
  );
};

export default SearchFiltered;
