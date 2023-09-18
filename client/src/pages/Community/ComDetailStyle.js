import styled from 'styled-components';
import globaltoken from '../../styles/global.json';

const { Gray } = globaltoken;

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
  margin-top: 7.5%;
  text-align: center;
`;

export const BoardBodyWrap = styled.div`
  padding: 7% 20% 0;
`;

export const BoardContent = styled.p`
  border-bottom: 1px solid ${Gray['300'].value};
  padding-bottom: 6%;
`;

export const BoardContentBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8%;
  justify-content: space-between;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const AnswerLists = styled.div``;

export const AnswerForm = styled.div``;

export const AnswerEditBtn = styled.div`
  margin-left: 90%;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const AnswerEditArea = styled.textarea``;

export const Answer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AnswerCreatorImg = styled.div``;

export const AnswerDesCription = styled.div``;

export const OpenCreateAnwerArea = styled.button`
  margin: 0 0 0 10%;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const CreateAnswerForm = styled.div`
  margin: 5% 0 5% 10%;
  border: 1px solid ${Gray['300'].value};
  padding: 4%;
  textarea {
    width: 90%;
    padding: 5%;
    resize: none;
    border: none;
    outline: none;
  }
`;

export const AnswerCratorInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CreatorImg = styled.img``;

export const Description = styled.div``;

export const AnswerPost = styled.button`
  margin: 0 0 0 90%;
  background-color: transparent;
  border: none;
`;
