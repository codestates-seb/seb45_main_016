/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as S from './kakaoStyle';

import { useNavigate } from 'react-router-dom';

const Kakao = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getCodeFromURL = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API}login/oauth/code/kakao?code=${code}`,
            {
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'ngrok-skip-browser-warning': '2',
              },
            },
          );
          console.log('data', response.headers);
          if (response.status === 200) {
            const accessToken = response.headers.accesstoken;
            const name = jwt_decode(accessToken).name;
            const memberId = jwt_decode(accessToken).memberId;
            localStorage.setItem('authorization', accessToken);
            localStorage.setItem('memberId', memberId);
            localStorage.setItem('name', name);
            localStorage.setItem('licenseListId', 1);
            localStorage.setItem('comId', 1);
            alert('로그인이 성공했습니다.');
            navigate('/');
          } else {
            console.error('API 호출 실패:', response.statusText);
          }
        } catch (error) {
          console.error('API 호출 오류:', error);
          navigate('/login');
        }
      } else {
        console.log('URL에서 코드를 찾을 수 없습니다.');
      }
    };

    getCodeFromURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.KaKaoContainer>
      <div className="notice">
        <div className="spinner">
          <img src={imageUrl} alt="spinner" />
        </div>
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요!</p>
      </div>
    </S.KaKaoContainer>
  );
};

export default Kakao;
