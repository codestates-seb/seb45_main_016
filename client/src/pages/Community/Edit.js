import { useRef, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { PostContentStyle, TitleWrap } from './PostContentStyle';
// import { API } from '../../utils/API';

const Edit = () => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const focusRef = useRef();

  // const url = "주소넣기";

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

  localStorage.setItem('editedTitle', title);
  localStorage.setItem('editedContent', content);

  const patch = () => {
    // const method = 'fetch';
    if (count > 0 && content.length > 0) {
      console.log('fetch합니다');
      // API(url,method);
    }
  };

  return (
    <>
      <Header />
      <PostContentStyle>
        <TitleWrap>
          <button onClick={patch}>저장하기</button>
          <span>{count}/20</span>
          <input
            onKeyUp={titleHandler}
            name="input"
            defaultValue="현재 페이지 수정의 제목"
          ></input>
        </TitleWrap>
        <textarea
          ref={focusRef}
          onKeyUp={contentHandler}
          name="textarea"
          defaultValue="현재 페이지 수정의 글 내용"
        ></textarea>
        <Footer />
      </PostContentStyle>
    </>
  );
};

export default Edit;
