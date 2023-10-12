import styled from 'styled-components';
import globaltoken from '../../styles/global.json';

const { Gray } = globaltoken;

export const CreateAnswerForm = styled.div`
  margin: 5% 0 5% 10%;
  border: 1px solid ${Gray['300'].value};
  border-radius: 10px;
  width: 70%;
  padding: 4%;
  textarea {
    width: 90%;
    padding: 7% 0 0 10%;
    resize: none;
    border: none;
    outline: none;
  }
`;

export const AnswerCratorInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CreatorImg = styled.img`
  margin-right: 2%;
  width: 40px;
  height: 40px;
  background-color: pink;
  border-radius: 100px;
`;

export const Description = styled.div`
  p {
    color: ${Gray['500'].value};
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 12px */
    margin: 0;
  }
`;

export const AnswerPost = styled.button`
  margin: 0 0 0 90%;
  background-color: transparent;
  border: 1px solid ${Gray['400'].value};
  border-radius: 100px;
  padding: 1% 1.5%;
  color: ${Gray['500'].value};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;
