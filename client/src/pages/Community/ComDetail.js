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

  localStorage.setItem('beforeTitle', boardData.title);
  localStorage.setItem('beforeContent', boardData.content);

  const answerAppender = async () => {
    await GetDetail(id).then((res) => setBoardData({ ...res.data }));
  };

  const deletePost = () => {
    DeletePost(id);
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

  const commentsLength = () => {
    let commentsArr = boardData.answers.map((el) => {
      return el.comments.length;
    });

    return commentsArr.reduce((a, b) => {
      return a + b;
    }, 0);
  };

  const timeChange = (modifiedAt) => {
    let timeData = String(modifiedAt);
    let newTimeView = '';

    let yearArr = [];
    let year = '';

    let monthArr = [];
    let month = '';

    let dayArr = [];
    let day = '';

    let timeArr = [];
    let time = '';

    let minuteArr = [];
    let minute = '';

    let secondsArr = [];
    let seconds = '';

    let before = timeData.split('');

    for (let i = 0; i < before.length - 1; i++) {
      if (i <= 3) {
        yearArr.push(before[i]);
      } else if (5 <= i && i <= 6) {
        monthArr.push(before[i]);
      } else if (8 <= i && i <= 9) {
        dayArr.push(before[i]);
      } else if (11 <= i && i <= 12) {
        timeArr.push(before[i]);
      } else if (14 <= i && i <= 15) {
        minuteArr.push(before[i]);
      } else if (17 <= i && i <= 18) {
        secondsArr.push(before[i]);
      }
    }

    year = yearArr.join('');
    month = monthArr.join('');
    day = dayArr.join('');
    time = timeArr.join('');
    minute = minuteArr.join('');
    seconds = secondsArr.join('');

    const months = {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec',
    };

    newTimeView =
      months[`${Number(month)}`] +
      '.' +
      day +
      '.' +
      year +
      ' / ' +
      time +
      '시' +
      ' ' +
      minute +
      '분' +
      ' ' +
      seconds +
      '초';

    return newTimeView;
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
              <button onClick={deletePost}>
                <SvgDelete />
              </button>
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
            <div className="user">
              <div>{boardData.boardCreator.name}</div>
              <div>{boardData.boardCreator.email}</div>
            </div>
            <div>{timeChange(boardData.modifiedAt)}</div>
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
              <p className="amount">
                {boardData.answers.length + commentsLength()}
              </p>
            </T.OpenAnswerBtn>
            <T.HeartBtn data-liked={isLike} onClick={() => like()}>
              {!isLike ? <SvgHeartPath /> : <SvgHeartFill />}

              <p>Like</p>
            </T.HeartBtn>
          </T.BoardContentBtnWrap>
          {isAnswerOpen && (
            <AnswerList
              answers={boardData.answers}
              commentsLength={commentsLength()}
              timeChange={timeChange}
            />
          )}
          <CreateAnswer
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
