/* eslint-disable react/prop-types */
import { useState } from 'react';
import * as T from './ComDetailStyle';
import { PostAnswer, PostComment } from '../../utils/API';

const CreateAnswer = ({ className }) => {
  const [writeValue, setWriteValue] = useState();

  console.log(writeValue);

  const answerPost = (e) => {
    console.log(e);
    if (e === 'board-focusing') {
      PostAnswer(writeValue);
    } else if (e === 'focusing-answer') {
      PostComment(writeValue);
    }
  };

  return (
    <T.CreateAnswerForm>
      <T.AnswerCratorInfo>
        <T.CreatorImg
          src="current user img"
          alt="current user img"
        ></T.CreatorImg>
        <T.Description>
          <p>current user nickname</p>
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
        등록하기
      </T.AnswerPost>
    </T.CreateAnswerForm>
  );
};

export default CreateAnswer;
