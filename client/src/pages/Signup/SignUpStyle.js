import styled from 'styled-components';
import globalTokens from '../../styles/global.json';
import { Link } from 'react-router-dom';

const breakpoints = {
  medium: '992px',
  large: '1200px',
};

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */
`;

export const SignUpContainer = styled.div`
  margin: 10% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 30%;
  // background-color: blue;
  border-radius: 20px;
  box-shadow: 2px 2px 30px 0px rgba(0, 0, 0, 0.1);
  @media (max-width: ${breakpoints.medium}) {
    margin-top: 300px;
  }
`;

export const SignUpForm = styled.form`
  display: flex;
  margin-top: 10%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
  width: 100%;
`;

export const SignUpInput = styled.input`
  height: 10%;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 10%;
  margin-right: 10%;
  width: 80%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${globalTokens.Primary.Default.value}; /* 초록색으로 변경 */
  align-self: stretch;
  transition: border-color 0.1s ease;
  &.input-error {
    border-bottom: 1px solid ${globalTokens.Negative.value};
  }
  &:focus {
    outline: none;
  }
`;

export const SignUpButton = styled.button`
  height: 7%;
  width: 80%;
  font-size: 16px;
  background-color: ${globalTokens.Primary.Default.value};
  color: ${globalTokens.White.value};
  border: none;
  border-radius: ${globalTokens.Button.value}px;
  cursor: pointer;
  &:hover {
    background-color: ${globalTokens.Primary['Darken-1'].value};
  }
`;

export const DivisionLine = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  width: 80%;
  height: 1px;
  background-color: ${globalTokens.Gray[400].value};
  margin: 20px 0;

  &::before {
    content: '또는';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 0 10%;
    font-size: 12px;
    color: ${globalTokens.Gray[400].value};
    z-index: 1;
  }
`;

export const LoginWrap = styled.div`
  text-align: center;
  height: 10%;
  width: 80%;
  font-size: 12px;
  color: ${globalTokens.Gray[400].value};
`;

export const styledLink = styled(Link)`
  font-size: 100%;
  color: ${globalTokens.Secondary.Default.value};
  text-decoration: none; /* 올바른 속성 이름을 사용하세요 (예: 'text-decoration') */
`;

export const KakaoLogin = styled.div`
  background: none;
  border: none;
`;
