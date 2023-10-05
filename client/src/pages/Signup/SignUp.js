/* eslint-disable no-undef */
// Import necessary modules and components
/* eslint-disable no-undef */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../utils/API';
import Header from '../../components/Header/Header';
import * as Styled from '../Signup/SignUpStyle';

const inputErrorClass = 'input-error';
const imageUrl = process.env.PUBLIC_URL + '/KaKaoLogo.png';

const SignUp = () => {
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
        navigate('/login');
      } else {
        toast.error('회원 가입에 실패했습니다.');
      }
    } catch (error) {
      toast.error('회원 가입에 실패했습니다.');
    }
  };

  const handleKakaoLoginClick = () => {
    navigate('/login');
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
            placeholder="비밀번호는 8자리 이상 숫자, 문자, 특수문자 조합입니다."
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
            })}
            className={errors.password ? inputErrorClass : ''}
          />
          <Styled.SignUpInput
            type="password"
            name="password2"
            placeholder="비밀번호를 다시 입력해주세요."
            {...register('password2', {
              required: '비밀번호 확인은 필수 입력입니다.',
            })}
            className={errors.password2 ? inputErrorClass : ''}
          />
          {errors.password2 && <p>{errors.password2.message}</p>}

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
        <Styled.KakaoLogin onClick={() => handleKakaoLoginClick()}>
          <img src={imageUrl} alt="카카오로 회원 가입" />
        </Styled.KakaoLogin>
        <Styled.LoginWrap>
          <span>이미 아이디가 있나요? </span>
          <Styled.styledLink to="/login">Login</Styled.styledLink>
        </Styled.LoginWrap>
      </Styled.SignUpContainer>
    </Styled.Wrap>
  );
};

export default SignUp;
