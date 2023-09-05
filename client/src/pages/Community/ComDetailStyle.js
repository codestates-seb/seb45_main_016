import { styled } from 'styled-components';

export const DetailEntire = styled.div`
  display: flex;
  flex-direction: column;
  .view-count {
    text-align: right;
    border-bottom: 1px solid black;
  }
  span {
    margin: 0 10px;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid black;
`;

export const EditBtn = styled.div`
  padding-left: 80%;
`;

export const ImgWrap = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  background-color: pink;
`;

export const Body = styled.div`
  padding: 0px 20%;
`;

export const Content = styled.div`
  padding: 30px 0;
  border-bottom: 1px solid black;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
  button {
    background-color: transparent;
    border-radius: 15px;
    cursor: pointer;
  }
`;

export const ReviewWrap = styled.div``;
export const ReviewList = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid black;
`;

export const Reply = styled.div``;

export const WrittenReply = styled(ReviewList)`
  border: none;
`;

export const WriteReview = styled.div`
  border: 1px solid black;
  input {
    display: block;
  }
  input:focus {
    outline: none;
  }
`;

export const ReviewEditBtn = styled.div`
  button {
    height: 10%;
  }
`;
