/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import AnswerForm from './AnswerForm';
import * as T from './AnswerList.Style';
import { BottomErrow } from '../../utils/svg';
import CreateAnswer from './CreateAnswer';

const AnswerList = ({ board }) => {
  const [answers, setAnswers] = useState([...board.answers]);
  const [isAnswerIndex, setAnswerIndex] = useState();
  const [isCreateCommentBoxOpen, setCreateCommentBoxOpen] = useState(false);
  useEffect(() => setAnswers([...board.answers]), []);

  const openControl = (index) => {
    setAnswerIndex(index);

    if (isCreateCommentBoxOpen === false) {
      setCreateCommentBoxOpen(true);
    } else if (isCreateCommentBoxOpen === true) {
      setCreateCommentBoxOpen(false);
      setAnswerIndex(null);
    }
  };

  let length = answers.length;

  // let comment = answers.map((el)=>el.comments.map((el)=>{}))

  return (
    <T.AnswerLists>
      <p>댓글 {length}</p>
      {answers.map((ans, index) => (
        <div key={ans.answerId}>
          <AnswerForm
            img={ans.answerCreator.profileImage}
            name={ans.answerCreator.name}
            modifiedAt={ans.modifiedAt}
            content={ans.content}
            answerId={ans.answerId}
            className="answer"
            id={ans.answerCreator.memberId}
            length={length}
          ></AnswerForm>
          {isCreateCommentBoxOpen ? (
            <T.OpenCreateAnwerArea onClick={() => openControl(index)}>
              취소
            </T.OpenCreateAnwerArea>
          ) : (
            <T.OpenCreateAnwerArea onClick={() => openControl(index)}>
              답글달기 <BottomErrow />
            </T.OpenCreateAnwerArea>
          )}

          {isAnswerIndex === index && (
            <CreateAnswer className="focusing-answer" />
          )}
          {/* {ans.comments &&
            ans.comments.map((comment) => {
              <AnswerForm
                key={comment.commentId}
                img={comment.commentCreator.profileImage}
                name={comment.commentCreator.name}
                modifiedAt={comment.modifiedAt}
                content={comment.content}
                commentId={comment.commentId}
                className="comment"
                id={comment.commentCreator.memberID}
              ></AnswerForm>;
            })}
          {console.log(comments)} */}
        </div>
      ))}
    </T.AnswerLists>
  );
};

export default AnswerList;
