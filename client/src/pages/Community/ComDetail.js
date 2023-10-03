/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AnswerList from './AnswerList';
import * as T from './ComDetailStyle';
import Header from '../../components/Header/Header';
import {
  SvgEdit,
  SvgDelete,
  SvgReview,
  SvgHeartPath,
  SvgHeartFill,
} from '../../utils/svg';
import CreateAnswer from './CreateAnswer';
import { DeletePost, GetDetail } from '../../utils/API';
import Footer from '../../components/Footer/Footer';

const ComDetail = () => {
  const [boardData, setBoardData] = useState({
    boardCreator: { memberId: 1 },
    answers: [],
  });
  const [isAnswerOpen, setAnswerOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    GetDetail(id).then((res) => setBoardData({ ...res.data }));
  }, []);

  const answerAppender = async () => {
    await GetDetail(id).then((res) => setBoardData({ ...res.data }));
  };

  const deletePost = () => {
    DeletePost(id);
    window.location.href = `/community`;
  };

  const openAnswer = () => {
    if (isAnswerOpen === false) {
      setAnswerOpen(true);
    } else {
      setAnswerOpen(false);
    }
  };

  const like = () => {
    if (!isLike) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  };

  return (
    <T.ComDetailWrap>
      <Header />
      <T.BoardHeadWrap>
        <T.BoardEditBtnWrap>
          {boardData.boardCreator.memberId ===
            parseInt(localStorage.getItem('memberId')) && (
            <>
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
            </>
          )}
        </T.BoardEditBtnWrap>

        <T.BoardTitle>{boardData.title}</T.BoardTitle>
        <T.BoardCreatorInfo>
          <T.InfoImgWrap>
            <img
              src={boardData.boardCreator.profileImage}
              alt="creator_image_board"
            />
          </T.InfoImgWrap>
          <T.InfoDescription>
            <span>{boardData.boardCreator.name}</span>
            <span>{boardData.modifiedAt}</span>
          </T.InfoDescription>
        </T.BoardCreatorInfo>
      </T.BoardHeadWrap>
      {boardData && (
        <T.BoardBodyWrap>
          <T.BoardContent>{boardData.content}</T.BoardContent>
          <T.BoardContentBtnWrap>
            <T.OpenAnswerBtn
              data-isopen={isAnswerOpen}
              onClick={() => openAnswer()}
            >
              <SvgReview className="open" />
              <p>댓글</p>
              <p className="amount">{boardData.answers.length}</p>
            </T.OpenAnswerBtn>
            <T.HeartBtn data-liked={isLike} onClick={() => like()}>
              {!isLike ? <SvgHeartPath /> : <SvgHeartFill />}

              <p>Like</p>
            </T.HeartBtn>
          </T.BoardContentBtnWrap>
          {isAnswerOpen && (
            <AnswerList board={boardData} answers={boardData.answers} />
          )}
          <CreateAnswer
            answers={boardData.answers}
            className="board-focusing"
            answerAppender={answerAppender}
          />
        </T.BoardBodyWrap>
      )}
      <Footer />
    </T.ComDetailWrap>
  );
};

export default ComDetail;
