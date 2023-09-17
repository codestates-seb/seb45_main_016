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
  const memberId = localStorage.getItem('memberId');
  const name = localStorage.getItem('name');
  const onClickHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleLogin = () => {
    // 여기서 실제 로그인 로직을 처리한 뒤, userId 값을 로컬 스토리지에 저장
    // const loggedInUserId = 'exampleUserId'; // 로그인 로직을 따라서 가져와야 함
    localStorage.setItem('memberId', 1);
    localStorage.setItem('name', '사람');
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
          <Link to="/community/list">
            <button>COMMUNITY</button>
          </Link>
          {memberId ? (
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
          {memberId ? (
            <>
              <span>{name}님</span>
              <Link to="/" className="logout-button" onClick={onClickHandler}>
                <button>Logout</button>
              </Link>
            </>
          ) : (
            <>
              {/* 나중에 onClick 삭제 필요 현재는 로그인 버튼누르면 자동으로userid 생성되게 되어있음*/}
              <Link to="/login" className="login-button" onClick={handleLogin}>
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
