import styled from 'styled-components';
import globalTokens from '../../styles/global.json';

const breakpoints = {
  medium: '992px',
  large: '1200px',
};

export const KaKaoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 20%;

  @media (max-width: ${breakpoints.medium}) {
    margin-top: 300px;
  }

  .notice {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  img {
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 60px;
    margin-bottom: 32px;
  }

  p {
    justify-content: center;
    align-items: center;
    font-size: 22px;
    text-align: center;
    font-weight: bold;
    margin-top: 0;
    color: ${globalTokens.Primary.Default.value};
  }
`;
