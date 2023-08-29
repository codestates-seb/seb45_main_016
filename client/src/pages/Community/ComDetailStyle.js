import { styled } from 'styled-components';

export const DetailEntire = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin: 30px 0;
  }
  .view-count {
    text-align: right;
    border-bottom: 1px solid black;
  }
  span {
    margin: 0 10px;
  }
`;

export const CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid black;
`;

export const Content = styled.div`
  padding: 30px;
  border-bottom: 1px solid black;
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  input {
    margin-right: 30%;
  }
  button {
    margin: 0 10px;
  }
`;

export const SendReview = styled.div`
  input {
    width: 100%;
  }
  .review-input-wrap {
    display: flex;
    flex-direction: row;
  }
`;

export const ReadReview = styled.div`
  p {
    margin: 20px 0;
  }
`;
