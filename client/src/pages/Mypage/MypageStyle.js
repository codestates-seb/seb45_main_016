import styled from 'styled-components';
import globaltoken from '../../styles/global.json';

const breakpoints = {
  small: '756px',
  medium: '992px',
  large: '1200px',
};

export const MypageStyle = styled.div``;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${globaltoken.Gray[300].value};
  padding-bottom: 100px;
  padding-top: 128px;

  @media (max-width: ${breakpoints.medium}) {
    padding-top: 388px;
    display: flex;
    flex-direction: column;
  }
`;

export const ProfileLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  > img {
    flex-grow: 1;
    width: 150px;
    height: 150px;
    border-radius: 100%;
  }

  > .edit {
    flex-grow: 1;
    color: ${globaltoken.Gray[600].value};
    border: none;
    background-color: ${globaltoken.White.value};
    margin-top: 24px;
    cursor: pointer;
  }

  .delBtn {
    border: none;
    border-radius: 100px;
    background-color: ${globaltoken.White.value};
    color: ${globaltoken.Gray[400].value};
    font-size: 12px;
    padding: 8px 12px;
    margin-top: 8px;

    &:hover {
      background-color: ${globaltoken.Gray[100].value};
      font-weight: bold;
    }
  }
`;

export const ProfileRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  gap: 24px;
  margin-right: 10%;

  .display {
    color: ${globaltoken.Gray[600].value};
    text-align: center;
    width: 80%;
    margin-top: 5%;
    padding: 24px;

    > .text {
      font-size: 12px;
      text-align: left;

      p {
        border-bottom: 0.5px solid ${globaltoken.Primary.Default.value};
        padding: 2px 12px 12px 12px;
        margin: 24px 0 24px 0;
      }
    }
  }

  .editinfo {
    border: none;
    border-radius: 100px;
    background-color: ${globaltoken.Primary.Default.value};
    color: ${globaltoken.White.value};
    font-size: 12px;
    padding: 8px 12px;
    margin-top: 24px;

    &:hover {
      background-color: ${globaltoken.Primary['Darken-1'].value};
      font-weight: bold;
    }
  }

  .input-username {
    display: flex;
    width: 80%;

    > input {
      width: 100%;
      border: none;
      border-bottom: 0.5px solid ${globaltoken.Primary.Default.value};
      color: ${globaltoken.Gray[600].value};
      font-size: 12px;
      padding: 2px 8px 12px 8px;
    }

    > input::placeholder {
      color: ${globaltoken.Gray[400].value};
    }
  }

  .input-email {
    display: flex;
    width: 80%;

    > input {
      width: 100%;
      border: none;
      border-bottom: 0.5px solid ${globaltoken.Primary.Default.value};
      color: ${globaltoken.Gray[600].value};
      font-size: 12px;
      padding: 2px 8px 12px 8px;
    }

    > input::placeholder {
      color: ${globaltoken.Gray[400].value};
    }
  }

  .input-phonenumber {
    display: flex;
    width: 80%;

    > input {
      width: 100%;
      border: none;
      border-bottom: 0.5px solid ${globaltoken.Primary.Default.value};
      color: ${globaltoken.Gray[600].value};
      font-size: 12px;
      padding: 2px 8px 12px 8px;
    }

    > input::placeholder {
      color: ${globaltoken.Gray[400].value};
    }
  }

  input:focus {
    outline: none;
    border-bottom: 1.5px solid ${globaltoken.Primary.Default.value};
    color: ${globaltoken.Gray[900].value};
  }

  @media (max-width: ${breakpoints.medium}) {
    padding-top: 64px;
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    width: 90%;
  }
`;

export const SchedulePlusLog = styled.div`
  margin-top: 5%;
  margin-bottom: 128px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
`;

export const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10%;
  margin-top: 5%;

  .licensedate {
    background-color: ${globaltoken.Secondary['Lighten-2'].value};
    color: ${globaltoken.Secondary['Darken-2'].value};
  }

  .react-calendar {
    flex-grow: 1;
    height: 100%;
    width: 100%;
    max-width: 594px;
    border: 1px solid ${globaltoken.Primary.Default.value};
    border-radius: ${globaltoken.Calendar.value}px;
    font-family: ${globaltoken.SubHeading.fontFamily.value};
    padding: 44px 64px;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar__tile--now {
    background: ${globaltoken.Primary['Lighten-4'].value};
    color: ${globaltoken.White.value};
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
    color: ${globaltoken.Gray[600].value};
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    color: ${globaltoken.Primary.Default.value};
    font-size: 16px;

    > .react-calendar__navigation__label__labelText {
      font-size: 22px;
      font-weight: 500;

      @media (max-width: ${breakpoints.medium}) {
        font-size: 16px;
      }
    }
  }

  .react-calendar__navigation button:disabled {
    background-color: ${globaltoken.White.value};
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: ${globaltoken.White.value};
  }

  .react-calendar__month-view__weekdays {
    margin: 32px 0 32px 0;
    text-align: center;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 16px;
    color: ${globaltoken.Gray[600].value};

    @media (max-width: ${breakpoints.medium}) {
      font-size: 12px;
    }
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 16px 0;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__days__day--weekend {
    font-size: 16px;
    color: ${globaltoken.Gray[600].value};
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${globaltoken.Gray[600].value};
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    font-size: 16px;
    max-width: 100%;
    padding: 24px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    color: ${globaltoken.Gray[600].value};

    @media (max-width: ${breakpoints.medium}) {
      padding: 12px 3px;
      font-size: 12px;
    }
  }

  .react-calendar__tile:disabled {
    background-color: ${globaltoken.White.value};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${globaltoken.White.value};
  }

  .react-calendar__tile--now {
    background: ${globaltoken.Primary['Lighten-4'].value};
    color: ${globaltoken.Primary['Darken-2'].value};
    border-radius: 100px;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${globaltoken.Primary['Lighten-4'].value};
    color: ${globaltoken.Primary['Darken-2']};
    border-radius: 100px;
  }

  /* .react-calendar__tile--now:enabled:hover {
    background: ${globaltoken.Primary['Lighten-4'].value};
    color: ${globaltoken.Primary['Darken-2']};
    border-radius: 100px;
  }
  .react-calendar__tile--now:enabled:focus {
    background: ${globaltoken.Primary['Lighten-4'].value};
    color: ${globaltoken.White.value};
    border-radius: 100px;
  } */

  .react-calendar__tile--hasActive {
    background: ${globaltoken.Primary.Default.value};
    color: ${globaltoken.White.value};
    border-radius: 100px;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: ${globaltoken.Primary.Default.value};
    color: ${globaltoken.White.value};
    border-radius: 100px;
  }

  .react-calendar__tile--active {
    background: ${globaltoken.Primary.Default.value};
    color: white;
    border-radius: 100px;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${globaltoken.Primary.Default.value};
    color: ${globaltoken.White.value};
    border-radius: 100px;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: ${globaltoken.Primary.Default.value};
    color: ${globaltoken.White.value};
    border-radius: 100px;
  }
`;

export const Log = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: fit-content;
  margin-left: 10%;
`;

export const LikedInfo = styled.div`
  flex-grow: 2;
  font-size: 16px;
  color: ${globaltoken.Gray[600].value};
  margin-top: 10%;
`;

export const Written = styled.div`
  flex-grow: 1;
  font-size: 16px;
  color: ${globaltoken.Gray[600].value};
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const BookMarkContainer = styled.div`
  display: flex;
  height: fit-content;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
  width: 100%;

  .bookmark {
    border: none;
    background-color: ${globaltoken.Secondary['Lighten-2'].value};
    color: ${globaltoken.Secondary['Darken-2'].value};
    border-radius: 15px;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background-color: ${globaltoken.Secondary['Darken-2'].value};
      color: ${globaltoken.White.value};
      font-weight: bold;
    }
  }
`;

export const WriteContents = styled.div`
  border: 1px solid ${globaltoken.Secondary.Default.value};
  border-radius: ${globaltoken.MainCommunityPreview.value}px;
  height: fit-content;
  padding: 36px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 150px;

  &::-webkit-scrollbar {
    display: none;
  }

  .write {
    border: none;
    background-color: ${globaltoken.White.value};
    color: ${globaltoken.Gray[600].value};
    margin: 24px 0 24px 0;
    padding: 0;
    width: 100%;
    cursor: pointer;
    text-align: left;
    font-size: 16px;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &:hover {
      color: ${globaltoken.Secondary['Darken-2'].value};
      font-weight: bold;
    }
  }
`;
