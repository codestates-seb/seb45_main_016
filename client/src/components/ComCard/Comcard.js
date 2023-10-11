/* eslint-disable react/prop-types */
import React from 'react';
import * as Styled from './ComCard.Style';

const ComCard = ({ username, email, tag, title, onClick, img }) => {
  return (
    <Styled.ComCardContainer onClick={onClick}>
      <img src={img} alt="useravatar" />
      <Styled.Username>{username}</Styled.Username>
      <Styled.Email>{email}</Styled.Email>
      <Styled.Tag>{tag}</Styled.Tag>
      <Styled.Title>{title}</Styled.Title>
    </Styled.ComCardContainer>
  );
};

export default ComCard;
