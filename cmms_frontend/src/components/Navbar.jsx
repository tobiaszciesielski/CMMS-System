import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faColumns, faUserShield } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, logout } = useAuth();

  const renderUserIcon = () => {
    const userIcon = user.role === "admin" ? faUserShield : faUser;
    return <FontAwesomeIcon className="ml-2" icon={userIcon} />;
  };

  const closingToggler = () => {
    const toggler = document.getElementById("navbar-toggler");
    toggler.classList.toggle("collapsed");
    toggler.setAttribute("aria-expanded", "false");
    const menu = document.getElementById("main-menu");
    menu.classList.toggle("show");
  };

  return (
    <Nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
      <span className="navbar-brand mr-0">
        <img
          className="align-bottom"
          src={require("./assets/gestamp_logo.png")}
          alt="Gestamp"
          width="180"
        />
        <h4 className="d-none d-sm-inline ml-2 text-muted">CMMS</h4>
        <h6 className="d-inline d-sm-none ml-2 text-muted">CMMS</h6>{" "}
      </span>

      <button
        id="navbar-toggler"
        className="navbar-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#main-menu"
        aria-controls="main-menu"
        aria-expanded="false"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="main-menu"
      >
        <ul className="navbar-nav d-flex">
          <NavItem className="nav-item">
            <Link to="/dashboard" className="nav-link" onClick={closingToggler}>
              Dashboard
              <FontAwesomeIcon className="ml-2" icon={faColumns} />
            </Link>
          </NavItem>
          <NavItem className="navbar-nav dropdown">
            <NormalText
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              role="button"
            >
              {`${user.firstName}`}
              {renderUserIcon()}
            </NormalText>
            <div
              className="dropdown-menu dropdown-menu-right"
              onClick={closingToggler}
            >
              <Link to="/account" className="dropdown-item">
                Account
              </Link>
              <Link to="/help" className="dropdown-item">
                Help
              </Link>
              <div className="dropdown-divider"></div>
              <NormalText
                onClick={() => logout()}
                id="sign-out-hover"
                className="dropdown-item "
              >
                Sign Out
              </NormalText>
            </div>
          </NavItem>
        </ul>
      </div>
    </Nav>
  );
};

const NormalText = styled.i`
  font-style: normal;
  cursor: pointer;
`;

const Nav = styled.nav`
  box-shadow: 3px 3px 8px rgb(0, 0, 0, 0.1);
`;

const NavItem = styled.li`
  margin-left: 15px;
  font-size: 1.1rem;
`;

export default Navbar;
