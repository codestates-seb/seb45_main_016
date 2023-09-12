import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';

const Kakao = () => {
  useEffect(() => {
    const getCodeFromURL = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        try {
          const response = await axios.get(
            `https://578a-222-96-41-224.ngrok-free.app/login/oauth/code/kakao?code=${code}`,
            {
              headers: {
                'Content-Type': 'application/json;charset=utf-8', // JSON 형태로 데이터를 보내겠다는 뜻
              },
            },
          );

          if (response.status === 200) {
            // const data = response.data;
            console.log('data', response.headers);
            // if (data.loginSuccess) {
            //   const member = data.member;
            //   // Handle successful login here
            //   console.log('Logged in successfully:', member);
            // } else {
            //   // Handle the case where login was not successful
            //   console.error('Login failed:', data.errorMessage);
            // }
          } else {
            console.error('API call failed:', response.statusText);
          }
        } catch (error) {
          console.error('API call error:', error);
        }
      } else {
        console.log('No code found in the URL.');
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
