import { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
// import { API } from '../../utils/API';

import * as T from './ComDetailStyle';
import { useNavigate } from 'react-router-dom';

const ComDetail = () => {
  const [isOpen, setOpen] = useState(false);
  const [isReplyOpen, setReplyOpen] = useState(false);
  const [isReviewEdit, setReviewEdit] = useState(false);
  const navigator = useNavigate();

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
    navigator('/edit/{현재게시글 고유번호}');
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
    } else if (e.target.innerText === 'x') {
      // API(url, method);
      console.log('해당 대댓글을 삭제합니다');
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
      // API(url, method);
      console.log('댓글 수정을 완료합니다');
    }
  };

  return (
    <T.DetailEntire>
      <Header />
      <T.Title>
        <T.EditBtn>
          <button onClick={editContent}>
            <img src="" alt="수정아이콘" />
          </button>
          <button onClick={deleting} name="content">
            <img src="" alt="삭제아이콘" />
          </button>
        </T.EditBtn>
        <p>[후기]</p>
        <p>정보처리기사 필기 합격 꿀팁 전수합니다.</p>
        <T.ImgWrap>
          <img src="" alt="이미지" />
        </T.ImgWrap>
        <div>
          <span>user nickname</span>
          <span>작성일 들어갈 곳</span>
        </div>
      </T.Title>
      <T.Body>
        <T.Content>
          <p>
            꿀팁 내용입니다 저는 이런 유튜브 보고 공부했고여 책은 이거 추천합
            니다 어쩌고 저쩌고
          </p>
          <p>
            계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 나는 무엇인지
            그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어
            버리었읍니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 계절이
            지나가는 하늘에는 가을로 가득 차 있습니다. 소학교 때 책상을 같이
            했던 아이들의 이름과 패, 경, 옥 이런 이국소녀들의 이름과 벌써 아기
            어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기,
            강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런
            시인의 이름을 불러 봅니다.
          </p>
          <p>
            그러나, 겨울이 지나고 나의 별에도 봄이 오면, 무덤 위에 파란 잔디가
            피어나듯이 내 이름자 묻힌 언덕 위에도 자랑처럼 풀이 무성할 거외다.
            가슴 속에 하나 둘 새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이
            오는 까닭이요, 내일 밤이 남은 까닭이요, 아직 나의 청춘이 다하지 않은
            까닭입니다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내
            이름자를 써보고 흙으로 덮어 버리었읍니다. 가슴 속에 하나 둘 새겨지는
            별을 이제 다 못 헤는 것은 쉬이 아침이 오는 까닭이요, 내일 밤이 남은
            까닭이요, 아직 나의 청춘이 다하지 않은 까닭입니다.
          </p>
          <p>
            나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를
            써보고 흙으로 덮어 버리었읍니다. 계절이 지나가는 하늘에는 가을로
            가득 차 있습니다. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 별
            하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과
            별 하나에 시와 별 하나에 어머니, 어머니, 어머님, 나는 별 하나에
            아름다운 말 한 마디씩 불러 봅니다. 그러나, 겨울이 지나고 나의 별에도
            봄이 오면, 무덤 위에 파란 잔디가 피어나듯이 내 이름자 묻힌 언덕
            위에도 자랑처럼 풀이 무성할 거외다.
          </p>
          어머님, 그리고 당신은 멀리 북간도에 계십니다. 나는 무엇인지 그리워 이
          많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어
          버리었읍니다. 그러나, 겨울이 지나고 나의 별에도 봄이 오면, 무덤 위에
          파란 잔디가 피어나듯이 내 이름자 묻힌 언덕 위에도 자랑처럼 풀이 무성할
          거외다. 소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런
          이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한 이웃
          사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너
          마리아 릴케 이런 시인의 이름을 불러 봅니다.
        </T.Content>
        <T.ButtonWrap>
          <button onClick={openReview}>
            <img src="" alt="댓글이미지" />
            <span>댓글</span>
            <span>{/* 입력된 댓글 수 */}</span>
          </button>
          <button>❤️ {/*하트 눌린 수*/}</button>
        </T.ButtonWrap>
        {isOpen === true ? (
          <T.ReviewWrap>
            <p>댓글 {/* 작성된 댓글 수 */}</p>
            <T.ReviewList>
              {/* 댓글 정보 매핑 */}
              <img src="" alt="프로필" />
              <div>
                <div>user nickname</div>
                <div>작성된 날짜</div>
                {isReviewEdit === false ? (
                  <div>꿀팁 전수 감사합니다.{/* 작성된 댓글 내용 */}</div>
                ) : (
                  <textarea></textarea>
                )}
                <button onClick={openReply}>답글달기</button>

                <T.Reply>
                  {/* 대댓글 정보가 있을 경우 렌더 되도록 한다 */}
                  <T.WrittenReply>
                    <img src="" alt="프로필" />
                    <div>
                      <div>user nickname</div>
                      <div>작성된 날짜</div>
                      <div>꿀팁 전수 감사합니다.{/* 작성된 대댓글 내용 */}</div>
                    </div>
                  </T.WrittenReply>

                  {isReplyOpen === true ? (
                    <T.WriteReview>
                      <div>
                        <img src="" alt="대댓글 프로필" />
                        <span>user nickname</span>
                      </div>
                      <input placeholder="댓글을 입력하세요" />
                      <button onClick={postReview}>등록</button>
                    </T.WriteReview>
                  ) : null}
                  <button onClick={deleting}>x</button>
                </T.Reply>
              </div>
              {/* 현재 로그인 된 아이디와 작성자 아이디가 같고, 해당 정보가 존재한다면 버튼 띄우기 */}
              <T.ReviewEditBtn>
                <button onClick={editReview}>
                  {isReviewEdit === false ? '수정' : '저장'}
                </button>
                <button onClick={deleting}>
                  {isReviewEdit === false ? '삭제' : '취소'}
                </button>
              </T.ReviewEditBtn>
            </T.ReviewList>
            <T.WriteReview>
              <div>
                <img src="" alt="대댓글 프로필" />
                <span>user nickname</span>
              </div>
              <input placeholder="댓글을 입력하세요" />
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
