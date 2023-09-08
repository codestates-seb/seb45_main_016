/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
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
// import { API } from '../../utils/API';

import * as T from './ComDetailStyle';
import { useNavigate } from 'react-router-dom';

const ComDetail = () => {
  const [isOpen, setOpen] = useState(false);
  const [isReplyOpen, setReplyOpen] = useState(false);
  const [isReviewEdit, setReviewEdit] = useState(false);
  const [isContentLiked, setContentLiked] = useState(false);
  const [boardData, setBoardData] = useState({});

  const navigator = useNavigate();
  // const { param } = useParams();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(
        `https://e26f-182-211-13-193.ngrok-free.app${localStorage.getItem(
          'param',
        )}`,
        {
          headers: {
            'ngrok-skip-browser-warning': '2',
          },
        },
      )
      .then((res) => console.log(res.data))
      .then((res) => setBoardData(res.data));
  });

  const openReview = () => {
    if (isOpen === false) {
      setOpen(true);
    } else {
      setOpen(false);
      setReplyOpen(false);
    }
  };

  const openReply = () => {
    if (isReplyOpen === false) {
      setReplyOpen(true);
    } else {
      setReplyOpen(false);
    }
  };

  const editContent = () => {
    navigator(`/edit/${localStorage.getItem('param')}`);
    localStorage.setItem('contentNumber', 'api에서 받은 현재 게시글 번호');
  };

  const deleting = (e) => {
    // const method = 'delete';
    if (e.target.name === 'content') {
      console.log('데이터 베이스에서 해당 게시글을 삭제합니다');
      // API(url, method);
      navigator('/community');
    } else if (e.target.innerText === '삭제') {
      console.log('데이터 베이스에서 해당 댓글을 삭제합니다');
      // API(url, method);
    } else if (e.target.innerText === '취소') {
      setReviewEdit(false);
    }
  };

  const postReview = () => {
    // const method = 'post';
    // API(url, method);
    console.log('해당 댓글 or 대댓글을 등록 합니다.');
  };

  const editReview = () => {
    // const method = 'fetch';
    if (isReviewEdit === false) {
      setReviewEdit(true);
    } else {
      setReviewEdit(false);
      // API(url, method, body);
      console.log('댓글 수정을 완료합니다');
    }
  };

  const contentLike = () => {
    if (isContentLiked === false) {
      setContentLiked(true);
    } else {
      setContentLiked(false);
    }
  };

  return (
    <T.DetailEntire>
      <Header />
      <T.Top>
        {/* useId와 작성자 아이디가 일치할 경우로 수정해야 함 */}
        {userId && (
          <T.EditBtn>
            <button onClick={editContent}>
              <SvgEdit />
            </button>
            <button onClick={deleting} name="content">
              <SvgDelete />
            </button>
          </T.EditBtn>
        )}
        <T.Title>
          <p>[후기]</p>
          <p>{boardData.title}</p>;
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
          <p>{boardData.content}</p>
        </T.Content>
        <T.ButtonWrap>
          <T.ReviewOpenBtn onClick={openReview} data-isOpen={isOpen}>
            <SvgReview />
            <div className="btn-name">댓글</div>
            <div className="num">{/* 입력된 댓글 수 */}5</div>
          </T.ReviewOpenBtn>
          <T.HeartBtn
            onClick={contentLike}
            data-isContentLiked={isContentLiked}
          >
            {isContentLiked ? <SvgHeartFill /> : <SvgHeartPath />}
            <div>Like</div>
          </T.HeartBtn>
        </T.ButtonWrap>
        {isOpen === true ? (
          <T.ReviewWrap>
            <p>댓글 5{/* 작성된 댓글 수 */}</p>
            <T.ReviewList>
              {/* 댓글 정보 매핑 */}
              <T.Review>
                <img src={profile1} alt="프로필" />
                <T.ReplyFlex>
                  <T.ReviewInfo>
                    <div className="flex1">
                      <div>
                        <div>user nickname</div>
                        <div>작성된 날짜</div>
                      </div>
                      {/* 현재 로그인 된 아이디와 작성자 아이디가 같고, 해당 정보가 존재한다면 버튼 띄우기로 수정 */}
                      {userId && (
                        <T.ReviewEditBtn>
                          <button onClick={editReview}>
                            {isReviewEdit === false ? '수정' : '저장'}
                          </button>
                          <button onClick={deleting}>
                            {isReviewEdit === false ? '삭제' : '취소'}
                          </button>
                        </T.ReviewEditBtn>
                      )}
                    </div>
                    {isReviewEdit === false ? (
                      <div>
                        <p>꿀팁 전수 감사합니다.{/* 작성된 댓글 내용 */}</p>
                        <button onClick={openReply} className="reply-btn">
                          답글달기 {<BottomErrow />}
                        </button>
                      </div>
                    ) : (
                      <textarea></textarea>
                    )}

                    {isReplyOpen === true ? (
                      <T.WriteReReview>
                        <div>
                          <img src={profile3} alt="대댓글 프로필" />
                          <p>user nickname</p>
                        </div>
                        <textarea placeholder="댓글을 입력하세요" />
                        <button onClick={postReview}>등록</button>
                      </T.WriteReReview>
                    ) : null}
                  </T.ReviewInfo>
                  <T.Reply>
                    {/* 대댓글 정보가 있을 경우 렌더 되도록 한다 */}
                    <T.ReplyContent>
                      <img src={profile2} alt="프로필" />
                      <div>
                        <div>user nickname</div>
                        <div>작성된 날짜</div>
                        <p>꿀팁 전수 감사합니다.{/* 작성된 대댓글 내용 */}</p>
                      </div>
                    </T.ReplyContent>
                    <T.ReviewEditBtn>
                      {/* 현재 로그인 된 아이디와 작성자 아이디가 같고, 해당 정보가 존재한다면 버튼 띄우기로 수정 */}
                      <button onClick={deleting}>삭제</button>
                    </T.ReviewEditBtn>
                  </T.Reply>
                </T.ReplyFlex>
              </T.Review>
            </T.ReviewList>
            <T.WriteReview>
              <div>
                <img src={profile3} alt="댓글 프로필" />
                <p>user nickname</p>
              </div>
              <textarea placeholder="댓글을 입력하세요" />
              <button onClick={postReview}>등록</button>
            </T.WriteReview>
          </T.ReviewWrap>
        ) : null}
      </T.Body>

      <Footer />
    </T.DetailEntire>
  );
};

export default ComDetail;
