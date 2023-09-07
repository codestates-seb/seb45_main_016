import styled from 'styled-components';
import globalTokens from '../../styles/global.json';

// Define breakpoints for responsive design
const breakpoints = {
  small: '768px',
  medium: '992px',
  large: '1200px',
};

export const HeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 5%;
  background: ${globalTokens.White.value};
  border: none;
  box-shadow: 0px 4px 5px 0px ${globalTokens.Gray[300].value};

  @media (max-width: ${breakpoints.small}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Headerform = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.7%;
  margin-bottom: 0.7%;
  margin-left: 2.5%;
  justify-content: space-between;
  width: 95%;
  height: 70%;
  border: none;

  @media (max-width: ${breakpoints.medium}) {
    flex-direction: column;
    align-items: center;
    margin-left: 0;
  }
`;

export const Linkform = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  border: none;
  background-color: ${globalTokens.White.value};
  button {
    border: none;
    cursor: pointer;
    background-color: ${globalTokens.White.value};
    color: ${globalTokens.Gray[800].value};
    font-size: 22px;
    width: auto;
    height: 100%;
    margin-right: 10px;
    font-family: ${globalTokens.SubHeadingBold.fontFamily.value};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  @media (max-width: ${breakpoints.medium}) {
    width: 100%;
    justify-content: center;
    button {
      margin-right: 0;
    }
  }
`;

export const Logo = styled.div`
  flex-grow: 0;
  margin-top: 0.7%;
  margin-right: 5%;
  width: 20%;
  border: none;
  cursor: pointer;

  @media (max-width: ${breakpoints.small}) {
    width: 40%;
    margin-right: 0;
  }
`;

export const SearchBox = styled.input`
  display: flex;
  margin-left: 5%;
  margin-right: 5%;
  width: 80%;
  height: 50%;
  justify-content: flex-end;
  font-size: 16px;
  border: none;

  @media (max-width: ${breakpoints.small}) {
    width: 100%;
    margin: 5px 0;
  }
`;

export const Searchform = styled.div`
  display: flex;
  margin-top: 0.5%;
  width: 25%;
  padding: 1%;
  height: 100%;
  border: none;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  border-radius: ${globalTokens.Button.value}px;
  border: 0.5px solid ${globalTokens.Primary.Default.value};
  background: ${globalTokens.White.value};
  button {
    display: flex;
    margin-right: 10%;
    border-radius: ${globalTokens.Button.value}px;
    width: 5%;
    height: 55%;
    border: none;
    background: ${globalTokens.White.value};
    cursor: pointer;
    color: ${globalTokens.Gray[800].value};
  }

  @media (max-width: ${breakpoints.medium}) {
    width: 50%;
    justify-content: center;
  }

  @media (max-width: ${breakpoints.small}) {
    width: 100%;
    margin-top: 10px;
  }
`;

export const Loginform = styled.div`
  display: flex;
  width: 15%;
  margin-top: 0.8%;
  height: 100%;
  border: none;

  /* 버튼 스타일 */
  button {
    border: none;
    cursor: pointer;
    background-color: ${globalTokens.White.value};
    color: ${globalTokens.Gray[800].value};
    width: auto;
    text-decoration: none;
    font-size: 16px;
    height: 100%;
    padding: 0.67rem 1rem;
    margin-right: 0.67rem;
    border-radius: 83.33333rem;
    background: ${globalTokens.Primary.Default.value};
    color: ${globalTokens.White.value};
    font-family: Pretendard Variable;
    font-size: 1.33333rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    /* Hover 효과 추가 */
    &:hover {
      background-color: ${globalTokens.Primary['Darken-1'].value};
      /* 원하는 Hover 스타일을 여기에 추가하세요 */
    }
  }

  img {
    width: 25%;
    height: 50%;
    margin-right: 10%;
  }

  @media (max-width: ${breakpoints.small}) {
    width: 30%;

    /* 작은 화면용 버튼 스타일 */
    button {
      font-size: 14px;
      padding: 0.5rem 0.8rem;
      margin-right: 0.2rem;

      /* 작은 화면용 버튼 Hover 효과 추가 */
      &:hover {
        background-color: ${globalTokens.Primary['Darken-1'].value};
        /* 작은 화면용 Hover 스타일을 여기에 추가하세요 */
      }
    }

    img {
      width: 20%;
    }
  }
`;
