import React from 'react';
import {
  CommunityCategory,
  FilteredStyle,
  LicenseCategory,
  Paging,
} from './FilteredStyle';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useParams } from 'react-router-dom'; // useParams를 import

const SearchFiltered = () => {
  const pagingNum = [1, 2, 3, 4, 5, 6, 7];
  const { query } = useParams(); // URL 파라미터로부터 검색어 추출

  return (
    <FilteredStyle>
      <Header />
      <div className="title">{`'${query}'에 관한 결과입니다.`}</div>
      <LicenseCategory>
        <p>자격증 정보</p>
        <div>img</div>
      </LicenseCategory>
      <CommunityCategory>
        <p>COMMUNITY</p>
        <div>img</div>
      </CommunityCategory>
      <Paging>
        <span>{`<`}</span>
        {pagingNum.map((el) => {
          return <button key={el}>{el}</button>;
        })}
        <span>{`>`}</span>
      </Paging>
      <Footer />
    </FilteredStyle>
  );
};

export default SearchFiltered;
