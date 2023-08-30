import React from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './SignUpStyle'; // 파일 경로에 맞게 수정해주세요

function SignUp() {
  return (
    <Styled.Wrap>
      <Styled.SignUpContainer>
        <Styled.SignUpForm>
          <Styled.SignUpInput type="text" name="ID" placeholder="Id" />
          <Styled.SignUpInput
            type="password"
            name="password"
            placeholder="Password"
          />
          <Styled.SignUpInput type="email" name="email" placeholder="Email" />
          <Styled.SignUpInput
            type="tel"
            name="phone"
            placeholder="Phone Number"
          />
          <Styled.SignUpButton type="submit">Sign Up</Styled.SignUpButton>
        </Styled.SignUpForm>
        <Styled.OAuthImage src="oauth_signup_image.png" alt="OAuth2 로그인" />
        <Styled.LoginWrap>
          <span>이미 아이디가 있으신가요?</span>
          <Link to="/login">Login</Link>
        </Styled.LoginWrap>
      </Styled.SignUpContainer>
    </Styled.Wrap>
  );
}

export default SignUp;
