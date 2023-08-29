import React from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './LoginStyle'; // 파일 경로에 맞게 수정해주세요
import { Footer } from '../../components/Footer/Footer';

function Login() {
  return (
    <Styled.Wrap>
      <Styled.LoginContainer>
        <Styled.LoginForm>
          <Styled.LoginInput type="text" name="ID" placeholder="Id" />
          <Styled.LoginInput
            type="password"
            name="password"
            placeholder="Password"
          />
          <Styled.LoginButton type="submit">Login</Styled.LoginButton>
        </Styled.LoginForm>
        <Styled.OAuthImage src="oauth_login_image.png" alt="OAuth2 로그인" />
        <Styled.LinkWrap>
          <span>계정이 없으신가요?</span>
          <Link to="/signup">Sign Up</Link>
        </Styled.LinkWrap>
      </Styled.LoginContainer>
      <Footer />
    </Styled.Wrap>
  );
}

export default Login;
