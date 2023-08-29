import {
  CommunityCategory,
  FilteredStyle,
  LicenseCategory,
  Paging,
} from './FilteredStyle';
import Header from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

const SearchFiltered = () => {
  const pagingNum = [1, 2, 3, 4, 5, 6, 7];

  return (
    <FilteredStyle>
      <Header />
      <div className="title">{`'정보 처리 기사'`}에 대한 검색 결과 입니다.</div>
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
          return <button key={pagingNum}>{el}</button>;
        })}
        <span>{`>`}</span>
      </Paging>
      <Footer />
    </FilteredStyle>
  );
};

export default SearchFiltered;
