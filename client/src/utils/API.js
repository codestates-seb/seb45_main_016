import axios from 'axios';

export const login = async (data) => {
  try {
    const res = await axios({
      method: 'post',
      data,
      url: ``,
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
      url: ``,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const Post = async (url) => {
  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: localStorage.getItem('Token'),
          dataType: 'json',
        },
      },
    );
    console.log(response.data);

    return response;
  } catch (e) {
    console.log(e);
  }
};
