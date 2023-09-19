import styled from 'styled-components';
import globaltoken from '../../styles/global.json';

const breakpoints = {
  medium: '700px',
  large: '1200px',
};

export const DelModalContainer = styled.div`
  position: fixed;
  top: 30%;
  left: 38%;
  border: red;
  z-index: 1;
  border-radius: 20px;
  box-shadow: 2px 2px 30px 0px rgba(0, 0, 0, 0.1);
  background-color: ${globaltoken.Primary['Lighten-3'].value};
  box-shadow: ${globaltoken.LoginBoxShadow.value}px;

  @media (max-width: ${breakpoints.medium}) {
    min-width: 400px;
    left: 10%;
  }
`;

export const Container = styled.div`
  border: ${globaltoken.Gray[800].value};
  text-align: center;
  padding: 64px 100px;
  gap: 12px;

  h2 {
    font-size: 22px;
    color: ${globaltoken.Primary['Darken-2'].value};
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    color: ${globaltoken.Primary['Darken-1'].value};
    margin-bottom: 16px;
  }

  button {
    border: none;
    border-radius: 100px;
    padding: 8px 16px;
    background-color: ${globaltoken.Primary['Default'].value};
    color: ${globaltoken.White.value};
    margin-top: 12px;
    cursor: pointer;

    &:hover {
      background-color: ${globaltoken.Primary['Darken-1'].value};
      font-weight: bold;
    }
  }

  .noBtn {
    margin-right: 8px;
  }
`;
