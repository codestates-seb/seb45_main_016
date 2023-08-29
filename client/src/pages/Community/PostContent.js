import { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { PostContentStyle, TitleWrap } from './PostContentStyle';

const PostContent = () => {
  const [count, setCount] = useState(0);

  const onKeyDownHandler = (e) => {
    if (count < 20 && e.keyCode !== 8) {
      setCount(count + 1);
    } else if (20 <= count && e.keyCode !== 8) {
      e.preventDefault();
    } else if (e.keyCode === 8 && count !== 0) {
      setCount(count - 1);
    }
  };

  return (
    <PostContentStyle>
      <Header />
      <p>글쓰기</p>
      <TitleWrap>
        <input
          placeholder="제목을 입력하세요"
          onKeyDown={onKeyDownHandler}
        ></input>
        <span>{count}/20</span>
      </TitleWrap>
      <textarea placeholder="내용을 입력하세요"></textarea>
      <button className="post">등록하기</button>
      <Footer />
    </PostContentStyle>
  );
};

export default PostContent;
