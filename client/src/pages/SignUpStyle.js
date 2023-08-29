import styled from 'styled-components';

export const Wrap = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 800;
`;

export const SignUpContainer = styled.div`
  margin: 150px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 500px;
  width: 412px;
  border-radius: 2%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 390px;
  width: 278px;
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

export const LoginWrap = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const OAuthImage = styled.img`
  max-width: 150px;
  margin-top: 20px;
`;
