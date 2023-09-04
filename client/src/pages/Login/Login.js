import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import jwt_decode from 'jwt-decode'; // jwt-decode 라이브러리를 추가합니다.
import * as Styled from './LoginStyle';
import { login } from '../../utils/API';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // 여기에서 서버로 로그인 요청을 보내고 사용자 정보를 받아옵니다.
      const res = await login(data);

      if (res?.status === 200) {
        // 로그인이 성공한 경우
        const accessToken = res.headers.get('authorization');
        const userId = jwt_decode(accessToken).userId;
        const email = jwt_decode(accessToken).sub;
        localStorage.setItem('Id', email);
        localStorage.setItem('userId', userId);
        localStorage.setItem('Token', accessToken);

        alert('로그인이 성공했습니다.');
        navigate('/');
      } else {
        // 로그인이 실패한 경우
        const errorText =
          (await res.json())?.message ||
          '로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요.';
        alert(errorText);
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인 중에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const onKakaoLoginSuccess = (res) => {
    console.log('카카오 로그인 성공:', res);

    // 카카오로부터 받은 사용자 정보를 서버에 전송하고 로그인 처리를 수행할 수 있습니다.
    fetch('/api/login/kakao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kakaoUserId: res.profile.id,
        // 다른 필요한 정보도 추가하세요.
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // 카카오 로그인 성공 시 페이지 이동 및 알림
          alert('카카오 로그인이 성공했습니다.');
          navigate('/');
        } else {
          alert('로그인 중에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
        }
      })
      .catch((error) => {
        console.error('카카오 로그인 에러:', error);
        alert('로그인 중에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  const onKakaoLoginFail = (err) => {
    console.error('카카오 로그인 실패:', err);
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
        <KakaoLogin
          token="c87f3be5672760404116af0672b10766"
          onSuccess={onKakaoLoginSuccess}
          onFail={onKakaoLoginFail}
        >
          카카오로 로그인
        </KakaoLogin>
        <Styled.LinkWrap>
          <span>계정이 없으신가요?</span>
          <Link to="/signup">Sign Up</Link>
        </Styled.LinkWrap>
        <Footer />
      </Styled.LoginContainer>
    </Styled.Wrap>
  );
}

export default Login;
