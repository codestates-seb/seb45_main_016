import React from 'react';
import {
  HeaderStyle,
  Logo,
  Headerform,
  Linkform,
  Loginform,
} from './HeaderStyle';
import { Link } from 'react-router-dom';
import SearchBar from '../Header/Searchbar'; // SearchBar 컴포넌트를 import

// eslint-disable-next-line no-undef
const imageUrl = process.env.PUBLIC_URL + '/Logo.png';
// eslint-disable-next-line no-undef
const imageUrl1 = process.env.PUBLIC_URL + '/ava.png';

const Header = () => {
  const userId = localStorage.getItem('userId');

  const onClickHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleLogin = () => {
    // 여기서 실제 로그인 로직을 처리한 뒤, userId 값을 로컬 스토리지에 저장
    const loggedInUserId = 'exampleUserId'; // 로그인 로직을 따라서 가져와야 함
    localStorage.setItem('userId', loggedInUserId);
  };

  return (
    <HeaderStyle>
      <Headerform>
        <Linkform>
          <Logo>
            <div>
              <Link to="/">
                <img src={imageUrl} alt="logo" />
              </Link>
            </div>
          </Logo>
          <Link to="/info">
            <button>LIENSE</button>
          </Link>
          <Link to="/community">
            <button>COMMUNITY</button>
          </Link>
          {userId ? (
            <Link to="/mypage">
              <button>MY PAGE</button>
            </Link>
          ) : null}
        </Linkform>
        <SearchBar />
        <Loginform>
          {userId ? (
            <>
              <img src={imageUrl1} alt="useravatar" />
              <Link to="/" className="logout-button" onClick={onClickHandler}>
                <button> Logout</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="login-button" onClick={handleLogin}>
                <button>Login</button>
              </Link>

              <Link to="/signup" className="signup-button">
                <button>Signup</button>
              </Link>
            </>
          )}
        </Loginform>
      </Headerform>
    </HeaderStyle>
  );
};

export default Header;
