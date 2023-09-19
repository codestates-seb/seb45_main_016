import { styled } from 'styled-components';
import globalToken from '../../styles/global.json';

const { Gray, Primary } = globalToken;

export const PostContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  textarea {
    height: 100%;
    resize: none;
    border: none;
    padding: 0.83rem 15.08rem;
    margin-top: 3rem;
    margin-bottom: 20%;

    font-size: 2.66667rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  textarea:focus {
    outline: none;
  }
  textarea::placeholder {
    color: ${Gray['300'].value};
  }
`;

export const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${Gray['300'].value};
  input {
    border: none;
    padding: 0.83rem 15.08rem;
    margin-top: 10%;
    margin-bottom: 3rem;

    font-size: 2.66667rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  input:focus {
    outline: none;
  }

  input::placeholder {
    color: ${Gray['300'].value};
  }

  button {
    margin: 10% 0 0 85%;
    width: fit-content;
    padding: 1rem;
    border-radius: 88rem;
    outline: none;
    border: 1px solid ${Gray['600'].value};
    background-color: transparent;
    color: ${Gray['600'].value};

    font-size: 1.33333rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    p {
      margin: 0;
    }
  }

  button:hover {
    border-color: ${Primary['Default'].value};
    color: ${Primary['Default'].value};
    cursor: pointer;
  }
`;
