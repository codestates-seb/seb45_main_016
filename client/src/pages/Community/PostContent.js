/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { PostContentStyle, TitleWrap } from './PostContentStyle';
import { PostContents } from '../../utils/API';

const PostContent = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const focusRef = useRef();

  const enter = (e) => {
    if (e.key === 'Enter') {
      focusRef.current.focus();
    }
  };

  console.log(title, content);

  const post = () => {
    if (title.length > 0 && content.length > 0) {
      console.log('post합니다');
    }
    // axios
    //   .post('https://65a9-182-211-13-193.ngrok-free.app/boards/create', {
    //     memberId: '1',
    //     title: localStorage.getItem('title'),
    //     content: localStorage.getItem('content'),
    //     headers: {
    //       'ngrok-skip-browser-warning': '2',
    //     },
    //   })

    //   .then((res) => {
    //     window.location.href = `/community/detail${res.headers.location}`;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    PostContents(title, content).then((res) => {
      window.location.href = `/community/detail${res.headers.location}`;
    });
  };

  return (
    <>
      <Header />
      <PostContentStyle>
        <TitleWrap>
          <button onClick={post}>
            <p>저장하기</p>
          </button>
          <input
            placeholder="제목을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => enter(e)}
          ></input>
        </TitleWrap>
        <textarea
          placeholder="내용을 입력하세요"
          ref={focusRef}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <Footer />
      </PostContentStyle>
    </>
  );
};

export default PostContent;
