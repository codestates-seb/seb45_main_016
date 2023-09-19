/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
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
  modifiedAt,
  content,
  answerId,
  commentId,
  className,
  id,
}) => {
  const [isAnswerEditOpen, setAnswerEditOpen] = useState(false);
  const [writeValue, setWriteValue] = useState(content);

  const memberId = Number(localStorage.getItem('memberId'));

  useEffect(() => setWriteValue(content), []);

  const clickEdit = (e) => {
    if (e.target.className === 'answer') {
      setAnswerEditOpen(true), localStorage.setItem('answerId', answerId);
    } else if (e.target.className === 'comment') {
      setAnswerEditOpen(true), localStorage.setItem('commentId', commentId);
    }
  };

  const saveEdit = (e) => {
    if (e === 'answer') {
      EditAnswerlist(writeValue);
    } else if (e === 'comment') {
      EditCommentlist(writeValue);
    }

    setAnswerEditOpen(false);
  };

  const deleteAnswer = async (e) => {
    if (e === 'answer') {
      localStorage.setItem('answerId', answerId);
      await DeleteAnswerlist();
      console.log('답글삭제');
    } else if (e === 'commnet') {
      localStorage.setItem('commentId', commentId);
      await DeleteCommentlist();
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
        ></T.AnswerEditArea>
      ) : (
        content && (
          <T.Answer>
            <T.AnswerCreatorImg>
              <img src={img} alt="answer_creator_image" />
            </T.AnswerCreatorImg>
            <T.AnswerDesCription>
              <p>{name}</p>
              <p>{modifiedAt}</p>
              <div>{writeValue}</div>
            </T.AnswerDesCription>
          </T.Answer>
        )
      )}
    </T.AnswerForm>
  );
};

export default AnswerForm;
