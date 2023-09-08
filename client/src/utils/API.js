import axios from 'axios';

export const login = async (data) => {
  try {
    const res = await axios({
      method: 'post',
      data,
      url: `https://6be6-112-162-132-106.ngrok-free.app/members/auth/login`,
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
      url: `https://6be6-112-162-132-106.ngrok-free.app/members/signup`,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const API = async (url, metho, body) => {
  try {
    const response = await axios({
      method: metho,
      url: url,
      body: body,
      headers: {
        Authorization: localStorage.getItem('Token'),
        dataType: 'json',
      },
    });
    console.log(response.data);

    return response;
  } catch (e) {
    console.log(e);
  }
};
