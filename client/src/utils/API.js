/* eslint-disable no-undef */
import axios from 'axios';
import { json } from 'react-router-dom';

const token = localStorage.getItem('authorization');

const memberId = parseInt(localStorage.getItem('memberId'));

export const login = async (data) => {
  try {
    const res = await axios({
      method: 'post',
      data,

      url: `${process.env.REACT_APP_API}members/auth/login`,
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
      url: `${process.env.REACT_APP_API}members/signup`,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const GetAllLicensesList = async (data) => {
  let id = localStorage.getItem('licenseListId');
  try {
    const res = await axios({
      method: 'get',
      data,
      url: `${process.env.REACT_APP_API}licenses?page=${id}
      `,
      headers: {
        'ngrok-skip-browser-warning': '2',
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const GetAllCommunityPostsList = async (data) => {
  // let id = localStorage.getItem('boardId');
  let id = localStorage.getItem('comId');
  try {
    const res = await axios({
      method: 'get',
      data,
      url: `${process.env.REACT_APP_API}boards?page=${id}
      `,
      headers: {
        'ngrok-skip-browser-warning': '2',
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const GetDetail = async (id) => {
  try {
    const res = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}boards/${id}`,
      headers: {
        'ngrok-skip-browser-warning': '2',
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const GetSearchedlicense = async (data) => {
  try {
    const res = await axios({
      method: 'get',
      data,
      url: `${
        process.env.REACT_APP_API
      }licenses/find?name=${localStorage.getItem('savedKeyWords')}`,
      headers: {
        'ngrok-skip-browser-warning': '2',
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const PostContents = async (title, content) => {
  const res = await axios
    .post(`${process.env.REACT_APP_API}boards/create`, {
      title: title,
      content: content,
      memberId: memberId,
      headers: {
        'ngrok-skip-browser-warning': '1',
        Authorization: token,
      },
    })

    .then((res) => {
      window.location.href = `/community/detail${res.headers.location}`;
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

export const PostEdit = async (title, content, id) => {
  const res = await axios
    .patch(`${process.env.REACT_APP_API}boards/edit/${id}`, {
      title: title,
      content: content,
      memberId: memberId,
      headers: {
        'ngrok-skip-browser-warning': '2',
        Authorization: token,
      },
    })

    .then((res) => {
      window.location.href = `/community/detail${res.headers.location}`;
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

export const PostAnswer = async (writeValue) => {
  const res = await axios
    .post(
      `${process.env.REACT_APP_API}boards/${localStorage.getItem(
        'boardId',
      )}/answers`,
      {
        content: writeValue,
        memberId: memberId,
        headers: {
          'ngrok-skip-browser-warning': '2',
        },
      },
    )
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

export const PostComment = async (writeValue) => {
  let answerId = localStorage.getItem('answerId');
  const res = await axios
    .post(`${process.env.REACT_APP_API}answers/${answerId}/comments/create`, {
      content: writeValue,
      memberId: memberId,
      headers: {
        'ngrok-skip-browser-warning': '2',
        Authorization: token,
      },
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

export const DeleteAnswerlist = async () => {
  let boardId = localStorage.getItem('boardId');
  let answerId = localStorage.getItem('answerId');
  const res = await axios
    .delete(
      `${process.env.REACT_APP_API}boards/${boardId}/answers/delete/${answerId} `,
      {
        headers: {
          'ngrok-skip-browser-warning': '2',
          Authorization: token,
        },
      },
    )

    .then((res) => {
      window.location.href = `/community/detail${res.headers.location}`;
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

export const DeleteCommentlist = async () => {
  let answerId = localStorage.getItem('answerId');
  let commentId = localStorage.getItem('commentId');
  const res = await axios
    .delete(
      `${process.env.REACT_APP_API}answers/${answerId}/comments/${commentId}`,
      {
        headers: {
          'ngrok-skip-browser-warning': '2',
          Authorization:
            'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIiwiQURNSU4iXSwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSIsIm1lbWJlcklkIjoxLCJzdWIiOiJ1c2VyMUBleGFtcGxlLmNvbSIsImlhdCI6MTY5NTA0NDkzNSwiZXhwIjoxNjk1MDQ4NTM1fQ.t0oIawdX779qdlwdr02aZiJhjwQZZzKueD_PtlorrVo8CRBPq6xdIoQJPSQds2uC',
        },
      },
    )

    .then((res) => {
      window.location.href = `/community/detail${res.headers.location}`;
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

export const EditAnswerlist = async (writeValue) => {
  let boardId = localStorage.getItem('boardId');
  let answerId = localStorage.getItem('answerId');
  const res = await axios
    .patch(
      `${process.env.REACT_APP_API}boards/${boardId}/answers/${answerId}`,
      {
        content: writeValue,
        memberId: memberId,
        headers: {
          'ngrok-skip-browser-warning': '2',
          Authorization: token,
        },
      },
    )

    .catch(function (error) {
      console.log(error);
    });
  return res;
};

export const EditCommentlist = async (writeValue) => {
  let answerId = localStorage.getItem('answerId');
  let commentId = localStorage.getItem('commentId');
  const res = await axios
    .patch(
      `${process.env.REACT_APP_API}answers/${answerId}/comments/${commentId}`,
      {
        content: writeValue,
        memberId: memberId,
        headers: {
          'ngrok-skip-browser-warning': '2',
          Authorization: token,
        },
      },
    )

    .then((res) => {
      window.location.href = `/community/detail${res.headers.location}`;
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

export const DeletePost = async (id) => {
  const res = await axios
    .delete(`${process.env.REACT_APP_API}boards/delete/${id}`, {
      headers: {
        'ngrok-skip-browser-warning': '2',
        Authorization: token,
      },
    })

    .catch(function (error) {
      console.log(error);
    });
  return res;
};

export const deleteUser = async () => {
  try {
    const res = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API}members/auth/delete`,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const Postbookmark = async () => {
  const res = await axios
    .post(`${process.env.REACT_APP_API}bookmark`, {
      data: {
        code: localStorage.getItem('code'),
        memberId: memberId,
      },
      headers: {
        'ngrok-skip-browser-warning': '2',
        type: json,
      },
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

export const deleteBookmark = async () => {
  const res = await axios
    .delete(`${process.env.REACT_APP_API}bookmark`, {
      data: {
        memberId: memberId,
        code: localStorage.getItem('code'),
      },
      headers: {
        'ngrok-skip-browser-warning': '2',
      },
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};
