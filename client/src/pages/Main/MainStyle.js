import styled from 'styled-components';
import globalTokens from '../../styles/global.json';

// Define breakpoints for responsive design
const breakpoints = {
  small: '756px',
  medium: '992px',
  large: '1200px',
};

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

export const ImageContainer = styled.div`
  text-align: center;

  @media (max-width: ${breakpoints.medium}) {
    margin-top: 260px;
  }
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 64px;
`;

export const TopText = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 32px;
  font-weight: ${globalTokens.Heading2.fontWeight.value};
  color: ${globalTokens.Primary.Default.value};
  margin-bottom: 52px;
  width: 100%;
  align-items: center;
  gap: 12px;

  &.ComText {
    margin-top: 128px;
  }

  .more1,
  .more2 {
    margin: 0;
    border: none;
    background-color: ${globalTokens.White.value};
    color: ${globalTokens.Gray[500].value};
    font-size: 12px;
    cursor: pointer;

    &:hover {
      font-weight: bold;
      color: ${globalTokens.Gray[800].value};
    }
  }
`;

export const InfoCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(391px, 1fr));
  gap: 24px;
  width: 70%;
  overflow-x: auto;
  justify-content: flex-start;
  padding-top: 40px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${breakpoints.medium}) {
    display: grid;
    grid-template-columns: repeat(2, minmax(391px, 1fr));
    width: 100%;
    gap: 40px;
  }

  @media (max-width: ${breakpoints.small}) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(391px, 1fr));
    width: 100%;
    gap: 40px;
  }
`;

export const ComContainer = styled.div`
  align-items: flex-start;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 90%;
  max-height: 500px;
  margin-bottom: 128px;
  gap: 24px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${breakpoints.medium}) {
    display: flex;
    width: 90%;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  min-height: 150px;
  padding: 36px 54px;
  gap: 36px;
  background-color: ${globalTokens.Primary['Lighten-4'].value};
  color: ${globalTokens.Gray[600].value};

  &:hover {
    background-color: ${globalTokens.Primary['Lighten-3'].value};
    color: ${globalTokens.Primary['Darken-2'].value};
  }
  border-radius: ${globalTokens.MainCommunityPreview.value}px;
  @media (max-width: ${breakpoints.medium}) {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 600px;
    min-height: 300px;
    gap: 12px;
  }

  @media (max-width: ${breakpoints.small}) {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 300px;
    min-height: 300px;
    gap: 12px;
  }
`;

export const Comuseravatar = styled.div`
  display: flex;
  align-items: center;
  color: ${globalTokens.Gray[600].value};
  img {
    width: 120px;
    height: 120px;

    @media (max-width: ${breakpoints.medium}) {
      width: 80px;
      height: 80px;
    }

    @media (max-width: ${breakpoints.small}) {
      width: 50px;
      height: 50px;
    }
  }
`;
export const ComText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${globalTokens.Gray[600].value};

  &:hover {
    color: ${globalTokens.Primary['Darken-2'].value};
  }
`;

export const Comid = styled.p`
  margin: 0;
  margin-bottom: 8px;
  font-size: 16px;
  color: ${globalTokens.Primary['Darken-1'].value};
`;
export const Comtitle = styled.p`
  margin: 0;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 700;
  color: ${globalTokens.Primary['Darken-2'].value};
`;
export const Compreview = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${globalTokens.Primary['Darken-1'].value};
`;
