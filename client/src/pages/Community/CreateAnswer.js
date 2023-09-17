import * as T from './ComDetailStyle';

const CreateAnswer = () => {
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
      <textarea placeholder="댓글을 입력하세요"></textarea>
      <T.AnswerPost>등록하기</T.AnswerPost>
    </T.CreateAnswerForm>
  );
};

export default CreateAnswer;
