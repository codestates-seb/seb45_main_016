import styled from 'styled-components';
import globalTokens from '../../styles/global.json';

// Define breakpoints for responsive design
const breakpoints = {
  medium: '992px',
  large: '1200px',
};

export const HeaderStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 5px;
  background: ${globalTokens.White.value};
  border: none;
  box-shadow: 0px 4px 5px 0px ${globalTokens.Gray[300].value};
  z-index: 1;

  @media (max-width: ${breakpoints.medium}) {
    flex-direction: column;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  padding-left: 36px;
  gap: 28px;

  @media (max-width: ${breakpoints.medium}) {
    padding-left: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
  }
`;

export const Logo = styled.div`
  align-items: center;
  border: none;
  cursor: pointer;
`;

export const Linkform = styled.div`
  display: flex;
  align-items: center;
  border: none;
  background-color: ${globalTokens.White.value};
  gap: 24px;

  button {
    border: none;
    cursor: pointer;
    background-color: ${globalTokens.White.value};
    color: ${globalTokens.Gray[800].value};
    font-size: 22px;
    width: 100%;
    height: 100%;
    font-family: ${globalTokens.SubHeadingBold.fontFamily.value};
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    &:hover {
      color: ${globalTokens.Gray[900].value};
    }

    @media (max-width: ${breakpoints.medium}) {
      align-items: center;
      font-size: 16px;
    }
  }

  @media (max-width: ${breakpoints.medium}) {
    flex-direction: column;
    width: 100%;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-grow: 1;
  align-items: center;
  padding-right: 36px;
  gap: 24px;

  @media (max-width: ${breakpoints.medium}) {
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-top: 24px;
    width: 100%;
  }
`;

export const Searchform = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 0.7;
  align-items: center;
  height: 40px;
  cursor: pointer;
  border-radius: ${globalTokens.Button.value}px;
  border: 0.5px solid ${globalTokens.Primary.Default.value};
  background: ${globalTokens.White.value};

  button {
    display: flex;
    width: 24px;
    height: 24px;
    padding: 0;
    margin-right: 24px;
    border: red;
    background: ${globalTokens.White.value};
    cursor: pointer;
  }

  @media (max-width: ${breakpoints.medium}) {
    margin-bottom: 12px;
  }
`;

export const SearchBox = styled.input`
  display: flex;
  flex-grow: 0.5;
  align-items: center;
  margin: 0 8px 0 24px;
  font-size: 16px;
  border: none;
  text-align: right;

  &:focus {
    outline: none;
  }
`;

export const Loginform = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 0;
  align-items: center;
  border: none;
  gap: 8px;

  @media (max-width: ${breakpoints.medium}) {
    position: absolute;
    padding: 0;
    top: 16px;
    right: 12px;
  }

  span {
    border: none;
    cursor: pointer;
    width: auto;
    text-decoration: none;
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 100px;
    background-color: ${globalTokens.Secondary.Default.value};
    color: ${globalTokens.White.value};
  }

  /* 버튼 스타일 */
  button {
    border: none;
    cursor: pointer;
    width: auto;
    text-decoration: none;
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 100px;
    background-color: ${globalTokens.Primary.Default.value};
    color: ${globalTokens.White.value};

    /* Hover 효과 추가 */
    &:hover {
      background-color: ${globalTokens.Primary['Darken-1'].value};
      font-weight: bold;
      /* 원하는 Hover 스타일을 여기에 추가하세요 */
    }
  }
`;
