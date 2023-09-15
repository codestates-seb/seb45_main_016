<<<<<<< Updated upstream
/* eslint-disable no-undef */

=======
>>>>>>> Stashed changes
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import * as Styled from './LoginStyle';
import { login } from '../../utils/API';
import Header from '../../components/Header/Header';

const imageUrl = process.env.PUBLIC_URL + '/KaKaoLogo.png';
const KAKAO_CLIENT_ID = 'b05b33f9ad8c9790f4281e18ebd1e7fc';
const KAKAO_REDIRECT_URI = 'http://localhost:3000/login/oauth/code/kakao';
const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      console.log(res);
      if (res?.status === 200) {
        const accessToken = res.headers.get('authorization');
        const userId = jwt_decode(accessToken).userId;
        const email = jwt_decode(accessToken).sub;
        localStorage.setItem('Id', email);
        localStorage.setItem('userId', userId);
        localStorage.setItem('Token', accessToken);
        alert('로그인이 성공했습니다.');
        navigate('/');
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
