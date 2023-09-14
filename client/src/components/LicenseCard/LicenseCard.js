/* eslint-disable react/prop-types */
import { InfoCardStyle, Title } from './LicenseCardStyle';
import Bookmark from '../Bookmark/Bookmark';

const InfoCard = ({ title, onClick, date }) => {
  const allDate = [...date];

  let count = 1;

  const counting = (count) => {
    for (let i = 1; i < date.length - 1; i++) {
      if (allDate[i].implSeq !== allDate[i - 1].implSeq) {
        count = count + 1;
      }
    }
    return count;
  };

  return (
    <InfoCardStyle onClick={onClick}>
      <Title>
        <div>{title}</div>
        <p>총 {counting(count)} 회</p>
      </Title>
      <Bookmark />
    </InfoCardStyle>
  );
};

export default InfoCard;
