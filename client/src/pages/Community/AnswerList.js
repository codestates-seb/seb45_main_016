/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import AnswerForm from './AnswerForm';
import * as T from './AnswerList.Style';
import { BottomErrow } from '../../utils/svg';
import CreateAnswer from './CreateAnswer';

const AnswerList = ({ answers, commentsLength, timeChange }) => {
  const [answer, setAnswers] = useState([...answers]);
  const [isAnswerIndex, setAnswerIndex] = useState();
  const [isCreateCommentBoxOpen, setCreateCommentBoxOpen] = useState(false);
  useEffect(() => setAnswers([...answers]), []);

  const memberId = localStorage.getItem('memberId');

  const openControl = (index) => {
    setAnswerIndex(index);

    if (isCreateCommentBoxOpen === false) {
      setCreateCommentBoxOpen(true);
    } else if (isCreateCommentBoxOpen === true) {
      setCreateCommentBoxOpen(false);
      setAnswerIndex(null);
    }
  };

  let length = answer.length;

  // let comment = answers.map((el)=>el.comments.map((el)=>{}))

  const buttonControl = (index, ans) => {
    openControl(index);
    localStorage.setItem('answerId', ans.answerId);
  };

  return (
    <T.AnswerLists>
      <p>댓글 {length + commentsLength}</p>
      {answer.map((ans, index) => (
        <div key={ans.answerId}>
          <AnswerForm
            img={ans.answerCreator.profileImage}
            name={ans.answerCreator.name}
            email={ans.answerCreator.email}
            modifiedAt={ans.modifiedAt}
            content={ans.content}
            answerId={ans.answerId}
            comments={ans.comments}
            className="answer"
            id={ans.answerCreator.memberId}
            length={length}
            timeChange={timeChange}
          />
          {ans.comments.map((comment, index) => {
            return (
              <AnswerForm
                index={index}
                key={comment.commentId}
                img={comment.commentCreator.profileImage}
                name={comment.commentCreator.name}
                email={comment.commentCreator.email}
                content={comment.content}
                commentId={comment.commentId}
                answerId={ans.answerId}
                comments={comment.comments}
                className="comment"
                id={comment.commentCreator.memberId}
                length={length}
              />
            );
          })}
          {/* <AnswerForm
            img={ans.answerCreator.profileImage}
            name={ans.answerCreator.name}
            modifiedAt={ans.modifiedAt}
            content={ans.content}
            answerId={ans.answerId}
            comments={ans.comments}
            className="answer"
            id={ans.answerCreator.memberId}
            length={length}
          /> */}
          {memberId &&
            (isCreateCommentBoxOpen ? (
              <T.OpenCreateAnwerArea onClick={() => openControl(index)}>
                취소
              </T.OpenCreateAnwerArea>
            ) : (
              <T.OpenCreateAnwerArea onClick={() => buttonControl(index, ans)}>
                답글달기 <BottomErrow />
              </T.OpenCreateAnwerArea>
            ))}
          {isAnswerIndex === index && (
            <CreateAnswer className="focusing-answer" />
          )}
        </div>
      ))}
    </T.AnswerLists>
  );
};

export default AnswerList;
