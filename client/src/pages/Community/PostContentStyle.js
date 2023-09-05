import { styled } from 'styled-components';

export const PostContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  textarea {
    height: 70%;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
`;

export const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid green;
  input {
    border: none;
    padding-top: 10%;
  }
  input:focus {
    outline: none;
  }
  button {
    margin-left: 90%;
  }
  span {
    margin-left: 95%;
  }
`;
