// InfoStyle.js
import styled from 'styled-components';
import globalToken from '../../styles/global.json';

const { Primary } = globalToken;

const breakpoints = {
  small: '756px',
  medium: '992px',
  large: '1200px',
};

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AlertContainer = styled.div`
  font-size: 36px;
  font-weight: 800;
  line-height: normal;
  color: ${Primary['Default'].value};
  margin: 9% auto;

  @media (max-width: ${breakpoints.medium}) {
    padding-top: 260px;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(391px, 1fr));
  width: 90%;
  margin: 0.5% 0 21% 0;
  gap: 24px;

  @media (max-width: ${breakpoints.medium}) {
    grid-template-columns: repeat(auto-fill, minmax(391px, 1fr));
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .arrow-button {
    cursor: pointer;
    background-color: white;
    border: none;
    height: 5%;
    color: ${globalToken.Gray[600].value};
  }
`;

export const PaginationButton = styled.button`
  font-size: 1rem;
  line-height: 100%;
  font-style: normal;
  font-weight: ${(props) => (props['data-currentpage'] ? 700 : 500)};
  color: ${(props) =>
    props['data-currentpage']
      ? globalToken.Primary['Darken-2'].value
      : globalToken.Gray[600].value};
  &:hover {
    color: ${(props) =>
      props['data-currentpage']
        ? globalToken.Primary['Darken-2'].value
        : globalToken.Gray[800].value};
  }
  text-decoration: ${(props) => props['data-currentpage'] && 'underline'};
  border: none;
  background-color: transparent;
  cursor: ${(props) => (props['data-currentpage'] ? 'default' : 'pointer')};

  :disabled {
    cursor: not-allowed;
  }
  margin: 0 2rem 11rem;
`;
