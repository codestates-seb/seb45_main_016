import { styled } from 'styled-components';

export const HeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid black;
  input {
    flex-grow: 1;
    margin: 0;
  }
  input:focus {
    outline: none;
  }
  button {
    flex-grow: 0;
    padding: 20px 50px;
    border: none;
    margin-right: 10px;
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
