import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // styled-components를 import
import {
  HeaderStyle as OriginalHeaderStyle,
  InputContainer,
  SearchBox,
} from './HeaderStyle'; // HeaderStyle 스타일들을 import

const HeaderStyle = styled(OriginalHeaderStyle)`
  /* 여기에 추가하고자 하는 스타일을 정의합니다. */
`;

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
    <HeaderStyle>
      <InputContainer>
        <SearchBox
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={saveKeywordAndNavigate}>검색</button>
      </InputContainer>
    </HeaderStyle>
  );
}

export default SearchBar;
