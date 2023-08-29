import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import {
  ButtonWrap,
  Content,
  DetailEntire,
  CardWrap,
  ReadReview,
  SendReview,
} from './ComDetailStyle';

const ComDetail = () => {
  return (
    <DetailEntire>
      <Header />
      <p>제목입니다.</p>
      <CardWrap>
        <img src="" alt="이미지" />
        <div>
          <p>nickname</p>
          <p>작성일 들어갈 곳</p>
        </div>
      </CardWrap>
      <div className="view-count">
        <span>조회 수</span>
        <span>13</span>
      </div>
      <Content>
        꿀팁 내용입니다. 저는 이런거 보고 공부했고여, 어쩌고 저쩌고
      </Content>
      <ButtonWrap>
        <div>추천해요</div>
        <input type="checkbox" />
        {/* 본인이 작성한 글일 경우 */}
        <button>수정</button>
        <button>삭제</button>
      </ButtonWrap>
      <SendReview>
        <p>댓글작성</p>
        <div className="review-input-wrap">
          <input placeholder="댓글 입력칸"></input>
          <button>등록하기</button>
        </div>
      </SendReview>
      <ReadReview>
        <p>댓글(3)</p>
        <div>
          <div>
            <CardWrap>
              <img src="" alt="이미지" />
              <div>
                <p>nickname</p>
                <p>작성일 들어갈 곳</p>
                <p>흠 저는 이렇게 하는게 더 좋은 것 같은데요</p>
              </div>
              {/* 본인이 작성한 글일 경우 */}
              <div>
                <button>수정</button>
                <button>삭제</button>
              </div>
            </CardWrap>
            <button>댓글달기</button>
          </div>
          {/* 등록된 대댓글이 있는 경우 */}
          <CardWrap>
            <img src="" alt="이미지" />
            <div>
              <p>nickname</p>
              <p>작성일 들어갈 곳</p>
              <div>그럼 님은 그러케 하세요</div>
            </div>
            <button>삭제</button>
          </CardWrap>
          {/* 대댓글 등록이 필요한 경우 */}
          <SendReview>
            <div className="review-input-wrap">
              <input placeholder="대댓글 입력칸"></input>
              <button>등록하기</button>
            </div>
          </SendReview>
        </div>
      </ReadReview>
      <Footer />
    </DetailEntire>
  );
};

export default ComDetail;
