import { styled } from 'styled-components';
import globalToken from '../../styles/global.json';

const breakpoints = {
  medium: '992px',
  large: '1200px',
};

export const FilteredStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center; /* 중앙 정렬 추가 */
  .title {
    text-align: center;
    margin-top: 20px; /* 제목 상단 여백 추가 */
    font-size: 24px; /* 제목 글꼴 크기 조정 */
    color: #333; /* 제목 글꼴 색상 변경 */
  }
`;

export const Filteredform = styled.div`
  margin-top: 10%;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 추가 */
  @media (max-width: ${breakpoints.medium}) {
    margin-top: 300px;
  }
  .title {
    color: ${globalToken.Primary.Default.value};
    text-align: center;
    font-size: 36px;
    font-weight: 800;

    margin-bottom: 10%;
  }
`;

export const LicenseCategory = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  /* margin-left: 5%; */
  .subtitle1 {
    color: ${globalToken.Primary.Default.value};
    font-size: 32px;
    font-weight: 700;

    margin-bottom: 5%;
  }
  .div {
    background-color: white;
    font-size: 10px;
  }

  .notting {
    display: flex;
    font-size: 22px;
    margin: 128px 0 128px 0;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: ${globalToken.Primary.Default.value};
  }
`;

export const Licensere = styled.div`
  display: grid; /* grid로 변경 */
  grid-template-columns: repeat(
    3,
    minmax(400px, 1fr)
  ); /* 3개의 카드가 한 행에 나오도록 수정 */
  width: 90%;
  gap: 24px;

  @media (max-width: ${breakpoints.medium}) {
    margin-top: 24px;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 35px;
  }
`;

export const CommunityCategory = styled.div`
  flex-grow: 1;
  width: 90%;
  /* margin-left: 5%; */
  margin-top: 5%;
  .subtitle2 {
    color: ${globalToken.Primary.Default.value};
    font-size: 32px;
    font-weight: 700;

    margin-bottom: 5%;
  }
  .div {
    background-color: white;
    font-size: 10px;
  }

  .notting {
    display: flex;
    font-size: 22px;
    margin: 128px 0 200px 0;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: ${globalToken.Primary.Default.value};
  }
`;

export const Comresult = styled.div`
  display: grid; /* grid로 변경 */
  grid-template-columns: repeat(
    3,
    minmax(421px, 1fr)
  ); /* 3개의 카드가 한 행에 나오도록 수정 */
  gap: 24px;
  width: 90%;

  @media (max-width: ${breakpoints.medium}) {
    margin-top: 24px;
    grid-template-columns: repeat(auto-fill, minmax(421px, 1fr));
  }
`;

export const Paging = styled.div`
  text-align: center;
  background-color: black; /* 오타 수정: backgroun-color */
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-top: 52px;

  .arrow-button {
    cursor: pointer;
    background-color: white;
    border: none;
    height: 5%;
    color: ${globalToken.Gray[600].value};
  }
`;

export const PageButton = styled.button`
  font-size: 1rem;
  line-height: 100%;
  font-style: normal;
  font-weight: ${(props) => (props['data-currentPage'] ? 700 : 500)};
  color: ${(props) =>
    props['data-currentPage']
      ? globalToken.Primary['Darken-2'].value
      : globalToken.Gray[600].value};
  &:hover {
    color: ${(props) =>
      props['data-currentPage']
        ? globalToken.Primary['Darken-2'].value
        : globalToken.Gray[800].value};
  }
  text-decoration: ${(props) => props['data-currentPage'] && 'underline'};
  border: none;
  background-color: transparent;
  cursor: ${(props) => (props['data-currentPage'] ? 'default' : 'pointer')};

  :disabled {
    cursor: not-allowed;
  }
  margin: 0 2rem 11rem;
`;
