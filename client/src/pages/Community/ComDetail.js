/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import mockData from './ComData';
import AnswerList from './AnswerList';
import * as T from './ComDetailStyle';
import Header from '../../components/Header/Header';
import { SvgEdit, SvgDelete, SvgReview, SvgHeartPath } from '../../utils/svg';
import CreateAnswer from './CreateAnswer';
import { GetDetail } from '../../utils/API';

const ComDetail = () => {
  // const [board, setBoardData] = useState({ ...mockData.data });
  const [board, setBoardData] = useState({});
  const [isAnswerOpen, setAnswerOpen] = useState(false);
  const { id } = useParams();

  const deletePost = () => {
    console.log('board delete');
  };

  // useEffect(() => setBoardData({ ...mockData.data }), []);
  useEffect(() => GetDetail().then((res) => setBoardData({ ...res.data })), []);

  const openAnswer = () => {
    if (isAnswerOpen === false) {
      setAnswerOpen(true);
    } else {
      setAnswerOpen(false);
    }
  };

  return (
    <T.ComDetailWrap>
      <Header />
      <T.BoardHeadWrap>
        <T.BoardEditBtnWrap>
          <Link to={'/edit/' + id}>
            <button>
              <SvgEdit />
            </button>
          </Link>
          <Link to={'/community'}>
            <button onClick={deletePost}>
              <SvgDelete />
            </button>
          </Link>
        </T.BoardEditBtnWrap>
        <T.BoardTitle>{board.title}</T.BoardTitle>
        <T.BoardCreatorInfo>
          <div>
            <img src={board.profileImage} alt="creator_image_board" />
          </div>
          <div>
            <span>{board.boardCreater.name}</span>
            <span>{board.modifiedAt}</span>
          </div>
        </T.BoardCreatorInfo>
      </T.BoardHeadWrap>
      <T.BoardBodyWrap>
        <T.BoardContent>{board.content}</T.BoardContent>
        <T.BoardContentBtnWrap>
          <button onClick={openAnswer}>
            <SvgReview />
            댓글 {board.answers.length}
          </button>
          <button>
            <SvgHeartPath />
            좋아요 좋아요갯수
          </button>
        </T.BoardContentBtnWrap>
        {isAnswerOpen && <AnswerList board={board} />}
        <CreateAnswer />
      </T.BoardBodyWrap>
    </T.ComDetailWrap>
  );
};

export default ComDetail;
