import styled from 'styled-components';
import globaltoken from '../../styles/global.json';

export const ComCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding: 139px 81.5px;
  border-radius: 20px;
  border: 1px solid ${globaltoken.CommunityBorderDefault['color'].value};

  cursor: pointer;

  > img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    margin: 0;
  }
  &:hover {
    border: 2px ${globaltoken.CommunityBorderHover.style.value}${globaltoken.CommunityBorderHover.color.value};
  }
`;

export const Username = styled.p`
  margin: 12px 0 0 0;
  font-size: 12px;
  color: ${globaltoken.Gray[600].value};
`;

export const Email = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${globaltoken.Gray[600].value};
`;

export const Tag = styled.p`
  margin: 64px 0 0 0;
  font-size: 16px;
  font-weight: 700;
  color: ${globaltoken.Gray[800].value};
`;

export const Title = styled.p`
  margin: 10px 0 0 0;
  font-size: 16px;
  font-weight: 700;
  color: ${globaltoken.Gray[800].value};
`;
