/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import * as T from './AnswerForm.Style';
import {
  DeleteAnswerlist,
  EditAnswerlist,
  EditCommentlist,
  DeleteCommentlist,
} from '../../utils/API';

const AnswerForm = ({
  img,
  name,
  email,
  modifiedAt,
  content,
  answerId,
  commentId,
  className,
  id,
  timeChange,
}) => {
  const [isAnswerEditOpen, setAnswerEditOpen] = useState(false);
  const [writeValue, setWriteValue] = useState(content);

  const memberId = Number(localStorage.getItem('memberId'));

  const clickEdit = (e) => {
    if (e.target.className === 'answer') {
      setAnswerEditOpen(true);
    } else if (e.target.className === 'comment') {
      setAnswerEditOpen(true);
    }
  };

  const saveEdit = (e) => {
    if (e === 'answer') {
      EditAnswerlist(writeValue, answerId);
    } else if (e === 'comment') {
      EditCommentlist(writeValue, answerId, commentId);
    }

    setAnswerEditOpen(false);
  };

  const deleteAnswer = (e) => {
    if (e === 'answer') {
      DeleteAnswerlist(answerId);
      console.log('답글삭제');
    } else if (e === 'comment') {
      DeleteCommentlist(answerId, commentId);
      console.log('답글삭제');
    }
  };

  return (
    <T.AnswerForm classname={className}>
      {id === memberId && (
        <T.AnswerEditBtn>
          {!isAnswerEditOpen ? (
            <>
              <button className={className} onClick={clickEdit}>
                수정
              </button>
              <button
                className={className}
                onClick={(e) =>
                  deleteAnswer(
                    e.target.classList[e.target.classList.length - 1],
                  )
                }
              >
                삭제
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setAnswerEditOpen(false)}>취소</button>
              <button
                className={className}
                onClick={(e) =>
                  saveEdit(e.target.classList[e.target.classList.length - 1])
                }
              >
                저장
              </button>
            </>
          )}
        </T.AnswerEditBtn>
      )}

      {isAnswerEditOpen ? (
        <T.AnswerEditArea
          onChange={(e) => setWriteValue(e.target.value)}
          defaultValue={content}
        ></T.AnswerEditArea>
      ) : (
        content && (
          <T.Answer>
            <T.AnswerCreatorImg>
              <img src={img} alt="answer_creator_image" />
            </T.AnswerCreatorImg>
            <T.AnswerDesCription>
              <p>
                {name} / {email}
              </p>
              <p>{className === 'answer' && timeChange(modifiedAt)}</p>
              <div>{writeValue}</div>
            </T.AnswerDesCription>
          </T.Answer>
        )
      )}
    </T.AnswerForm>
  );
};

export default AnswerForm;
