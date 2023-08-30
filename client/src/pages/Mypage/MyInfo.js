import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {
  Calendar,
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
        <Calendar>달력</Calendar>
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
