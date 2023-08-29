import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrap = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 800;
`;

export const LoginContainer = styled.div`
  margin: 150px auto 0; /* 상단 여백을 추가하여 입력란을 아래로 이동 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 500px;
  width: 412px;
  border-radius: 2%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 네모박스에 그림자 스타일 추가 */
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 390px;
  width: 278px;
`;

export const LoginInput = styled.input`
  height: 30px;
  margin-bottom: 20px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  :focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

export const LoginButton = styled.button`
  height: 40px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background-color: #0056b3;
  }
`;

export const OAuthImage = styled.img`
  max-width: 150px;
  margin-top: 20px;
`;

export const LinkWrap = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const SignupLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  margin-left: 5px;
`;
