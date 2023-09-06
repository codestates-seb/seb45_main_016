import React from 'react';
import { HeaderStyle, Logo } from './HeaderStyle';
import { Link } from 'react-router-dom';
import SearchBar from '../Header/Searchbar'; // SearchBar 컴포넌트를 import

// eslint-disable-next-line no-undef
const imageUrl = process.env.PUBLIC_URL + '/Logo.png';

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
            <img src={imageUrl} alt="logo" />
          </Link>
        </div>
      </Logo>
      <Link to="/info">
        <button>자격증 정보</button>
      </Link>
      <Link to="/community">
        <button>Community</button>
      </Link>
      {userId ? (
        <Link to="/mypage">
          <button>My Page</button>
        </Link>
      ) : null}
      <SearchBar />
      {userId ? (
        <>
          <img
            // src="https://i.pinimg.com/564x/18/b4/69/18b4699032c3019658996090bbe54d3f.jpg"
            alt="useravatar"
          />
          <button>
            <Link to="/" className="logout-button" onClick={onClickHandler}>
              Logout
            </Link>
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="login-button" onClick={handleLogin}>
            <button>Log in</button>
          </Link>

          <Link to="/signup" className="signup-button">
            <button>Sign up</button>
          </Link>
        </>
      )}
    </HeaderStyle>
  );
};

export default Header;
