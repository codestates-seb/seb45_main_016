<<<<<<< Updated upstream
import React, { useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
=======
import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
>>>>>>> Stashed changes

const Kakao = () => {
  useEffect(() => {
    const getCodeFromURL = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        try {
          const response = await axios.get(
<<<<<<< Updated upstream
            `https://3f47-222-96-41-224.ngrok-free.app/login/oauth/code/kakao?code=${code}`,

=======
            `https://578a-222-96-41-224.ngrok-free.app/login/oauth/code/kakao?code=${code}`,
>>>>>>> Stashed changes
            {
              headers: {
                'Content-Type': 'application/json;charset=utf-8', // JSON 형태로 데이터를 보내겠다는 뜻
              },
            },
          );
<<<<<<< Updated upstream
          console.log('data', response.headers);
          if (response.status === 200) {
            const accessToken = response.headers.authorization;
            const userId = jwt_decode(accessToken).userId;
            const email = jwt_decode(accessToken).sub;
            localStorage.setItem('Id', email);
            localStorage.setItem('userId', userId);
            localStorage.setItem('Token', accessToken);
            alert('로그인이 성공했습니다.');
          } else {
            console.error('API 호출 실패:', response.statusText);
          }
        } catch (error) {
          console.error('API 호출 오류:', error);
        }
      } else {
        console.log('URL에서 코드를 찾을 수 없습니다.');
=======

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
>>>>>>> Stashed changes
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
