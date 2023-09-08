/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { PostContentStyle, TitleWrap } from './PostContentStyle';
import axios from 'axios';

const PostContent = () => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const focusRef = useRef();

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
    }
    axios
      .post('https://7af2-182-211-13-193.ngrok-free.app/boards/create', {
        memberId: '1',
        title: localStorage.getItem('title'),
        content: localStorage.getItem('content'),
        headers: {
          'ngrok-skip-browser-warning': '2',
        },
      })
      .then(function (response) {
        localStorage.setItem('param', response.headers.location);
      })
      .then(() => {
        window.location.href = `/community/detail${localStorage.getItem(
          'param',
        )}`;
      })
      .catch(function (error) {
        console.log(error);
      });
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

export default PostContent;
