import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../../utils/API';
import * as Styled from './SignUpStyle';
import Header from '../../components/Header/Header';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await signUp({
        userName: data.name,
        email: data.email,
        password: data.password,
      });

      if (response?.status === 201) {
        alert('회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
      } else {
        alert('회원 가입에 실패했습니다. 중복된 이메일 또는 닉네임 입니다.');
      }
    } catch (error) {
      console.error('회원 가입 에러:', error);
      alert('회원 가입 중에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <Styled.Wrap>
      <Header />
      <Styled.SignUpContainer>
        <Styled.SignUpForm onSubmit={handleSubmit(onSubmit)}>
          <Styled.SignUpInput
            type="text"
            name="nickname"
            placeholder="nickname"
            aria-invalid={!isDirty ? undefined : errors.name ? 'true' : 'false'}
            {...register('name', {
              required: '유저명은 필수 입력입니다.',
              pattern: {
                value: /^[a-zA-Z가-힣0-9]{4,16}$/,
                message: '이름은 특수문자 없이 4~16자 사이로 만들어야 합니다.',
              },
            })}
          />
          {errors.name && (
            <Styled.ErrorMsg role="alert">
              {errors.name.message}
            </Styled.ErrorMsg>
          )}
          <Styled.SignUpInput
            type="email"
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
          <Styled.SignUpInput
            type="password"
            name="password"
            placeholder="Password"
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
              {errors.password.message}
            </Styled.ErrorMsg>
          )}
          <Styled.SignUpInput
            type="tel"
            name="phone"
            placeholder="Phone Number"
            aria-invalid={
              !isDirty ? undefined : errors.phone ? 'true' : 'false'
            }
            {...register('phone', {
              required: '전화번호는 필수 입력입니다.',
              pattern: {
                value: /^\d{11}$/,
                message: '전화번호는 11자리 숫자로 입력해야 합니다.',
              },
            })}
          />
          {errors.phone && (
            <Styled.ErrorMsg role="alert">
              {errors.phone.message}
            </Styled.ErrorMsg>
          )}
          <Styled.SignUpButton type="submit" disabled={isSubmitting}>
            Sign Up
          </Styled.SignUpButton>
        </Styled.SignUpForm>
        <Styled.OAuthImage
          src="oauth_signup_image.png"
          alt="OAuth2 로그인"
          onClick={() => {
            window.location.href = '네이버_OAuth_인증_페이지_링크';
          }}
        />
        <Styled.LoginWrap>
          <span>이미 아이디가 있으신가요?</span>
          <Link to="/login">Login</Link>
        </Styled.LoginWrap>
      </Styled.SignUpContainer>
    </Styled.Wrap>
  );
}

export default SignUp;
