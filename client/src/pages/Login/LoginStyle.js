import styled from 'styled-components';
import { Link } from 'react-router-dom';
import globalTokens from '../../styles/global.json';

const breakpoints = {
  medium: '992px',
  large: '1200px',
};
export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginContainer = styled.div`
  margin: 10% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 30%;
  border-radius: 20px;
  box-shadow: 2px 2px 30px 0px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */
  @media (max-width: ${breakpoints.medium}) {
    margin-top: 300px;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  margin-top: 5%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
  width: 100%;
`;

export const LoginInput = styled.input`
  height: 15%;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 10%;
  margin-right: 10%;
  width: 80%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${globalTokens.Primary.Default.value}; /* 초록색으로 변경 */
  align-self: stretch;
  &:focus {
    outline: none;
  }
`;

export const LoginButton = styled.button`
  height: 15%;
  width: 80%;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: ${globalTokens.Primary.Default.value};
  color: ${globalTokens.White.value};
  border: none;
  border-radius: ${globalTokens.Button.value}px;
  cursor: pointer;
  &:hover {
    /* :hover를 사용하여 마우스를 가져다 댔을 때의 스타일을 정의합니다. */
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
    background-color: white; /* 텍스트 배경색을 페이지 배경색과 동일하게 설정 */
    padding: 0 10%;
    font-size: 12px;
    color: ${globalTokens.Gray[400].value};
    z-index: 1; /* 텍스트를 선 위에 표시하려면 z-index 값을 설정합니다 */
  }
`;

export const LinkWrap = styled.div`
  text-align: center;
  height: 10%;
  width: 80%;
  font-size: 12px;
  color: ${globalTokens.Gray[400].value};
`;

export const styledLink = styled(Link)`
  font-size: 100%;
  color: ${globalTokens.Secondary.Default.value};
  text-decoration: none;
`;

export const KakaoLogin = styled.div`
  background: none;
  border: none;
`;
