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
  Table,
} from './ModalStyle';

const Modal = ({ setModalOpen, name, date }) => {
  const allDate = [...date, {}];
  let newdata = [];

  allDate.reduce((a, b) => {
    if (a.implSeq === b.implSeq) {
      return { ...a, docRegEndDt: b.docRegEndDt };
    } else {
      newdata.push(a);
      return b;
    }
  });

  console.log(newdata);

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
          <Name>{name}</Name>
          <Table>
            <thead className=".jIWcno">
              <tr>
                <td></td>
                {newdata.map((info, index) => {
                  return <th key={index}>{info.implSeq}회차</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <p>
                  필기 시험 원서 접수 기간
                  <br />
                  (추가 접수일 포함)
                </p>
                {newdata.map((info, index) => {
                  return (
                    <td key={index}>
                      {info.docRegStartDt}~{info.docRegEndDt}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <p>필기 시험 일자</p>
                {newdata.map((info, index) => {
                  return (
                    <td key={index}>
                      {info.docExamStartDt}~{info.docExamEndDt}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <p>필기 합격 예정자 발표</p>
                {newdata.map((info, index) => {
                  return <td key={index}>{info.docPassDt}</td>;
                })}
              </tr>
              <tr>
                <p>실기 시험 원서 접수 기간</p>
                {newdata.map((info, index) => {
                  return (
                    <td key={index}>
                      {info.pracRegStartDt}~{info.pracRegEndDt}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <p>실기 시험 일자</p>
                {newdata.map((info, index) => {
                  return (
                    <td key={index}>
                      {info.pracExamStartDt}~{info.pracExamEndDt}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <p>실기 시험 합격자 발표</p>
                {newdata.map((info, index) => {
                  return <td key={index}>{info.pracPassDt}</td>;
                })}
              </tr>
            </tbody>
          </Table>
          <p>{newdata[0].description}</p>
        </Content>
      </ModalStyle>
    </>
  );
};

export default Modal;
