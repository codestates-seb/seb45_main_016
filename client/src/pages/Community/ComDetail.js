/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import writerprofile from '../../pages/Community/writerprofile.png';
import profile1 from '../../pages/Community/profile1.png';
import profile2 from '../../pages/Community/profile2.png';
import profile3 from '../../pages/Community/profile3.png';
import {
  BottomErrow,
  SvgDelete,
  SvgEdit,
  SvgHeartFill,
  SvgHeartPath,
  SvgReview,
} from '../../utils/svg';
import * as T from './ComDetailStyle';

const ComDetailMock = ({ ComData }) => {
  const [isOpen, setOpen] = useState(false);
  const [isReviewEdit, setReviewEdit] = useState(false);
  const [isContentLiked, setContentLiked] = useState(false);
  const [data, setData] = useState([...ComData]);
  const [openReviewIndex, setOpenReviewIndex] = useState();

  let boardId = localStorage.getItem('boardId');
  const [comment, setComment] = useState([...data[boardId].comment]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    setData(data);
    setComment(comment);
  }, [...comment]);
  console.log(data);

  const openReview = () => {
    if (isOpen === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const editReview = (e) => {
    // const method = 'fetch';
    if (isReviewEdit === false) {
      setReviewEdit(true);
    } else {
      setReviewEdit(false);
      comment[e.target.id].content = localStorage.getItem('editedReview');
      console.log('댓글 수정을 완료합니다');
    }
  };

  let length = comment.length;
  const deleting = (e) => {
    if (e.target.className === 'reply') {
      comment[e.target.id].reply = undefined;
      setComment(comment.map((el) => el));
    } else {
      comment[e.target.id] = undefined;
      setComment(comment.map((el) => el));
    }
    console.log(comment.length);
  };
  console.log(length);

  const contentLike = () => {
    if (isContentLiked === false) {
      setContentLiked(true);
    } else {
      setContentLiked(false);
    }
  };

  const postReply = () => {
    if (0 < localStorage.getItem('reply').length) {
      axios
        .post(
          'https://65a9-182-211-13-193.ngrok-free.app/answers/replies/create',
          {
            memberId: '1',
            content: localStorage.getItem('content'),
            headers: {
              'ngrok-skip-browser-warning': '2',
            },
          },
        )

        .catch(function (error) {
          console.log(error);
        });
    }
    setOpenReviewIndex('');
  };

  return (
    <T.DetailEntire key={boardId}>
      <Header />
      <T.Top>
        <T.EditBtn>
          {userId === data[boardId].username && (
            <div>
              <Link to={'/edit/' + boardId}>
                <button>
                  <SvgEdit />
                </button>
              </Link>
              <button name="content">
                <SvgDelete />
              </button>
            </div>
          )}
        </T.EditBtn>

        <T.Title>
          <p>[후기]</p>
          <p>{data[boardId].title}</p>
        </T.Title>
        <T.ImgWrap>
          <img src={writerprofile} alt="이미지" />
        </T.ImgWrap>
        <T.InfoWrap>
          <T.User>
            <p>물폭탄 보보</p>
            <p className="email">email@naver.com</p>
          </T.User>
          <p>Aug.28.2023</p>
        </T.InfoWrap>
      </T.Top>
      <T.Body>
        <T.Content>
          <p>{data[boardId].content}</p>
        </T.Content>
        <T.ButtonWrap>
          <T.ReviewOpenBtn onClick={openReview} data-isopen={isOpen}>
            <SvgReview />
            <div className="btn-name">댓글</div>
            <div className="num">{length}</div>
          </T.ReviewOpenBtn>
          <T.HeartBtn
            onClick={contentLike}
            data-iscontentliked={isContentLiked}
          >
            {isContentLiked ? <SvgHeartFill /> : <SvgHeartPath />}
            <div>Like</div>
          </T.HeartBtn>
        </T.ButtonWrap>
        {isOpen === true ? (
          <T.ReviewWrap>
            <p>댓글 {length}</p>
            <T.ReviewList>
              {comment &&
                comment.map((el, index) => {
                  return (
                    el !== undefined && (
                      <T.Review Key={index}>
                        <img src={profile1} alt="프로필" />
                        <T.ReplyFlex>
                          <T.ReviewInfo>
                            <div className="flex1">
                              <div>
                                <div>{el.username}</div>
                                <div>작성된 날짜</div>
                              </div>
                              {userId === el.username && (
                                <T.ReviewEditBtn>
                                  <button onClick={editReview} id={index}>
                                    {isReviewEdit === false ? '수정' : '저장'}
                                  </button>
                                  <button onClick={deleting} id={index}>
                                    {isReviewEdit === false ? '삭제' : '취소'}
                                  </button>
                                </T.ReviewEditBtn>
                              )}
                            </div>
                            <div>
                              {isReviewEdit === true &&
                              userId === el.username ? (
                                <textarea
                                  onChange={(e) =>
                                    localStorage.setItem(
                                      'editedReview',
                                      e.target.value,
                                    )
                                  }
                                ></textarea>
                              ) : (
                                <div>
                                  <p>{el.content}</p>
                                  <button
                                    onClick={() => {
                                      setOpenReviewIndex(index);
                                    }}
                                    className="reply-btn"
                                    id={index}
                                  >
                                    답글달기 {<BottomErrow />}
                                  </button>
                                </div>
                              )}
                            </div>
                            {openReviewIndex === index ? (
                              <T.WriteReReview>
                                <div>
                                  <img src={profile3} alt="대댓글 프로필" />
                                  <p>{userId}</p>
                                </div>
                                <textarea
                                  onChange={(e) =>
                                    localStorage.setItem(
                                      'reply',
                                      e.target.innerText,
                                    )
                                  }
                                  placeholder="댓글을 입력하세요"
                                />
                                <button onClick={() => postReply()}>
                                  등록
                                </button>
                              </T.WriteReReview>
                            ) : null}
                          </T.ReviewInfo>
                          {el.reply && (
                            <T.Reply>
                              <T.ReplyContent>
                                <img src={profile2} alt="프로필" />
                                <div>
                                  <div>{el.reply.username}</div>
                                  <div>작성된 날짜</div>
                                  <p>{el.reply.content}</p>
                                </div>
                              </T.ReplyContent>
                              {userId === el.reply.username && (
                                <T.ReviewEditBtn>
                                  <button
                                    onClick={deleting}
                                    className="reply"
                                    id={index}
                                  >
                                    삭제
                                  </button>
                                </T.ReviewEditBtn>
                              )}
                            </T.Reply>
                          )}
                        </T.ReplyFlex>
                      </T.Review>
                    )
                  );
                })}
            </T.ReviewList>
            <T.WriteReview>
              <div>
                <img src={profile3} alt="댓글 프로필" />
                <p>{localStorage.getItem('userId')}</p>
              </div>
              <textarea placeholder="댓글을 입력하세요" />
              <button onClick={() => console.log('리뷰등록')}>등록</button>
            </T.WriteReview>
          </T.ReviewWrap>
        ) : null}
      </T.Body>

      <Footer />
    </T.DetailEntire>
  );
};

export default ComDetailMock;
