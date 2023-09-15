/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { PostContentStyle, TitleWrap } from './PostContentStyle';
import { PostEdit } from '../../utils/API';
import { useNavigate } from 'react-router-dom';
// import { API } from '../../utils/API';

const Edit = ({ ComData }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const focusRef = useRef();

  const navigator = useNavigate();

  let id = localStorage.getItem('boardId');

  const ComFiltered = ComData.filter((el) => {
    return el.boardId === Number(id);
  });

  const titleHandler = (e) => {
    e.target.maxLength = 20;

    if (e.keyCode === 13) {
      focusRef.current.focus();
    }

    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  localStorage.setItem('editedTitle', title);
  localStorage.setItem('editedContent', content);

  const patch = () => {
    console.log('patch합니다');
    PostEdit();
    navigator(`/community/detail/boards/${id}`);
  };

  return (
    <>
      <Header />
      <PostContentStyle>
        <TitleWrap>
          <button onClick={patch}>저장하기</button>
          <input
            onKeyUp={titleHandler}
            name="input"
            defaultValue={ComFiltered[0].title}
          ></input>
        </TitleWrap>
        {console.ComFiltered}
        <textarea
          ref={focusRef}
          onKeyUp={contentHandler}
          name="textarea"
          defaultValue={ComFiltered[0].content}
        ></textarea>
        <Footer />
      </PostContentStyle>
    </>
  );
};

export default Edit;
