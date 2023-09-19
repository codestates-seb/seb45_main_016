import styled from 'styled-components';
import globaltoken from '../../styles/global.json';

const { Gray } = globaltoken;

export const AnswerForm = styled.div`
  border-top: 1px solid ${Gray['300'].value};
  padding: 4%;
  padding-left: ${(props) => (props['classname'] === 'comment' ? '60px' : 0)};
`;

export const AnswerEditBtn = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 90%;
  button {
    color: ${Gray['400'].value};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const AnswerEditArea = styled.textarea`
  width: 90%;
  border: 1px solid ${Gray['300'].value};
  border-radius: 5px;
  resize: none;
`;

export const Answer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 3%;
`;

export const AnswerCreatorImg = styled.div`
  margin-right: 2%;
  width: 40px;
  height: 40px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 100px;
  }
`;

export const AnswerDesCription = styled.div`
  color: ${Gray['500'].value};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 12px */

  p {
    margin: 0;
  }

  div {
    color: ${Gray['600'].value};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-top: 6%;
  }
`;
