import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../App";
import HomeIcon from "./assets/HomeIcon";
import Button from "./Button";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Header = () => {
  const [loginState, setLoginState] = useState(false);
  const [loginSignUp, setLoginSignUp] = useState(false);
  const { user, logOut } = useContext(AppContext);
  // const onClickLogin = () => {
  //   setLoginState(true);
  // };

  const onClickSignUp = () => {
    setLoginSignUp(true);
  };

  const onCloseSignUp = () => {
    setLoginSignUp(false);
  };
  const onCloseLogin = () => {
    setLoginState(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/">
            <div className="header__block">
              <HomeIcon />
              <span className="header__text">Home</span>
            </div>
          </Link>
          {user ? (
            <div className="btn__block">
              <span>{user.email}</span>
              <Button onClick={logOut} text="Log out" />
            </div>
          ) : (
            <div className="btn__block">
              <Button text="Log in" link={"login"} />
              <Button text="Sign up" link={"signUp"} />
            </div>
          )}
        </div>

        {loginState && <LoginForm onCloseLogin={onCloseLogin} />}
        {loginSignUp && <SignUpForm onCloseSignUp={onCloseSignUp} />}
      </div>
      <Outlet />
    </header>
  );
};

export default Header;
