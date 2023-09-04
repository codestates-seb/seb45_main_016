import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../../utils/API';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import KakaoLogin from 'react-kakao-login';
import * as Styled from '../Signup/SignUpStyle'; // 스타일 컴포넌트 가져오기

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await signUp({
        userName: data.name,
        email: data.email,
        password: data.password,
        phonenumber: data.phonenumber,
      });

      if (response?.status === 201) {
        alert('회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
      } else {
        alert('회원 가입에 실패했습니다.');
      }
    } catch (error) {
      alert('회원 가입 중에 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 카카오 로그인 성공 시 호출될 함수
  const onKakaoLoginSuccess = (res) => {
    console.log('카카오 로그인 성공:', res);

    // 카카오로부터 받은 사용자 정보를 서버에 전송하고 회원 가입 처리를 수행할 수 있습니다.
    // 여기에서 res.profile 등을 이용하여 필요한 정보를 추출하고 서버로 전송하는 로직을 추가하세요.

    // 예시: 서버로 사용자 정보 전송
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: res.profile.properties.nickname,
        // 다른 필요한 정보도 추가하세요.
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // 회원 가입 성공 시 페이지 이동 및 알림
          alert('회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
          navigate('/login');
        } else {
          alert(
            '회원 가입 중에 문제가 발생했습니다. 나중에 다시 시도해주세요.',
          );
        }
      })
      .catch((error) => {
        console.error('회원 가입 에러:', error);
        alert('회원 가입 중에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  // 카카오 로그인 실패 시 호출될 함수
  const onKakaoLoginFail = (err) => {
    console.error('카카오 로그인 실패:', err);
  };

  return (
    <Styled.Wrap>
      <Header />
      <Styled.SignUpContainer>
        <h1>회원 가입</h1>
        <Styled.SignUpForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Styled.SignUpInput
              type="text"
              name="name"
              placeholder="이름"
              {...register('name', {
                required: '이름은 필수 입력입니다.',
              })}
            />
            {errors.name && (
              <Styled.ErrorMsg>{errors.name.message}</Styled.ErrorMsg>
            )}
          </div>
          <div>
            <Styled.SignUpInput
              type="email"
              name="email"
              placeholder="이메일"
              {...register('email', {
                required: '이메일은 필수 입력입니다.',
              })}
            />
            {errors.email && (
              <Styled.ErrorMsg>{errors.email.message}</Styled.ErrorMsg>
            )}
          </div>
          <div>
            <Styled.SignUpInput
              type="password"
              name="password"
              placeholder="비밀번호"
              {...register('password', {
                required: '비밀번호는 필수 입력입니다.',
              })}
            />
            {errors.password && (
              <Styled.ErrorMsg>{errors.password.message}</Styled.ErrorMsg>
            )}
          </div>
          <div>
            <Styled.SignUpInput
              type="tel"
              name="phone"
              placeholder="전화번호"
              {...register('phone', {
                required: '전화번호는 필수 입력입니다.',
              })}
            />
            {errors.phone && (
              <Styled.ErrorMsg>{errors.phone.message}</Styled.ErrorMsg>
            )}
          </div>
          <Styled.SignUpButton type="submit" disabled={isSubmitting}>
            회원 가입
          </Styled.SignUpButton>
        </Styled.SignUpForm>

        <KakaoLogin
          token="c87f3be5672760404116af0672b10766" // 여기에 카카오 개발자 사이트에서 발급한 클라이언트 ID를 넣으세요
          onSuccess={onKakaoLoginSuccess}
          onFail={onKakaoLoginFail}
        >
          카카오로 회원 가입
        </KakaoLogin>

        <Styled.LoginWrap>
          <span>이미 아이디가 있으신가요?</span>
          <Link to="/login">로그인</Link>
        </Styled.LoginWrap>
        <Footer />
      </Styled.SignUpContainer>
    </Styled.Wrap>
  );
}

export default SignUp;
