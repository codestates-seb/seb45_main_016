/* eslint-disable react/prop-types */
import * as T from './ComDetailStyle';

const AnswerForm = ({ img, name, modifiedAt, content }) => {
  return (
    <T.AnswerForm>
      <T.AnswerEditBtn>
        <button>수정</button>
        <button>삭제</button>
      </T.AnswerEditBtn>
      <T.Answer>
        <T.AnswerCreatorImg>
          <img src={img} alt="answer_creator_image" />
        </T.AnswerCreatorImg>
        <T.AnswerDesCription>
          <p>{name}</p>
          <p>{modifiedAt}</p>
          <p>{content}</p>
        </T.AnswerDesCription>
      </T.Answer>
    </T.AnswerForm>
  );
};

export default AnswerForm;
