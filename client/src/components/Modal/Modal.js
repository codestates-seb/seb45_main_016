/* eslint-disable react/prop-types */
import { SvgModalHeart } from '../../utils/svg';
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
