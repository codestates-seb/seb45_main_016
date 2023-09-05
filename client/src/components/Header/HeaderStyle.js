import { styled } from 'styled-components';

export const HeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid black;
  width: 100%;

  input:focus {
    outline: none;
  }
  button {
    padding: 20px 50px;
    border: none;
    margin-right: 10px;
    background-color: orange;
    cursor: pointer;
  }
`;

export const Logo = styled.div`
  flex-grow: 0;
  width: 100px;
  border: 1px solid black;
  margin: 0 10px;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  .search-icon {
    position: absolute;
    left: 20px;
  }
`;

export const SearchBox = styled.input`
  flex-grow: 1;
  border: 1px solid black;
  border-radius: 6px;
`;
