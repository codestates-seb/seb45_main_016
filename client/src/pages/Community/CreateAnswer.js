/* eslint-disable react/prop-types */
import { useState } from 'react';
import * as T from './CreateAnswer.Style';
import jwt_decode from 'jwt-decode';
import { PostAnswer, PostComment } from '../../utils/API';

const token = localStorage.getItem('authorization');
let img;
if (token) {
  img = jwt_decode(token).profileImage;
} else {
  img = '';
}

const CreateAnswer = ({ className, answerAppender }) => {
  const [writeValue, setWriteValue] = useState('');

  const answerPost = (e) => {
    if (e === 'board-focusing') {
      PostAnswer(writeValue).then(() => answerAppender());
    } else if (e === 'focusing-answer') {
      PostComment(writeValue);
      console.log(e);
    }
  };

  return (
    <T.CreateAnswerForm>
      <T.AnswerCratorInfo>
        <T.CreatorImg src={img} alt="current user img"></T.CreatorImg>
        <T.Description>
          <p>{localStorage.getItem('name')}</p>
          <p>current user email</p>
        </T.Description>
      </T.AnswerCratorInfo>
      <textarea
        placeholder="댓글을 입력하세요"
        onChange={(e) => setWriteValue(e.target.value)}
      ></textarea>
      <T.AnswerPost
        className={className}
        onClick={(e) =>
          answerPost(e.target.classList[e.target.classList.length - 1])
        }
      >
        등록
      </T.AnswerPost>
    </T.CreateAnswerForm>
  );
};

export default CreateAnswer;
