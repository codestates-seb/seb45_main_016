/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
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
            localStorage.stItem('memberId', memberId);
            localStorage.setItem('name', name);
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
  }, []);

  return (
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Kakao;
