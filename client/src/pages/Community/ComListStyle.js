import styled from 'styled-components';
import globaltoken from '../../styles/global.json';
import { Link } from 'react-router-dom';

export const ComContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AlertContainer = styled.div`
  font-size: ${globaltoken.Heading1.fontSize.value}px;
  font-weight: 800;
  color: ${globaltoken.Primary.Default.value};
  padding: 10px;
  margin: 9% auto;
  text-align: center;
`;

export const GridContainer = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(421px, 1fr));
  gap: 24px;
`;

export const SLink = styled(Link)`
  text-decoration: none;
`;

export const AddPostButton = styled.button`
  display: flex;
  align-items: flex-end;
  background-color: ${globaltoken.White.value};
  color: ${globaltoken.Gray[600].value};
  border: 1px solid ${globaltoken.Gray[600].value};
  border-radius: 100px;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 16px;
  margin: 0 10% 34px auto;
  > a {
    color: ${globaltoken.Gray[600].value};
    text-decoration: none;
  }
  &:hover {
    border: 1px solid ${globaltoken.Primary.Default.value};
    color: ${globaltoken.Primary.Default.value};
    font-weight: bold;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 오른쪽과 왼쪽에 간격을 둠 */
  align-items: center; /* 수직 정렬을 위해 추가 */
  .arrow-button {
    cursor: pointer;
    background-color: white;
    border: none;
    height: 5%;
    color: ${globaltoken.Gray[600].value};
  }
`;

export const PaginationButton = styled.button`
  font-size: 1rem;
  line-height: 100%;
  font-style: normal;
  font-weight: ${(props) => (props['data-currentpage'] ? 700 : 500)};
  background-color: transparent;
  color: ${(props) =>
    props['data-currentpage']
      ? globaltoken.Primary['Darken-2'].value
      : globaltoken.Gray[600].value};
  &:hover {
    color: ${(props) =>
      props['data-currentpage']
        ? globaltoken.Primary['Darken-2'].value
        : globaltoken.Gray[800].value};
  }
  text-decoration: ${(props) => props['data-currentpage'] && 'underline'};
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props['data-currentpage'] ? 'default' : 'pointer')};
  :disabled {
    cursor: not-allowed;
  }
  margin: 2rem;
`;
