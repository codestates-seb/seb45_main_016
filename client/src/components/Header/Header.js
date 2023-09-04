import React from 'react';
import { HeaderStyle, Logo } from './HeaderStyle';
import { Link } from 'react-router-dom';
import SearchBar from '../Header/Searchbar'; // SearchBar 컴포넌트를 import

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
      <Logo>
        <div>
          <Link to="/">
            <img
              // src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg"
              alt="logo"
            />
          </Link>
        </div>
      </Logo>
      <Link to="/info">자격증 정보</Link>
      {userId ? (
        <>
          <Link to="/community">Community</Link>
          <Link to="/mypage">My Page</Link>
        </>
      ) : (
        <button>
          <Link to="/community">Community</Link>
        </button>
      )}
      <SearchBar />
      {userId ? (
        <>
          <Link to="/userinfo">
            <img
              // src="https://i.pinimg.com/564x/18/b4/69/18b4699032c3019658996090bbe54d3f.jpg"
              alt="useravatar"
            />
          </Link>
          <button>
            <Link to="/" className="logout-button" onClick={onClickHandler}>
              Logout
            </Link>
          </button>
        </>
      ) : (
        <>
          <button>
            <Link to="/login" className="login-button" onClick={handleLogin}>
              Log in
            </Link>
          </button>
          <button>
            <Link to="/signup" className="signup-button">
              Sign up
            </Link>
          </button>
        </>
      )}
    </HeaderStyle>
  );
};

export default Header;