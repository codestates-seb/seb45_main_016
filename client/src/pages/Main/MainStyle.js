import styled from 'styled-components';

export const ImageContainer = styled.div`
  text-align: center;
  margin: 10px 0;
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 40px;
`;

export const TopText = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const ComContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
`;
