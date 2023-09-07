import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBox, Searchform } from './HeaderStyle'; // HeaderStyle 스타일들을 import

// eslint-disable-next-line no-undef
const imageUrl = process.env.PUBLIC_URL + '/Searchlogo.png';

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

  return (
    <Searchform>
      <SearchBox
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ textAlign: 'right' }} // placeholder 텍스트를 오른쪽으로 정렬
      />
      <button onClick={saveKeywordAndNavigate}>
        <img src={imageUrl} alt="검색" />
      </button>
    </Searchform>
  );
}

export default SearchBar;
