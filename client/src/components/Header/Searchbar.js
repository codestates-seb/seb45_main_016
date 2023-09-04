import React, { useState } from 'react';
import * as Styled from './HeaderStyle';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      // URL 파라미터를 업데이트하고 새로운 경로로 이동
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Styled.InputContainer>
      <Styled.SearchBox
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSearch(event);
          }
        }}
      ></Styled.SearchBox>
    </Styled.InputContainer>
  );
};

export default SearchBar;
