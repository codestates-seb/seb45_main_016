import axios from 'axios';
import { json, useParams } from 'react-router-dom';

export const login = async (data) => {
  try {
    const res = await axios({
      method: 'post',
      data,

      url: `https://7827-116-125-236-74.ngrok-free.app/members/auth/login`,
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
      url: `https://7827-116-125-236-74.ngrok-free.app/members/signup`,
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
      url: `https://17b3-116-125-236-74.ngrok-free.app/licenses?page=${id}
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
      url: `https://17b3-116-125-236-74.ngrok-free.app/boards?page=1
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
      url: `https://17b3-116-125-236-74.ngrok-free.app/boards/${boardId}`,
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
      url: `https://65a9-182-211-13-193.ngrok-free.app/licenses/find?name=${localStorage.getItem(
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

export const PostContents = async () => {
  const res = await axios
    .post('https://65a9-182-211-13-193.ngrok-free.app/boards/create', {
      memberId: localStorage.getItem('userId'),
      title: localStorage.getItem('title'),
      content: localStorage.getItem('content'),
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
      `https://65a9-182-211-13-193.ngrok-free.app/boards/edit/${localStorage.getItem(
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

export const ReviewEdit = async () => {
  const res = await axios
    .patch(
      `http://{{host}}/boards/${localStorage.getItem('boardId')}/answers/1,
      )}`,
      {
        memberId: localStorage.getItem('userId'),
        content: localStorage.getItem('editedReview'),
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
    .delete(`https://65a9-182-211-13-193.ngrok-free.app/boards/delete/${id}`, {
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
      url: `https://578a-222-96-41-224.ngrok-free.app/members/auth/delete`,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const Postbookmark = async () => {
  const res = await axios
    .post('https://17b3-116-125-236-74.ngrok-free.app/bookmark', {
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
    .delete('https://17b3-116-125-236-74.ngrok-free.app/bookmark', {
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
