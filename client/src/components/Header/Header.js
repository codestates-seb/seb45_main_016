/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
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
import { toast } from 'react-toastify';
import { GetUserInfo } from '../../utils/API';
// eslint-disable-next-line no-undef
const imageUrl = process.env.PUBLIC_URL + '/Logo.png';
const Header = () => {
  const token = localStorage.getItem('authorization');
  const userName = localStorage.getItem('userName');
  useEffect(() => {
    if (token) {
      GetUserInfo().then((res) =>
        localStorage.setItem('userName', res.data.name),
      );
    }
  }, []);
  const onClickHandler = () => {
    localStorage.clear();
    window.location.reload();
    localStorage.setItem('comId', 1);
  };

  useEffect(() => {
    function clearLocalStorage() {
      toast.error('토큰이 만료되어 로그아웃 되었습니다.');
      localStorage.clear();
      window.location.reload();
    }
    const delayMilliseconds = 60 * 60 * 1000;
    setTimeout(clearLocalStorage, delayMilliseconds);
  }, []);

  const onClickHandlerin = () => {
    localStorage.setItem('licenseListId', 1);
  };
  const onClickHandlercom = () => {
    localStorage.setItem('comId', 1);
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
          <Link to="/info" onClick={onClickHandlerin}>
            <button>LICENSE</button>
          </Link>
          {/* 임시로 목업페이지에 링크 걸었습니다 실제 페이지는 list제거하면 됩니다! */}
          <Link to="/community" onClick={onClickHandlercom}>
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
              <span>{userName}</span>
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