import { styled } from 'styled-components';
import globalTokens from '../../styles/global.json';

export const FooterStyle = styled.div`
  width: 100%;
  border: none;
  background-color: ${globalTokens.Primary['Lighten-4'].value};
  display: flex; /* 자식 요소를 가로로 배치하기 위해 flex 사용 */
  justify-content: space-between; /* 자식 요소를 양쪽으로 배치 */
  button {
    cursor: pointer;
  }
`;

export const Leftform = styled.div`
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
  width: 30%;
  border: none;
  display: flex; /* 컴포넌트를 수직으로 배치하기 위해 flex 사용 */
  flex-direction: column; /* 수직으로 배치 */
`;

export const Logo = styled.div`
  flex-grow: 0;
  margin-bottom: 10%;
  width: 100%;
  border: none;
  cursor: pointer;
`;

export const Teamname = styled.div`
  flex-grow: 0;
  margin-bottom: 10%;
  width: 100%;
  border: none;
  cursor: pointer;
  color: ${globalTokens.Primary['Darken-1'].value};

  /* LabelBold */
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const Gitlink = styled.div`
  flex-grow: 0;
  width: 100%;
  border: none;
  cursor: pointer;
  a {
    margin-right: 5%;
    color: ${globalTokens.Primary.Default.value};

    /* Body */
    font-family: Pretendard Variable;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 12px */
    text-decoration: none;

    &:hover {
      color: ${globalTokens.Primary['Darken-2'].value};
      font-weight: bold;
    }
  }
  span {
    color: ${globalTokens.Primary['Darken-1'].value};
    font-family: Pretendard Variable;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-right: 5%;
  }
  div {
    margin-bottom: 1%;
  }
`;

export const Rightform = styled.div`
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
  width: 30%;
  border: none;
  display: flex;
  align-items: flex-end; /* 아래쪽으로 정렬 */
  justify-content: flex-end; /* 오른쪽으로 정렬 */

  /* 각 아이콘 요소에 오른쪽 여백 추가 */
  a {
    margin-right: 10%; /* 원하는 여백 크기로 조절 */
  }
`;
