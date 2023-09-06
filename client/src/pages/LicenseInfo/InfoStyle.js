// InfoStyle.js
import styled from 'styled-components';
import globalToken from '/Users/pchoo/seb45_main_016/client/src/styles/global.json';

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
  margin: 0 5px;
  background-color: ${(props) =>
    props.currentPage === true ? '#0056b3' : '#000000'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
  :hover {
    background-color: #0056b3;
  }
`;
