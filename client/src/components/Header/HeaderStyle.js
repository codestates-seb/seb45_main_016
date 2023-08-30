import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  height: 56px;
  width: 100%;
  background-color:; /* Your color *;
  /* Other styles */
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 5px;
  cursor: pointer;
  /* Other styles */

  img {
    width: 150px;
    height: 30px;
    /* Other styles */
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2px;
  /* Other styles */
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  padding: 6px 12px;
  gap: 10px;
  color:  /* Your color *;
  text-decoration: none;
  /* Other styles */ a {
    text-decoration: none;
    color:; /* Your color *;
  }

  &:hover {
    background-color:  /* Your color *;
    border-radius: 50px;
    cursor: pointer;
    /* Other styles */
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  /* Other styles */
  .search-icon {
    position: absolute;
    left: 20px;
    color:; /* Your color *;
    /* Other styles */
  }
`;

const SearchBox = styled.input`
  display: flex;
  flex-direction: center;
  align-items: center;
  width: 656px;
  margin: 0 8px 0 12px;
  padding: 7.8px 9.1px 7.8px 32px;
  border: 1px solid /* Your color */;
  border-radius: 6px;
  gap: 10px;
  color:  /* Your color *;
  text-decoration: none;
  /* Other styles */

  &:focus {
    outline: none;
    border-radius: 6px;
    border: 1px solid /* Your color */;
    box-shadow: 0px 0px 0px 4px /* Your color */;
    /* Other styles */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* Other styles */
`;

const LoginButton = styled.div`
  /* Your styles here */
`;

const SignupButton = styled.div`
  /* Your styles here */
`;

const LoginStateButtonContainer = styled.div`
  /* Your styles here */
`;

const LogoutButton = styled.div`
  /* Your styles here */
`;

const UserAvatar = styled.img`
  /* Your styles here */
`;

export {
  HeaderContainer,
  LogoContainer,
  Nav,
  NavItem,
  InputContainer,
  SearchBox,
  ButtonContainer,
  LoginButton,
  SignupButton,
  LoginStateButtonContainer,
  LogoutButton,
  UserAvatar,
};
