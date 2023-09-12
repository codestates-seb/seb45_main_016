/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { PostContentStyle, TitleWrap } from './PostContentStyle';
import { useNavigate } from 'react-router-dom';
import { ComData } from './ComData';

const PostMock = () => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const focusRef = useRef();
  const navigator = useNavigate();

  const titleHandler = (e) => {
    e.target.maxLength = 20;
    setCount(e.target.value.length);

    if (e.keyCode === 13) {
      focusRef.current.focus();
    }

    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  localStorage.setItem('title', title);
  localStorage.setItem('content', content);

  const post = () => {
    if (count > 0 && content.length > 0) {
      console.log('post합니다');
      ComData.push({
        boardId: ComData.length,
        username: 'exampleUserId',
        email: 'bobibo@naver.com',
        title: localStorage.getItem('title'),
        content: localStorage.getItem('content'),
        comment: [],
      });
    }
    localStorage.setItem('mockid', ComData.length);
    navigator(`/community/detail/${ComData.length}`);
  };

  return (
    <>
      <Header />
      <PostContentStyle>
        <TitleWrap>
          <button onClick={post}>저장하기</button>
          <span>{count}/20</span>
          <input placeholder="제목을 입력하세요" onKeyUp={titleHandler}></input>
        </TitleWrap>
        <textarea
          placeholder="내용을 입력하세요"
          ref={focusRef}
          onKeyUp={contentHandler}
        ></textarea>
        <Footer />
      </PostContentStyle>
    </>
  );
};

export default PostMock;
