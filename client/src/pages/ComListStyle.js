import styled from 'styled-components';

export const ComContainer = styled.div`
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
  height: 150px;
  text-align: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

export const ComBox = styled.div`
  width: 300px;
  height: 180px;
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

export const AddPostButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 14px;
  margin-top: 20px;
  margin-left: auto; /* 오른쪽으로 붙이기 */
  :hover {
    background-color: #0056b3;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 오른쪽과 왼쪽에 간격을 둠 */
  align-items: center; /* 수직 정렬을 위해 추가 */
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  background-color: ${(props) => (props.currentPage ? '#007bff' : '#f8f8f8')};
  color: ${(props) => (props.currentPage ? 'white' : '#333')};
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.currentPage ? 'default' : 'pointer')};
  padding: 5px 10px;
  :hover {
    background-color: ${(props) => (props.currentPage ? '#007bff' : '#f8f8f8')};
    color: ${(props) => (props.currentPage ? 'white' : '#333')};
  }
  :disabled {
    cursor: not-allowed;
  }
`;
