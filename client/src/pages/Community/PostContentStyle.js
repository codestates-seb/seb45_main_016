import { styled } from 'styled-components';

export const PostContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  p {
    border-bottom: 2px solid green;
  }
  textarea {
    height: 70%;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
  .post {
    border: none;
    background-color: pink;
    padding: 30px;
    cursor: pointer;
  }
`;

export const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid green;
  input {
    flex-grow: 1;
    border: none;
  }
  input:focus {
    outline: none;
  }
`;
