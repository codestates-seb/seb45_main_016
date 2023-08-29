// InfoStyle.js
import styled from 'styled-components';

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const AlertContainer = styled.div`
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 80%;
  height: 500px;
  text-align: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const InfoBox = styled.div`
  width: 250px; /* 너비를 더 넓게 조정 */
  height: 150px; /* 높이를 더 높게 조정 */
  padding: 10px;
  border: 1px solid #ccc;
`;

export const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const Description = styled.p`
  font-size: 14px;
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
