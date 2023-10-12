import styled from 'styled-components';
import globaltoken from '../../styles/global.json';

const { Gray } = globaltoken;

export const AnswerLists = styled.div`
  color: ${Gray['600'].value};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-bottom: 1px solid ${Gray['300'].value};
  p {
    margin-bottom: 1.3%;
  }
`;

export const OpenCreateAnwerArea = styled.button`
  display: flex;
  flex-direction: row;
  margin: 0 0 0 10%;
  background-color: transparent;
  border: none;
  margin-bottom: 4%;
  color: ${Gray['400'].value};
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 12px */
  align-items: center;
  cursor: pointer;
`;

export const CommentForm = styled.div``;
