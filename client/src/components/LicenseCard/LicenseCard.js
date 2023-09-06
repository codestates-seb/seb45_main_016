/* eslint-disable react/prop-types */
import { InfoCardStyle, Title, ExamDate, ApplyDate } from './LicenseCardStyle';
import Bookmark from '../Bookmark/Bookmark';

const InfoCard = ({ title, onClick }) => {
  return (
    <InfoCardStyle onClick={onClick}>
      <Title>
        <div>{title}</div>
        <p>회차</p>
      </Title>
      <ExamDate>
        <div>필기시험 일자</div>
        <p>날짜</p>
      </ExamDate>
      <ApplyDate>
        <div>
          <div>필기시험 접수 기간</div>
          <p>날짜</p>
        </div>
        <Bookmark />
      </ApplyDate>
    </InfoCardStyle>
  );
};

export default InfoCard;
