// InfoStyle.js
import styled from 'styled-components';
import globalToken from '../../styles/global.json';

const { Primary } = globalToken;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AlertContainer = styled.div`
  font-size: 36px;
  font-weight: 800;
  line-height: normal;
  color: ${Primary['Default'].value};
  margin: 9% auto;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 90%;
  margin: 0.5% 0 21% 0;
  gap: 6.5% 1.5%;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  background-color: ${(props) =>
    props['data-currentpage'] ? '#007bff' : '#f8f8f8'};
  color: ${(props) => (props['data-currentpage'] ? 'white' : '#333')};
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props['data-currentpage'] ? 'default' : 'pointer')};
  padding: 5px 10px;
  :hover {
    background-color: ${(props) =>
      props['data-currentpage'] ? '#007bff' : '#f8f8f8'};
    color: ${(props) => (props['data-currentpage'] ? 'white' : '#333')};
  }
  :disabled {
    cursor: not-allowed;
  }
`;
