import { styled } from 'styled-components';
import globalToken from '../../styles/global.json';

const { Primary, White, Gray } = globalToken;

export const ModalStyle = styled.div`
  position: fixed;
  left: 50;
  margin: 2% auto;
  height: 45%;
  width: 70%;
  z-index: 999;
  p {
    font-size: 12px;
    font-weight: 500;
    color: ${Gray['600'].value};
    line-height: 100%;
    margin-bottom: 2%;
  }
`;

export const Content = styled.div`
  margin: auto;
  border-radius: 20px;
  background-color: #fff;
  padding: 8.5% 4.5%;
  box-shadow: 2px 2px 30px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const ButtonWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 3%;
  top: 10%;
`;

export const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  margin-bottom: 50%;
  cursor: pointer;
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Name = styled.div`
  font-size: 22px;
  font-weight: 700;
  width: fit-content;
  height: fit-content;
  padding: 12px 16px;
  background-color: ${Primary['Default'].value};
  border-radius: 100px;
  color: ${White.value};
  margin: 0 auto 8%;
`;

export const Table = styled.table`
  width: 100%;
  margin-bottom: 5%;

  td {
    font-size: 12px;
    font-weight: 500;
    color: ${Gray['500'].value};
    line-height: 100%;
  }
  p,
  th {
    font-size: 16px;
    font-weight: 700;
    color: ${Gray['600'].value};
    line-height: normal;
    margin-bottom: 8px;
  }

  gap: 40% 0;
`;
