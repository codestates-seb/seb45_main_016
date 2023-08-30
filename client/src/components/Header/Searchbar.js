import React, { useState } from 'react';
import * as Styled from './HeaderStyle';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
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
