import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {
  LikedInfo,
  MypageStyle,
  Profile,
  ProfileLeft,
  ProfileRight,
  SchedulePlusLog,
  Log,
  Written,
} from './MypageStyle';

const MyInfo = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
  };

  return (
    <MypageStyle>
      <Header />
      <Profile>
        <ProfileLeft>
          <div id="img" alt="">
            사진 영역
          </div>
          <p>user nickname</p>
        </ProfileLeft>
        <ProfileRight>
          <input type="text"></input>
          <input type="text"></input>
          <input type="text"></input>
        </ProfileRight>
      </Profile>
      <SchedulePlusLog>
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={date} />
        </div>
        <Log>
          <LikedInfo>관심있는 자격 정보</LikedInfo>
          <Written>작성한 글</Written>
        </Log>
      </SchedulePlusLog>
      <Footer />
    </MypageStyle>
  );
};

export default MyInfo;
