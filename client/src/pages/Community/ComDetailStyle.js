import { styled } from 'styled-components';
import globalToken from '../../styles/global.json';

const { Gray } = globalToken;

const breakpoints = {
  small: '756px',
  medium: '992px',
  large: '1200px',
};

export const DetailEntire = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${Gray['600'].value};
  @media (max-width: ${breakpoints.medium}) {
    margin-top: 260px;
  }
`;

export const EditBtn = styled.div`
  margin-top: 10%;
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
