/* eslint-disable react/prop-types */
import React from 'react';
import * as Styled from './ComCard.Style';

const ComCard = ({ username, email, tag, title, onClick }) => {
  return (
    <Styled.ComCardContainer onClick={onClick}>
      <img
        src="https://dinotaeng.com/file_data/dinotaeng/2022/04/07/3e1a4215a71999cb828799e4da858012.png"
        alt="useravatar"
      />
      <Styled.Username>{username}</Styled.Username>
      <Styled.Email>{email}</Styled.Email>
      <Styled.Tag>{tag}</Styled.Tag>
      <Styled.Title>{title}</Styled.Title>
    </Styled.ComCardContainer>
  );
};

export default ComCard;
