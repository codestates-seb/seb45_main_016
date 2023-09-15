import { styled } from 'styled-components';
<<<<<<< Updated upstream
import globalToken from '../../styles/global.json';
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    color: ${globalToken.Primary.Default.value};
    text-align: center;
    font-size: 36px;
    font-weight: 800;

=======
    color: var(--primary-default, #57a162);
    text-align: center;
    font-family: Pretendard Variable;
    font-size: 36px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
>>>>>>> Stashed changes
    margin-bottom: 10%;
  }
`;

export const LicenseCategory = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
<<<<<<< Updated upstream
  /* margin-left: 5%; */
  .subtitle1 {
    color: ${globalToken.Primary.Default.value};
    font-size: 32px;
    font-weight: 700;

=======
  margin-left: 5%;
  .subtitle1 {
    color: var(--primary-default, #57a162);
    font-family: Pretendard Variable;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
>>>>>>> Stashed changes
    margin-bottom: 5%;
  }
  .div {
    background-color: white;
    font-size: 10px;
  }
<<<<<<< Updated upstream

  .notting {
    display: flex;
    font-size: 22px;
    margin: 128px 0 128px 0;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: ${globalToken.Primary.Default.value};
  }
=======
>>>>>>> Stashed changes
`;

export const Licensere = styled.div`
  display: grid; /* grid로 변경 */
  grid-template-columns: repeat(
    3,
<<<<<<< Updated upstream
    minmax(400px, 1fr)
  ); /* 3개의 카드가 한 행에 나오도록 수정 */
  width: 90%;
  gap: 24px;

  @media (max-width: ${breakpoints.medium}) {
    margin-top: 24px;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 35px;
=======
    1fr
  ); /* 3개의 카드가 한 행에 나오도록 수정 */
  width: 100%;
  gap: 5px;
  .notting {
    background-color: blue;
    font-size: 20px;
>>>>>>> Stashed changes
  }
`;

export const CommunityCategory = styled.div`
  flex-grow: 1;
  width: 90%;
<<<<<<< Updated upstream
  /* margin-left: 5%; */
  margin-top: 5%;
  .subtitle2 {
    color: ${globalToken.Primary.Default.value};
    font-size: 32px;
    font-weight: 700;

=======
  margin-left: 5%;
  margin-top: 5%;
  .subtitle2 {
    color: var(--primary-default, #57a162);
    font-family: Pretendard Variable;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
>>>>>>> Stashed changes
    margin-bottom: 5%;
  }
  .div {
    background-color: white;
    font-size: 10px;
  }
<<<<<<< Updated upstream

  .notting {
    display: flex;
    font-size: 22px;
    margin: 128px 0 200px 0;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: ${globalToken.Primary.Default.value};
  }
=======
>>>>>>> Stashed changes
`;

export const Comresult = styled.div`
  display: grid; /* grid로 변경 */
  grid-template-columns: repeat(
    3,
<<<<<<< Updated upstream
    minmax(421px, 1fr)
  ); /* 3개의 카드가 한 행에 나오도록 수정 */
  gap: 24px;
  width: 90%;

  @media (max-width: ${breakpoints.medium}) {
    margin-top: 24px;
    grid-template-columns: repeat(auto-fill, minmax(421px, 1fr));
=======
    1fr
  ); /* 3개의 카드가 한 행에 나오도록 수정 */
  gap: 20px;
  width: 100%;
  .notting {
    background-color: blue;
    font-size: 20px;
>>>>>>> Stashed changes
  }
`;

export const Paging = styled.div`
  text-align: center;
  background-color: black; /* 오타 수정: backgroun-color */
`;

export const Pagination = styled.div`
  display: flex;
<<<<<<< Updated upstream
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
=======
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-top: 10px;
  align-items: center; /* 페이지 네이션 가운데 정렬 추가 */
  justify-content: center; /* 페이지 네이션 가운데 정렬 추가 */
`;

export const PageButton = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  background-color: ${(props) => (props.isActive ? 'blue' : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : 'black')};
  border: 1px solid blue;
  cursor: pointer;
>>>>>>> Stashed changes
`;
