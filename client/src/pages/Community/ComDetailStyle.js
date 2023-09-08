import { styled } from 'styled-components';
import globalToken from '../../styles/global.json';

const { Gray, Primary, White } = globalToken;

export const DetailEntire = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${Gray['600'].value};
`;

export const EditBtn = styled.div`
  margin-top: 2%;
  padding-left: 90%;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const Title = styled.div`
  font-size: 2.66667rem;
  font-weight: 700;
  text-align: center;
  margin-top: 4.17rem;
  p {
    margin: 0;
  }
`;

export const ImgWrap = styled.div`
  width: 5rem;
  height: 5rem;
  padding-top: 5.33rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  font-weight: 700;
  line-height: 100%;
  align-items: center;
  margin: 1.08rem 0 3.67rem;
  .email {
    font-weight: 400;
  }
`;

export const User = styled.div`
  text-align: center;
  margin-right: 1.83rem;
  p {
    margin: 0;
  }
`;

export const Body = styled.div`
  padding: 7% 27%;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  border-bottom: 1px solid ${Gray['300'].value};
  padding-bottom: 5.33rem;
  color: ${Gray['600'].value};
  font-size: 1.33333rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const ReviewOpenBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.66667rem 1rem;
  margin-bottom: 8.33rem;
  background-color: ${White.value};
  border: 1px solid
    ${(props) =>
      props['data-isOpen'] || props['data-isContentLiked']
        ? Gray['600'].value
        : Gray['400'].value};
  border-radius: 83.3rem;
  font-size: 1.33333rem;
  font-style: normal;
  font-weight: ${(props) =>
    props['data-isOpen'] || props['data-isContentLiked'] ? '700' : '400'};
  line-height: normal;
  color: ${(props) =>
    props['data-isOpen'] || props['data-isContentLiked']
      ? Gray['600'].value
      : Gray['400'].value};
  cursor: pointer;
  .btn-name {
    margin: 0 0.33rem;
  }
  .num {
    color: ${(props) =>
      props['data-isOpen']
        ? Primary['Default'].value
        : Primary['Lighten-1'].value};
  }
  &.num:hover {
    color: ${Primary['Default'].value};
  }
  &:hover {
    border-color: ${Gray['600'].value};
    font-weight: 700;
    color: ${Gray['600'].value};
    path {
      fill: ${Gray['600'].value};
    }
  }
  path {
    fill: ${(props) =>
      props['data-isOpen'] || props['data-isContentLiked']
        ? Gray['600'].value
        : '#BDBDBD'};
  }
`;

export const HeartBtn = styled(ReviewOpenBtn)`
  svg {
    margin-right: 0.33rem;
  }
`;

export const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: ${Gray['600'].value};
    font-size: 1.33333rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0 0 0.67rem 0;
  }
`;
export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${Gray['300'].value};
  padding-top: 5.33rem;
`;

export const Review = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  img {
    margin-right: 1.33rem;
    width: 5rem;
    height: 5rem;
  }
`;

export const ReplyFlex = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: ${Gray['500'].value};
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  p {
    margin: 1.33rem 0 0 0;
  }
  .flex1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ReviewInfo = styled.div`
  textarea {
    width: 100%;
    height: 50%;
    margin-top: 2rem;
    resize: none;
    border-radius: 0.3rem;
    border: 1px solid ${Gray['300'].value};
  }
  textarea:focus {
    outline: none;
  }

  .reply-btn {
    background-color: transparent;
    border: none;
    margin-top: 2rem;
    color: ${Gray['400'].value};
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    cursor: pointer;
  }
`;

export const Reply = styled(ReviewList)`
  display: flex;
  flex-direction: row;
  border: none;
  padding-top: 4.33rem;
  justify-content: space-between;
  button {
    height: fit-content;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${Gray['400'].value};
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const ReplyContent = styled.div`
  display: flex;
  flex-direction: row;
`;

export const WriteReview = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.33;
  padding: 2rem;
  border-radius: 0.83rem;
  border: 1px solid ${Gray['300'].value};

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      margin: 0;
    }
  }

  img {
    margin-right: 1.33rem;
  }

  textarea {
    flex-grow: 1;
    border: none;
    height: 6.42rem;
    resize: none;
    padding: 2rem;
  }
  textarea:focus {
    outline: none;
  }
  button {
    background-color: transparent;
    border: 1px solid ${Gray['300'].value};
    border-radius: 83.3rem;
    padding: 0.67rem 1rem;
    margin-left: 88%;
    width: fit-content;
    color: ${Gray['400'].value};
    font-size: 1.3333rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    cursor: pointer;
  }
`;

export const ReviewEditBtn = styled.div`
  display: flex;
  flex-direction: row;
  button {
    background-color: transparent;
    border: none;
    width: 2.5rem;
    cursor: pointer;
    color: ${Gray['400'].value};
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const WriteReReview = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 0.83rem;
  border: 1px solid ${Gray['300'].value};

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      margin: 0;
    }
  }

  img {
    width: 3rem;
    height: 3rem;
  }

  textarea {
    flex-grow: 1;
    border: none;
    height: 3rem;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
  button {
    background-color: transparent;
    border: 1px solid ${Gray['300'].value};
    border-radius: 83.3rem;
    padding: 0.35rem 0.5rem;
    margin-left: 91%;
    width: fit-content;
    color: ${Gray['400'].value};
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    cursor: pointer;
  }
`;
