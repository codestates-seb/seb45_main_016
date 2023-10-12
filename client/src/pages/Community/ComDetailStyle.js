import styled from 'styled-components';
import globaltoken from '../../styles/global.json';

const { Gray, Primary } = globaltoken;

export const ComDetailWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BoardHeadWrap = styled.div`
  padding: 8.5% 0 3.5%;
  border-bottom: 1px solid ${Gray['300'].value};
`;

export const BoardEditBtnWrap = styled.div`
  margin-bottom: 4%;
  margin-left: 93%;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const BoardTitle = styled.p`
  color: ${Gray['600'].value};
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
`;

export const BoardCreatorInfo = styled.div`
  margin: 7.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InfoImgWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  img {
    width: 40px;
    height: 40px;
  }
`;

export const InfoDescription = styled.div`
  width: 100%;
  color: ${Gray['600'].value};
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  margin-top: 2%;
  :nth-child(2) {
    margin-left: 2%;
  }
`;

export const BoardBodyWrap = styled.div`
  padding: 7% 20% 0;
`;

export const BoardContent = styled.p`
  border-bottom: 1px solid ${Gray['300'].value};
  padding-bottom: 6%;
  color: ${Gray['600'].value};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const BoardContentBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8%;
  justify-content: space-between;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    padding: 1.3% 1.8%;
  }
`;

export const OpenAnswerBtn = styled.button`
  width: 12%;
  border: 1px solid
    ${(props) => (props['data-isopen'] ? Gray['700'].value : Gray['400'].value)};
  border-radius: 1000px;
  cursor: pointer;
  p {
    color: ${(props) =>
      props['data-isopen'] ? Gray['600'].value : Gray['400'].value};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
  }
  svg {
    path {
      fill: ${(props) =>
        props['data-isopen'] ? Gray['600'].value : Gray['400'].value};
    }
  }
  .amount {
    color: ${(props) =>
      props['data-isopen']
        ? Primary['Default'].value
        : Primary['Lighten-1'].value};
    font-size: 16px;
    font-style: normal;
    font-weight: ${(props) => (props['data-isopen'] ? 700 : 400)};
    line-height: normal;
  }
  &:hover {
    border: 1px solid ${Gray['700'].value};
    p {
      color: ${Gray['600'].value};
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin: 0;
    }
    svg {
      path {
        fill: ${Gray['600'].value};
      }
    }
    .amount {
      color: ${Primary['Default'].value};
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
`;
export const HeartBtn = styled.button`
  border: 1px solid
    ${(props) => (props['data-liked'] ? Gray['700'].value : Gray['400'].value)};
  border-radius: 1000px;
  cursor: pointer;
  p {
    color: ${(props) =>
      props['data-liked'] ? Gray['600'].value : Gray['400'].value};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
  }
  &:hover {
    border: 1px solid ${Gray['700'].value};
    p {
      color: ${Gray['600'].value};
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin: 0;
    }
  }
`;
