import { HeaderStyle, Logo } from './HeaderStyle';

const Header = () => {
  return (
    <HeaderStyle>
      <Logo>
        <img src="" alt="" />
        logo
      </Logo>
      <button>자격증 정보</button>
      <button>Community</button>
      <button>My Page</button>
      헤더 입니다
      <input></input>
      <button className="login_or_profile" value="">
        login
      </button>
      <button className="signup_or_logout" value="">
        signup
      </button>
    </HeaderStyle>
  );
};

export default Header;
