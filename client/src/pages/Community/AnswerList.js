/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import AnswerForm from './AnswerForm';
import * as T from './ComDetailStyle';
import { BottomErrow } from '../../utils/svg';
import CreateAnswer from './CreateAnswer';

const AnswerList = ({ board }) => {
  const [answer, setAnswer] = useState([]);
  const [isAnswerIndex, setAnswerIndex] = useState();
  const [isCreateCommentBoxOpen, setCreateCommentBoxOpen] = useState(false);
  useEffect(() => setAnswer([...board.answers]), [...board.answers]);

  console.log(answer);

  localStorage.setItem('answerLength', answer.length);

  const openControl = (index) => {
    setAnswerIndex(index);

    if (isCreateCommentBoxOpen === false) {
      setCreateCommentBoxOpen(true);
    } else if (isCreateCommentBoxOpen === true) {
      setCreateCommentBoxOpen(false);
      setAnswerIndex(null);
    }
  };

  console.log(isCreateCommentBoxOpen);

  return (
    <T.AnswerLists>
      <p>댓글 {answer.length}</p>
      {answer.map((answer, index) => (
        <div key={answer.answerId}>
          <AnswerForm
            img={answer.profileImage}
            name={answer.answerCreater.name}
            modifiedAt={answer.modifiedAt}
            content={answer.content}
          ></AnswerForm>
          <T.CreateAnwer onClick={() => openControl(index)}>
            답글달기 <BottomErrow />
          </T.CreateAnwer>
          {isAnswerIndex === index && <CreateAnswer />}
          {answer.comments.map((comment) => {
            <AnswerForm
              key={comment.answerId}
              img={comment.profileImage}
              name={comment.commentCreater.name}
              modifiedAt={comment.modifiedAt}
              content={comment.content}
            ></AnswerForm>;
          })}
        </div>
      ))}
    </T.AnswerLists>
  );
};

export default AnswerList;
