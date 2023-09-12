/* eslint-disable react/prop-types */
import Bookmark from '../Bookmark/Bookmark';
import {
  ModalStyle,
  Content,
  Background,
  Name,
  CloseBtn,
  ButtonWrap,
  Grid,
} from './ModalStyle';

const Modal = ({ setModalOpen }) => {
  return (
    <>
      <Background onClick={() => setModalOpen(false)}></Background>
<<<<<<< Updated upstream
      <ButtonWrap>
        <CloseBtn onClick={() => setModalOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <g clipPath="url(#clip0_178_11674)">
              <path
                d="M24.4 7.61333C23.88 7.09333 23.04 7.09333 22.52 7.61333L16 14.12L9.47996 7.59999C8.95996 7.07999 8.11996 7.07999 7.59996 7.59999C7.07996 8.11999 7.07996 8.95999 7.59996 9.47999L14.12 16L7.59996 22.52C7.07996 23.04 7.07996 23.88 7.59996 24.4C8.11996 24.92 8.95996 24.92 9.47996 24.4L16 17.88L22.52 24.4C23.04 24.92 23.88 24.92 24.4 24.4C24.92 23.88 24.92 23.04 24.4 22.52L17.88 16L24.4 9.47999C24.9066 8.97333 24.9066 8.11999 24.4 7.61333Z"
                fill="#757575"
              />
            </g>
            <defs>
              <clipPath id="clip0_178_11674">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </CloseBtn>
        <Bookmark />
      </ButtonWrap>
      <Content>
        <Name>자격증 이름</Name>
        <div className="date">3회</div>
        <Grid>
          <div>
            <p>원서접수 기간</p>
            <p className="date">날짜</p>
          </div>
          <div>
            <p>필기시험 일자</p>
            <p className="date">날짜</p>
          </div>
          <div>
            <p>필기시험 합격(예정)자 발표</p>
            <p className="date">날짜</p>
          </div>
          <div>
            <p>
              응시자격 서류제출 및 <br />
              필기 시험 합격자 결정 기간
            </p>
            <p className="date">날짜</p>
          </div>
          <div>
            <p>면접시험 원서 접수 기간</p>
            <p className="date">날짜</p>
          </div>
          <div>
            <p>면접시험 기간</p>
            <p className="date">날짜</p>
          </div>
        </Grid>
=======
      <ModalStyle>
        <ButtonWrap>
          <CloseBtn onClick={() => setModalOpen(false)}>
            <SvgModalHeart />
          </CloseBtn>
          <Bookmark />
        </ButtonWrap>
        <Content>
          <Name>자격증 이름</Name>
          <div className="date">3회</div>
          <Grid>
            <div>
              <p>원서접수 기간</p>
              <p className="date">날짜</p>
            </div>
            <div>
              <p>필기시험 일자</p>
              <p className="date">날짜</p>
            </div>
            <div>
              <p>필기시험 합격(예정)자 발표</p>
              <p className="date">날짜</p>
            </div>
            <div>
              <p>
                응시자격 서류제출 및 <br />
                필기 시험 합격자 결정 기간
              </p>
              <p className="date">날짜</p>
            </div>
            <div>
              <p>면접시험 원서 접수 기간</p>
              <p className="date">날짜</p>
            </div>
            <div>
              <p>면접시험 기간</p>
              <p className="date">날짜</p>
            </div>
          </Grid>
>>>>>>> Stashed changes

          <div></div>
          <div>
            <p>최종 합격자 발표</p>
            <p className="date">날짜</p>
          </div>
        </Content>
      </ModalStyle>
    </>
  );
};

export default Modal;
