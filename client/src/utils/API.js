import axios from 'axios';
import { json, useParams } from 'react-router-dom';

export const login = async (data) => {
  try {
    const res = await axios({
      method: 'post',
      data,

      url: `https://c33e-222-96-41-224.ngrok-free.app/members/auth/login`,
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
      url: `https://c33e-222-96-41-224.ngrok-free.app/members/signup`,
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
      url: `https://c33e-222-96-41-224.ngrok-free.app/licenses?page=${id}
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
  try {
    const res = await axios({
      method: 'get',
      data,
      url: `https://c33e-222-96-41-224.ngrok-free.app/boards?page=1
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

export const GetDetail = async (data) => {
  let boardId = localStorage.getItem('boardId');
  try {
    const res = await axios({
      method: 'get',
      data,
      memberId: 1,
      url: `https://c33e-222-96-41-224.ngrok-free.app/boards/${boardId}`,
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
      url: `https://c33e-222-96-41-224.ngrok-free.app/licenses/find?name=${localStorage.getItem(
        'savedKeyWords',
      )}`,
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
    .post('https://c33e-222-96-41-224.ngrok-free.app/boards/create', {
      memberId: localStorage.getItem('userId'),
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
      `https://c33e-222-96-41-224.ngrok-free.app/boards/edit/${localStorage.getItem(
        'boardId',
      )}`,
      {
        memberId: localStorage.getItem('userId'),
        title: localStorage.getItem('editedTitle'),
        content: localStorage.getItem('editedContent'),
        headers: {
          'ngrok-skip-browser-warning': '2',
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
      `https://c33e-222-96-41-224.ngrok-free.app/boards/${localStorage.getItem(
        'boardId',
      )}/answers`,
      {
        memberId: localStorage.getItem('userId'),
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
    .post(
      `https://c33e-222-96-41-224.ngrok-free.app/answers/${answerId}/comments/create`,
      {
        memberId: localStorage.getItem('userId'),
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

export const DeleteAnswerlist = async () => {
  let boardId = localStorage.getItem('boardId');
  let answerId = localStorage.getItem('answerId');
  const res = await axios
    .delete(
      `https://c33e-222-96-41-224.ngrok-free.app/boards/${boardId}/answers/${answerId}/delete`,
      {
        memberId: localStorage.getItem('memberId'),
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
      `https://c33e-222-96-41-224.ngrok-free.app/answers/${answerId}/comments/${commentId}`,
      {
        memberId: localStorage.getItem('memberId'),
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
      `https://c33e-222-96-41-224.ngrok-free.app/boards/${boardId}/answers/${answerId}`,
      {
        memberId: localStorage.getItem('userId'),
        content: writeValue,
        headers: {
          'ngrok-skip-browser-warning': '2',
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

export const EditCommentrlist = async (writeValue) => {
  let answerId = localStorage.getItem('answerId');
  let commentId = localStorage.getItem('commentId');
  const res = await axios
    .patch(
      `https://c33e-222-96-41-224.ngrok-free.app/answers/${answerId}/comments/${commentId}`,
      {
        memberId: localStorage.getItem('userId'),
        content: writeValue,
        headers: {
          'ngrok-skip-browser-warning': '2',
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
    .delete(`https://c33e-222-96-41-224.ngrok-free.app/boards/delete/${id}`, {
      memberId: localStorage.getItem('memberId'),
      headers: {
        'ngrok-skip-browser-warning': '2',
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
      url: `https://c33e-222-96-41-224.ngrok-free.app/members/auth/delete`,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const Postbookmark = async () => {
  const res = await axios
    .post('https://c33e-222-96-41-224.ngrok-free.app/bookmark', {
      data: {
        memberId: localStorage.getItem('memberId'),
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
    .delete('https://c33e-222-96-41-224.ngrok-free.app/bookmark', {
      data: {
        memberId: localStorage.getItem('memberId'),
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
