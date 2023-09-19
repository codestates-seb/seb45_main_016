/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { PostContentStyle, TitleWrap } from './PostContentStyle';
import { PostEdit, GetDetail } from '../../utils/API';
import { useNavigate, useParams } from 'react-router-dom';
// import mockData from './ComData';

const Edit = () => {
  const [editData, setEditData] = useState({ title: '', content: '' });
  let { id } = useParams();

  useEffect(() => {
    GetDetail(id).then((res) => setEditData({ ...res.data }));
  }, []);

  const [title, setTitle] = useState(editData.title);
  const [content, setContent] = useState(editData.content);
  const focusRef = useRef();

  const navigator = useNavigate();

  const enter = (e) => {
    if (e.key === 'Enter') {
      focusRef.current.focus();
    }
  };

  const patch = () => {
    PostEdit(title, content, id);
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
            defaultValue={editData.title}
          ></input>
        </TitleWrap>
        <textarea
          ref={focusRef}
          onChange={(e) => setContent(e.target.value)}
          name="textarea"
          defaultValue={editData.content}
        ></textarea>
        <Footer />
      </PostContentStyle>
    </>
  );
};

export default Edit;
