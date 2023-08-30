import axios from 'axios';

// axios.defaults.withCredentials = true; // 기본 설정에서 제거

export const login = async (data) => {
  try {
    const res = await axios({
      method: 'post',
      data,
      url: `https://62f8-116-125-236-74.ngrok-free.app/users/login`,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const signUp = async (data) => {
  try {
    const res = await axios({
      method: 'post',
      data,
      url: `http://43.201.157.40:8080/users/signup`,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};
