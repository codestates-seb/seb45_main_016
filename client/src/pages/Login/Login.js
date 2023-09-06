import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import jwt_decode from 'jwt-decode'; // jwt-decode 라이브러리를 추가합니다.
import * as Styled from './LoginStyle';
import { login } from '../../utils/API';
import Header from '../../components/Header/Header';

// eslint-disable-next-line no-undef
const imageUrl = process.env.PUBLIC_URL + '/KaKaoLogo.png';
function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
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
        </Styled.LoginForm>
        <Styled.LoginButton type="submit" disabled={isSubmitting}>
          Login
        </Styled.LoginButton>
        <Styled.DivisionLine />
        <KakaoLogin
          token="c87f3be5672760404116af0672b10766"
          onSuccess={onKakaoLoginSuccess}
          onFail={onKakaoLoginFail}
          style={{ background: 'none', border: 'none', padding: '0' }} // 스타일 추가
        >
          <img src={imageUrl} alt="카카오로 회원 가입" />
        </KakaoLogin>
        <Styled.LinkWrap>
          <span>계정이 없으신가요?</span>
          <Styled.styledLink to="/signup">Sign up</Styled.styledLink>
        </Styled.LinkWrap>
      </Styled.LoginContainer>
    </Styled.Wrap>
  );
}

export default Login;
