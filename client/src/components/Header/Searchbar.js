import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBox, Searchform } from './HeaderStyle'; // HeaderStyle 스타일들을 import
import { SearchIcon } from '../../utils/svg';

// eslint-disable-next-line no-undef

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const saveKeywordAndNavigate = () => {
    if (searchTerm.trim() !== '') {
      const updatedKeywords = [searchTerm];
      localStorage.setItem('savedKeywords', updatedKeywords);
      setSearchTerm('');

      navigate('/search');

      // 페이지 이동 후 새로고침
      window.location.reload();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveKeywordAndNavigate();
    }
  };

  return (
    <Searchform>
      <SearchBox
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress} // 엔터 키 이벤트 처리
      />
      <button onClick={saveKeywordAndNavigate}>
        <SearchIcon />
      </button>
    </Searchform>
  );
}

export default SearchBar;
