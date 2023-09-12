import { styled } from 'styled-components';

export const PostContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  textarea {
    height: 100%;
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
    padding: 0.83rem 15.08rem;
    margin-top: 21.5rem;
  }
  input:focus {
    outline: none;
  }
  button {
    margin-left: 90%;
    margin-top: 8.67rem;
  }
  span {
    margin-left: 95%;
  }
`;
