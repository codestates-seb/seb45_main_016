/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { PostContentStyle, TitleWrap } from './PostContentStyle';
import { PostEdit } from '../../utils/API';
import { useNavigate } from 'react-router-dom';
import mockData from './ComData';

const Edit = () => {
  // const [editData, setEditData] = useState();

  // useEffect(() => GetDetail().then((res) => setEditData({ ...res.data })), []);

  const getBoard = mockData.data;
  // const getBoard = editData;

  const [title, setTitle] = useState(getBoard.title);
  const [content, setContent] = useState(getBoard.content);
  const focusRef = useRef();

  console.log(title, content);

  const navigator = useNavigate();

  let id = localStorage.getItem('boardId');

  const enter = (e) => {
    if (e.key === 'Enter') {
      focusRef.current.focus();
    }
  };

  const patch = () => {
    console.log('patch합니다');
    PostEdit(title, content);
    navigator(`/community/detail/boards/${id}`);
  };

  return (
    <>
      <Header />
      <PostContentStyle>
        <TitleWrap>
          <button onClick={patch}>저장하기</button>
          <input
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={enter}
            name="input"
            defaultValue={getBoard.title}
          ></input>
        </TitleWrap>
        {console.ComFiltered}
        <textarea
          ref={focusRef}
          onChange={(e) => setContent(e.target.value)}
          name="textarea"
          defaultValue={getBoard.content}
        ></textarea>
        <Footer />
      </PostContentStyle>
    </>
  );
};

export default Edit;
