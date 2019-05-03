import React from "react";
import { Link } from "react-router-dom";

const links = [
  {
    to: "/",
    text: "Homepage"
  },
  {
    to: "/tests/admin",
    text: "Tests"
  },
  {
    to: "/results/user",
    text: "results"
  },
  {
    to: "/add/doctor",
    text: "addUser"
  },
  {
    to: "/create",
    text: "Create test"
  },
  {
    to: "/list/all/doctor",
    text: "Lists users"
  }
  // {
  //   to: '/profile/2',
  //   text: 'Profile 2'
  // },
  // {
  //   to: '/login',
  //   text: 'Login',
  //   auth: false
  // },
  // {
  //   to: '/dashboard',
  //   text: 'Dashboard',
  //   auth: true
  // },
  // {
  //   to: '/logout',
  //   text: 'Logout',
  //   auth: true
  // },
  // {
  //   to: '/this-is-broken',
  //   text: 'Broken Page'
  // }
];

const isCurrent = (to, current) => {
  if (to === "/" && current === to) {
    return true;
  } else if (to !== "/" && current.includes(to)) {
    return true;
  }

  return false;
};

const HeaderLink = ({ to, text, current }) => (
  <li className={isCurrent(to, current) ? "current" : ""}>
    <Link to={to}>{text}</Link>
  </li>
);

export default ({ isAuthenticated, current, user }) => (
  <header className="uk-section-primary uk-preserve-color uk-margin-bottom">
    <div className="uk-navbar-container uk-container" uk-navbar="">
      <div className="uk-navbar-left ">
        <a className="uk-navbar-item uk-logo uk-preserve-color" href="/">
          Dotaznik
        </a>

        <ul className="uk-navbar-nav">
          {links.map((link, index) => {
            const TheLink = (
              <HeaderLink key={index} current={current} {...link} />
            );

            if (link.hasOwnProperty("auth")) {
              if (link.auth && isAuthenticated) {
                return TheLink;
              } else if (!link.auth && !isAuthenticated) {
                return TheLink;
              }

              return null;
            }

            return TheLink;
          })}
        </ul>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li>
            <a href="/">
              <span
                className="uk-icon uk-margin-small-right"
                uk-icon="icon: user"
              />{" "}
              Pechunka
            </a>
          </li>
          <li>
            <a href="/">Sing In</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
);
