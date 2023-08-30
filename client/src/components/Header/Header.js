import React from 'react';
import * as Styled from './HeaderStyle';
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
    <Styled.HeaderContainer>
      <Styled.LogoContainer>
        <Link to="/">
          <img
            // src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg"
            alt="logo"
          />
        </Link>
      </Styled.LogoContainer>

      <Styled.Nav>
        <Styled.NavItem>
          <Link to="/info">자격증 정보</Link>
        </Styled.NavItem>
        {userId && (
          <>
            <Styled.NavItem>
              <Link to="/community">Community</Link>
            </Styled.NavItem>
            <Styled.NavItem>
              <Link to="/mypage">My Page</Link>
            </Styled.NavItem>
          </>
        )}
        {!userId && (
          <Styled.NavItem>
            <Link to="/community">Community</Link>
          </Styled.NavItem>
        )}
      </Styled.Nav>

      <Styled.InputContainer>
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <SearchBar />
      </Styled.InputContainer>

      {userId ? (
        <Styled.LoginStateButtonContainer>
          <Link to="/userinfo">
            <Styled.UserAvatar
              // src="https://i.pinimg.com/564x/18/b4/69/18b4699032c3019658996090bbe54d3f.jpg"
              alt="useravatar"
            />
          </Link>
          <Styled.LogoutButton>
            <Link to="/" className="logout-button" onClick={onClickHandler}>
              Logout
            </Link>
          </Styled.LogoutButton>
        </Styled.LoginStateButtonContainer>
      ) : (
        <Styled.ButtonContainer>
          <Styled.LoginButton>
            <Link to="/login" className="login-button" onClick={handleLogin}>
              Log in
            </Link>
          </Styled.LoginButton>
          <Styled.SignupButton>
            <Link to="/signup" className="signup-button">
              Sign up
            </Link>
          </Styled.SignupButton>
        </Styled.ButtonContainer>
      )}
    </Styled.HeaderContainer>
  );
};

export default Header;
