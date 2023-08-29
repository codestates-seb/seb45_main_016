import styled from 'styled-components';

export const MypageStyle = styled.div``;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  padding-bottom: 100px;
`;

export const ProfileLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  div {
    flex-grow: 1;
    background-color: pink;
    width: fit-content;
    height: fit-content;
    padding: 50px 30px;
    border-radius: 100%;
  }
  p {
    flex-grow: 1;
  }
`;

export const ProfileRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  input {
    border: none;
    border-bottom: 1px solid black;
  }
  input:focus {
    outline: none;
  }
`;

export const SchedulePlusLog = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
`;

export const Calendar = styled.div`
  padding: 200px;
  flex-grow: 1;
  border: 1px solid black;
`;

export const Log = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: 1px solid black;
`;

export const LikedInfo = styled.div`
  flex-grow: 1;
  border: 1px solid black;
`;

export const Written = styled.div`
  border: 1px solid black;
  flex-grow: 1;
`;
