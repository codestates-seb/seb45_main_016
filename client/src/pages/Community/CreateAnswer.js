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
  const [isPosted, setPosted] = useState(false);
  const memberId = localStorage.getItem('memberId');
  const img = localStorage.getItem('profileImg');


  const answerPost = (e) => {
    if (e === 'board-focusing' && isPosted === false) {
      PostAnswer(writeValue).then(() => answerAppender());
      setPosted(true);
    } else if (e === 'focusing-answer' && isPosted === false) {
      PostComment(writeValue);
      setPosted(true);
    }
  };

  const valueHandler = (e) => {
    if (isPosted === true) {
      e.target.value = '';
      setPosted(false);
    } else {
      setWriteValue(e.target.value);
    }
  };

  return (
    <>
      {memberId ? (
        <T.CreateAnswerForm>
          <T.AnswerCratorInfo>
            <T.CreatorImg src={img} alt="current user img"></T.CreatorImg>
            <T.Description>
              <p>{localStorage.getItem('name')}</p>
            </T.Description>
          </T.AnswerCratorInfo>
          <textarea
            placeholder="댓글을 입력하세요"
            onChange={valueHandler}
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
      ) : null}
    </>

  );
};

export default CreateAnswer;
