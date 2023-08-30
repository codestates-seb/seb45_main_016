import { useRef, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { PostContentStyle, TitleWrap } from './PostContentStyle';

const PostContent = () => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const focusRef = useRef();

  const TitleHandler = (e) => {
    e.target.maxLength = 20;
    if (count < 20 && e.keyCode !== 8 && e.keyCode !== 13) {
      setCount(count + 1);
    } else if (e.keyCode === 8 && count !== 0) {
      setCount(count - 1);
    }

    if (e.keyCode === 13) {
      focusRef.current.focus();
    }

    setTitle(e.target.value);
  };

  const ContentHandler = (e) => {
    setContent(e.target.value);
  };

  localStorage.setItem('title', title);
  localStorage.setItem('content', content);

  return (
    <PostContentStyle>
      <Header />
      <p>글쓰기</p>
      <TitleWrap>
        <input placeholder="제목을 입력하세요" onKeyUp={TitleHandler}></input>
        <span>{count}/20</span>
      </TitleWrap>
      <textarea
        placeholder="내용을 입력하세요"
        ref={focusRef}
        onKeyUp={ContentHandler}
      ></textarea>
      <button className="post">등록하기</button>
      <Footer />
    </PostContentStyle>
  );
};

export default PostContent;
