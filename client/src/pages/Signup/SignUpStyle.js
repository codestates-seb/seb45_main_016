import styled from 'styled-components';
import globalTokens from '../../styles/global.json';

export const Wrap = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 800;
`;

export const SignUpContainer = styled.div`
  margin: 9% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 67%;
  width: 32%;
  border-radius: 20px;
  box-shadow: 0 2px 10px ${globalTokens.LoginBoxShadow.color.value};
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  // background-color: #ffcc00;
  align-items: center;
  justify-content: center;
  height: 78%;
  width: 80%;
`;

export const SignUpInput = styled.input`
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

export const SignUpButton = styled.button`
  height: 50%;
  width: 100%;
  background-color: ${globalTokens.Primary.Default.value};
  color: ${globalTokens.White.value};
  border: none;
  border-radius: ${globalTokens.Button.value}px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  :hover {
    background-color: ${globalTokens.Primary['Darken-1'].value};
  }
`;

export const LoginWrap = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const OAuthImage = styled.img`
  max-width: 150px;
  margin-top: 20px;
`;

export const ErrorMsg = styled.p`
  color: blue;
  font-size: 10px;
  width: 100%;
  margin-top: 0px;
`;
