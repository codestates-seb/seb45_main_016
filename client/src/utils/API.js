import axios from 'axios';

export const login = async (data) => {
  try {
    const res = await axios({
      method: 'post',
      data,
      url: `https://d606-182-211-13-193.ngrok-free.app/members/auth/login`,
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
      url: `https://d606-182-211-13-193.ngrok-free.app/members/signup`,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const API = async (url, metho) => {
  try {
    const response = await axios({
      method: metho,
      url: url,
      body: {
        memberId: '1',
        title: '게시글 제목',
        content: '게시글 본문입니다아아아',
      },
      headers: {
        dataType: 'json',
      },
    });
    console.log(response.data);

    return response;
  } catch (e) {
    console.log(e);
  }
};
