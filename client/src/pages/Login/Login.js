/* eslint-disable no-undef */

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import * as Styled from './LoginStyle';
import { login } from '../../utils/API';
import Header from '../../components/Header/Header';
import profile1 from './profileImage/profile1.png';
import profile2 from './profileImage/profile2.png';
import profile3 from './profileImage/profile3.png';
import profile4 from './profileImage/profile4.png';
import profile5 from './profileImage/profile5.png';
import profile6 from './profileImage/profile6.png';
import profile7 from './profileImage/profile7.png';

const imageUrl = process.env.PUBLIC_URL + '/KaKaoLogo.png';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const profile = [
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
    profile7,
  ];

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      console.log(res);
      if (res?.status === 200) {
        const accessToken = res.headers.get('authorization');
        const name = jwt_decode(accessToken).name;
        const memberId = jwt_decode(accessToken).memberId;
        localStorage.setItem('authorization', accessToken);
        localStorage.setItem('memberId', memberId);
        localStorage.setItem('name', name);
        localStorage.setItem(
          'profileImg',
          profile[Math.floor(Math.random() * profile.length)],
        );
        alert('로그인이 성공했습니다.');
        navigate('/');
        location.reload();
      } else {
        const errorText =
          res?.data?.message ||
          '로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요.';
        alert(errorText);
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인 중에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const handleSocialLogin = async () => {
    window.location.href = KAKAO_AUTH_URI;
  };

  return (
    <Styled.Wrap>
      <Header />
      <Styled.LoginContainer>
        <Styled.LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Styled.LoginInput
            type="text"
            name="email"
            placeholder="Email"
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
            })}
          />
          <Styled.LoginInput
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="on"
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
            })}
          />
          <Styled.LoginButton type="submit" disabled={isSubmitting}>
            Log in
          </Styled.LoginButton>
        </Styled.LoginForm>
        <Styled.DivisionLine />
        <Styled.KakaoLogin onClick={() => handleSocialLogin()}>
          <img src={imageUrl} alt="카카오로 회원 가입" />
        </Styled.KakaoLogin>

        <Styled.LinkWrap>
          <span>계정이 없으신가요?</span>
          <Styled.styledLink to="/signup">SignUp</Styled.styledLink>
        </Styled.LinkWrap>
      </Styled.LoginContainer>
    </Styled.Wrap>
  );
}

export default Login;
