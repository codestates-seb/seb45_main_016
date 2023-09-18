/* eslint-disable no-undef */
import axios from 'axios';
import { json, useParams } from 'react-router-dom';

// const token = localStorage.getItem('authorization');

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
  try {
    const res = await axios({
      method: 'get',
      data,
      url: `${process.env.REACT_APP_API}boards?page=1
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
      memberId: 1,
      title: title,
      content: content,
      headers: {
        'ngrok-skip-browser-warning': '1',
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

export const PostEdit = async () => {
  const res = await axios
    .patch(
      `${process.env.REACT_APP_API}boards/edit/${localStorage.getItem(
        'boardId',
      )}`,
      {
        memberId: 1,
        title: localStorage.getItem('editedTitle'),
        content: localStorage.getItem('editedContent'),
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

export const PostAnswer = async (writeValue) => {
  const res = await axios
    .post(
      `${process.env.REACT_APP_API}boards/${localStorage.getItem(
        'boardId',
      )}/answers`,
      {
        memberId: 1,
        content: writeValue,
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
      memberId: 1,
      content: writeValue,
      headers: {
        'ngrok-skip-browser-warning': '2',
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
        memberId: 1,
        headers: {
          'ngrok-skip-browser-warning': '2',
          Authorization:
            'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIiwiQURNSU4iXSwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSIsIm1lbWJlcklkIjoxLCJzdWIiOiJ1c2VyMUBleGFtcGxlLmNvbSIsImlhdCI6MTY5NTA0ODM5OCwiZXhwIjoxNjk1MDUxOTk4fQ.K3kEr-MfoHlHKhgCJbaHsQKpJ2HlNT_-385Cs1p4bltYSAzIKBRYXYZCglAHllIn',
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
        memberId: 1,
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
  // let boardId = localStorage.getItem('boardId');
  // let answerId = localStorage.getItem('answerId');
  const res = await axios
    .patch(`${process.env.REACT_APP_API}boards/1/answers/3`, {
      memberId: 1,
      content: writeValue,
      headers: {
        'ngrok-skip-browser-warning': '2',
        Authorization:
          'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIiwiQURNSU4iXSwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSIsIm1lbWJlcklkIjoxLCJzdWIiOiJ1c2VyMUBleGFtcGxlLmNvbSIsImlhdCI6MTY5NTA0ODM5OCwiZXhwIjoxNjk1MDUxOTk4fQ.K3kEr-MfoHlHKhgCJbaHsQKpJ2HlNT_-385Cs1p4bltYSAzIKBRYXYZCglAHllIn',
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

export const EditCommentlist = async (writeValue) => {
  let answerId = localStorage.getItem('answerId');
  let commentId = localStorage.getItem('commentId');
  const res = await axios
    .patch(
      `${process.env.REACT_APP_API}answers/${answerId}/comments/${commentId}`,
      {
        memberId: 1,
        content: writeValue,
        headers: {
          'ngrok-skip-browser-warning': '2',
          Authorization:
            'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIiwiQURNSU4iXSwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSIsIm1lbWJlcklkIjoxLCJzdWIiOiJ1c2VyMUBleGFtcGxlLmNvbSIsImlhdCI6MTY5NTA0ODM5OCwiZXhwIjoxNjk1MDUxOTk4fQ.K3kEr-MfoHlHKhgCJbaHsQKpJ2HlNT_-385Cs1p4bltYSAzIKBRYXYZCglAHllIn',
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

export const DeletePost = async () => {
  const { id } = useParams();
  const res = await axios
    .delete(`${process.env.REACT_APP_API}boards/delete/${id}`, {
      memberId: 1,
      headers: {
        'ngrok-skip-browser-warning': '2',
        Authorization:
          'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIiwiQURNSU4iXSwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSIsIm1lbWJlcklkIjoxLCJzdWIiOiJ1c2VyMUBleGFtcGxlLmNvbSIsImlhdCI6MTY5NTA0NDkzNSwiZXhwIjoxNjk1MDQ4NTM1fQ.t0oIawdX779qdlwdr02aZiJhjwQZZzKueD_PtlorrVo8CRBPq6xdIoQJPSQds2uC',
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
        memberId: 1,
        code: localStorage.getItem('code'),
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
        memberId: 1,
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
