import axios from 'axios';
import { useParams } from 'react-router-dom';

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

export const GetDetail = async (data) => {
  const { id } = useParams();
  try {
    const res = await axios({
      method: 'get',
      data,
      url: `https://65a9-182-211-13-193.ngrok-free.app/boards/${id}`,
      headers: {
        'ngrok-skip-browser-warning': '2',
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const Delete = async (data) => {
  const { id } = useParams();
  try {
    const res = await axios({
      method: 'get',
      data,
      url: `https://65a9-182-211-13-193.ngrok-free.app/boards/delete/${id}`,
      memberId: 1,
      headers: {
        'ngrok-skip-browser-warning': '2',
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};
