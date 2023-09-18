import React from 'react';
import {
  HeaderStyle,
  Logo,
  HeaderLeft,
  HeaderRight,
  Linkform,
  Loginform,
} from './HeaderStyle';
import { Link } from 'react-router-dom';
import SearchBar from '../Header/Searchbar'; // SearchBar 컴포넌트를 import

// eslint-disable-next-line no-undef
const imageUrl = process.env.PUBLIC_URL + '/Logo.png';

const Header = () => {
  const token = localStorage.getItem('authorization');
  const name = localStorage.getItem('name');
  const onClickHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <HeaderStyle>
      <HeaderLeft>
        <Logo>
          <Link to="/">
            <img src={imageUrl} alt="logo" />
          </Link>
        </Logo>
        <Linkform>
          <Link to="/info">
            <button>LICENSE</button>
          </Link>
          {/* 임시로 목업페이지에 링크 걸었습니다 실제 페이지는 list제거하면 됩니다! */}
          <Link to="/community">
            <button>COMMUNITY</button>
          </Link>
          {token ? (
            <Link to="/mypage">
              <button>MY PAGE</button>
            </Link>
          ) : (
            <Link to="/login">
              <button>MY PAGE</button>
            </Link>
          )}
        </Linkform>
      </HeaderLeft>
      <HeaderRight>
        <SearchBar />
        <Loginform>
          {token ? (
            <>
              <span>{name}</span>
              <Link to="/" className="logout-button" onClick={onClickHandler}>
                <button>Logout</button>
              </Link>
            </>
          ) : (
            <>
              {/* 나중에 onClick 삭제 필요 현재는 로그인 버튼누르면 자동으로userid 생성되게 되어있음*/}
              <Link to="/login" className="login-button">
                <button>Login</button>
              </Link>

              <Link to="/signup" className="signup-button">
                <button>Signup</button>
              </Link>
            </>
          )}
        </Loginform>
      </HeaderRight>
    </HeaderStyle>
  );
};

export default Header;
