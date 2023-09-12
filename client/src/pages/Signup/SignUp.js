/* eslint-disable no-undef */

// Import necessary modules and components
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../utils/API';
import Header from '../../components/Header/Header';
import KakaoLogin from 'react-kakao-login';
import * as Styled from '../Signup/SignUpStyle';

const inputErrorClass = 'input-error';

const imageUrl = process.env.PUBLIC_URL + '/KaKaoLogo.png';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    trigger,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
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
        <Styled.SignUpForm onSubmit={handleSubmit(onSubmit)}>
          <Styled.SignUpInput
            type="text"
            name="name"
            placeholder="유저명 입력은 필수 입니다."
            {...register('name', {
              required: '유저명은 필수 입력입니다.',
            })}
            onBlur={() => trigger('name')}
            className={errors.name ? inputErrorClass : ''}
          />
          <Styled.SignUpInput
            type="email"
            name="eemail"
            placeholder="이메일 형식에 따라 작성해주세요."
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
            })}
            onBlur={() => trigger('email')}
            className={errors.email ? inputErrorClass : ''}
          />

          <Styled.SignUpInput
            type="password"
            name="password"
            placeholder="비밀번호는 8자리 이상 숫자,문자,특수문자 조합입니다."
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
            })}
            onBlur={() => trigger('password')}
            className={errors.password ? inputErrorClass : ''}
          />

          <Styled.SignUpInput
            type="tel"
            name="phone"
            placeholder="전화번호 (11자리 숫자)"
            {...register('phone', {
              required: '전화번호는 필수 입력입니다.',
            })}
            onBlur={() => trigger('phone')}
            className={errors.phone ? inputErrorClass : ''}
          />

          <Styled.SignUpButton type="submit" disabled={isSubmitting}>
            SIGN UP
          </Styled.SignUpButton>
        </Styled.SignUpForm>

        <Styled.DivisionLine />

        <KakaoLogin
          token="c87f3be5672760404116af0672b10766"
          onSuccess={onKakaoLoginSuccess}
          onFail={onKakaoLoginFail}
          style={{ background: 'none', border: 'none', padding: '0' }} // 스타일 추가
        >
          <img src={imageUrl} alt="카카오로 회원 가입" />
        </KakaoLogin>
        <Styled.LoginWrap>
          <span>이미 아이디가 있나요? </span>
          <Styled.styledLink to="/login">Login</Styled.styledLink>
        </Styled.LoginWrap>
      </Styled.SignUpContainer>
    </Styled.Wrap>
  );
}

export default SignUp;
