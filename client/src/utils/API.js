/* eslint-disable no-undef */
import axios from 'axios';

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

//자격 정보 전체 조회
export const GetAllLicensesList = async (data) => {
  let id = localStorage.getItem('licenseListId');
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}licenses?page=${id}
    `,
      {
        headers: { Authorization: token },
        data,
      },
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};

//커뮤니티 정보 전체 조회
export const GetAllCommunityPostsList = async (data) => {
  // let id = localStorage.getItem('boardId');
  let id = localStorage.getItem('comId');
  try {
    const res = await axios({
      method: 'get',
      data,
      url: `${process.env.REACT_APP_API}boards?page=${id}
      `,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

//게시글 상세페이지 조회
export const GetDetail = async (id) => {
  try {
    const res = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}boards/${id}`,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

//검색된 자격 정보 조회
export const GetSearchedlicense = async (data) => {
  try {
    const res = await axios({
      method: 'get',
      data,
      url: `${
        process.env.REACT_APP_API
      }licenses/find?name=${localStorage.getItem('savedKeyWords')}`,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

//게시글 post
export const PostContents = async (title, content) => {
  const res = await axios
    .post(
      `${process.env.REACT_APP_API}boards/create`,
      {
        title: title,
        content: content,
        memberId: memberId,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )

    .then((res) => {
      window.location.href = `/community${res.headers.location}`;
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(res);
  return res;
};

//게시글 수정
export const PostEdit = async (title, content, id) => {
  const res = await axios
    .patch(
      `${process.env.REACT_APP_API}boards/edit/${id}`,
      {
        memberId: memberId,
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )

    .then(() => {
      window.location.href = `/community/boards/${id}`;
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

//게시글 삭제
export const DeletePost = async (id) => {
  const res = await axios
    .delete(
      `${process.env.REACT_APP_API}boards/delete/${id}`,
      {
        headers: { Authorization: token },
      },
      {
        memberId: memberId,
      },
    )

    .then(() => {
      window.location.href = `/community`;
    })

    .catch(function (error) {
      console.log(error);
    });
  return res;
};

//답변 작성
export const PostAnswer = async (writeValue, id) => {
  const res = await axios
    .post(`${process.env.REACT_APP_API}boards/${id}/answers`, {
      content: writeValue,
      memberId: memberId,
    })
    .then(() => {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

//답변 수정
export const EditAnswerlist = async (writeValue, answerId) => {
  let boardId = localStorage.getItem('boardId');
  const res = await axios
    .patch(
      `${process.env.REACT_APP_API}boards/${boardId}/answers/${answerId}`,
      {
        content: writeValue,
        memberId: memberId,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )

    .catch(function (error) {
      console.log(error);
    });
  return res;
};

//답변 삭제
export const DeleteAnswerlist = async (answerId) => {
  let boardId = localStorage.getItem('boardId');
  const res = await axios
    .delete(
      `${process.env.REACT_APP_API}boards/${boardId}/answers/delete/${answerId} `,
      {
        headers: {
          Authorization: token,
        },
      },
      {
        memberId: memberId,
      },
    )

    .then(() => {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

//댓글 작성
export const PostComment = async (writeValue) => {
  let answerId = localStorage.getItem('answerId');
  const res = await axios
    .post(
      `${process.env.REACT_APP_API}answers/${answerId}/comments/create`,
      {
        memberId: memberId,
        content: writeValue,
      },
      { headers: { Authorization: token } },
    )
    .then(() => {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

//댓글 수정
export const EditCommentlist = async (writeValue, answerId, commentId) => {
  const res = await axios
    .patch(
      `${process.env.REACT_APP_API}answers/${answerId}/comments/${commentId}`,
      {
        memberId: memberId,
        content: writeValue,
      },
      { headers: { Authorization: token } },
    )

    .then(() => {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

//댓글 삭제
export const DeleteCommentlist = async (answerId, commentId) => {
  const res = await axios
    .delete(
      `${process.env.REACT_APP_API}answers/${answerId}/comments/${commentId}`,
      {
        headers: {
          Authorization: token,
        },
      },
      {
        memberId: memberId,
      },
    )

    .then(() => {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

//북마킹
export const Postbookmark = async (code) => {
  const res = await axios
    .post(
      `${process.env.REACT_APP_API}bookmark`,
      {
        code: code,
        memberId: memberId,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .then(() => window.location.reload())
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

//북마크 해제
export const deleteBookmark = async (code) => {
  const res = await axios
    .delete(`${process.env.REACT_APP_API}bookmark`, {
      data: {
        memberId: memberId,
        code: code,
      },
    })
    .then(() => window.location.reload())
    .catch(function (error) {
      console.log(error);
      console.log(code);
    });
  return res;
};

//유저정보조회
export const GetUserInfo = async () => {
  // memberId와 token을 매개변수로 추가
  try {
    const res = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}members/mypage/${memberId}`,
      headers: {
        Authorization: token,
        'ngrok-skip-browser-warning': '2',
      },
    });
    console.log(res); // 응답을 로그로 출력
    console.log(token); // 응답을 로그로 출력
    return res;
  } catch (e) {
    console.log('제발좀', e);
  }
};

//유저정보수정
export const EditUser = async (updatedUserInfo) => {
  try {
    const res = await axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API}members/mypage/edit/${memberId}`,
      headers: {
        Authorization: token,
      },
      data: { updatedUserInfo },
    });
    console.log('memberId:', memberId);
    console.log('token:', token);

    return res;
  } catch (e) {
    console.log('실패다 요녀석', e);
  }
};

//유저정보삭제
export const DeleteUser = async () => {
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
