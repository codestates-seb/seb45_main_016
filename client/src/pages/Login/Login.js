import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import React from 'react';
import * as Styled from './LoginStyle';
import Header from '../../components/Header/Header';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await data;
    if (res?.status === 200) {
      const accessToken = res.headers['authorization']; // 수정된 부분
      const userId = jwt_decode(accessToken).userId;
      const email = jwt_decode(accessToken).sub; // 이메일 값을 추출합니다
      localStorage.setItem('Id', email); // 이메일 값을 사용하여 저장합니다
      localStorage.setItem('userId', userId);
      localStorage.setItem('Token', accessToken);

      navigate('/');
    } else {
      const errorText =
        res?.data?.message ||
        '로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요.';
      alert(errorText);
    }
  };

  return (
    <Styled.Wrap>
      <Header />
      <Styled.LoginContainer>
        <Styled.LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Styled.LoginInput
            type="text"
            name="Email"
            placeholder="Email"
            aria-invalid={
              !isDirty ? undefined : errors.email ? 'true' : 'false'
            }
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value:
                  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
                message: '이메일 형식에 맞지 않습니다.',
              },
            })}
          />
          {errors.email && (
            <Styled.ErrorMsg role="alert">
              {errors.email.message}
            </Styled.ErrorMsg>
          )}
          <Styled.LoginInput
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="on"
            aria-invalid={
              !isDirty ? undefined : errors.password ? 'true' : 'false'
            }
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{8,}$/,
                message:
                  '비밀번호는 8자리 이상 숫자, 문자, 특수문자 조합으로 입력해야 합니다.',
              },
            })}
          />
          {errors.password && (
            <Styled.ErrorMsg role="alert">
              {errors.password.message.replace("'", '&apos;')}
            </Styled.ErrorMsg>
          )}
          <Styled.LoginButton type="submit" disabled={isSubmitting}>
            Login
          </Styled.LoginButton>
        </Styled.LoginForm>
        <Styled.OAuthImage
          src="oauth_login_image.png"
          alt="OAuth2 로그인"
          onClick={() => {
            window.location.href = '네이버_OAuth_인증_페이지_링크';
          }}
        />
        <Styled.LinkWrap>
          <span>계정이 없으신가요?</span>
          <Link to="/signup">Sign Up</Link>
        </Styled.LinkWrap>
      </Styled.LoginContainer>
    </Styled.Wrap>
  );
}

export default Login;
