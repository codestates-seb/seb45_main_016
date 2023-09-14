import { styled } from 'styled-components';
import globalToken from '../../styles/global.json';

const { LicenseCard, LicenseCardBorder, Primary, Gray } = globalToken;

export const InfoCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 57.5px 44px;
  font-size: 16px;
  border-radius: ${LicenseCard.value}px;
  border: 1px solid ${LicenseCardBorder['color'].value};
  font-weight: 700;
  color: ${Gray['600'].value};
  p {
    font-size: 12px;
    font-weight: 500;
    line-height: 100%;
    color: ${Gray['500'].value};
  }
  &:hover {
    transform: translate(0, -10%);
    transition: transform 0.4s;
    cursor: pointer;
  }
`;
export const Title = styled.div`
  text-align: center;
  div {
    font-size: 22px;
    color: ${Primary['Default'].value};
  }
`;
