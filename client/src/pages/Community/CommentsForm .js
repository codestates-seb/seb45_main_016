/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import * as T from './CommentForm.Style';
import { EditCommentlist, DeleteCommentlist } from '../../utils/API';

const CommentForm = ({ comments, answerId }) => {
  const [isCommentEditOpen, setCommentEditOpen] = useState(false);
  const [writeValue, setWriteValue] = useState(comments);

  const memberId = localStorage.getItem('memberId');

  useEffect(() => setWriteValue(comments), []);

  const clickEdit = () => {
    localStorage.setItem('answerId', answerId);
    setCommentEditOpen(true);
  };

  const saveEdit = () => {
    EditCommentlist(writeValue);

    setCommentEditOpen(false);
  };

  const deleteComment = async () => {
    await DeleteCommentlist();
  };

  return (
    <div>
      {comments.map((comment) => {
        <T.CommentForm>
          {comment.commentCreator.memberId === memberId && (
            <T.CommentEditBtn>
              {!isCommentEditOpen ? (
                <>
                  <button onClick={clickEdit}>수정</button>
                  <button onClick={() => deleteComment()}>삭제</button>
                </>
              ) : (
                <>
                  <button onClick={() => setCommentEditOpen(false)}>
                    취소
                  </button>
                  <button onClick={() => saveEdit()}>저장</button>
                </>
              )}
            </T.CommentEditBtn>
          )}

          {isCommentEditOpen ? (
            <T.CommentEditArea
              onChange={(e) => setWriteValue(e.target.value)}
            ></T.CommentEditArea>
          ) : (
            <T.Comment>
              <T.CommentCreatorImg>
                <img
                  src={comment.commentCreator.profileIamge}
                  alt="Comment_creator_image"
                />
              </T.CommentCreatorImg>
              <T.CommentDesCription>
                <p>{comment.commentCreator.name}</p>
                <p>{comment.modifiedAt}</p>
                <div>{writeValue}</div>
              </T.CommentDesCription>
            </T.Comment>
          )}
        </T.CommentForm>;
      })}
    </div>
  );
};

export default CommentForm;
