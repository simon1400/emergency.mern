import React, { Component } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logoutUser } from "../modules/auth";

const adminLinks = [
  {
    to: "/tests/admin",
    text: "All tests",
    type: "admin"
  },
  {
    to: "/add/doctor",
    text: "Vytvorit doctora",
    type: "admin"
  },
  {
    to: "/create",
    text: "Create test",
    type: "admin"
  },
  {
    to: "/list/all/doctor",
    text: "Lists doctors",
    type: "admin"
  }
];

const doctorLinks = [
  {
    to: "/list/all/pacient",
    text: "Lists pacient",
    type: "doctor"
  },
  {
    to: "/add/pacient",
    text: "Vytvorit pacienta",
    type: "doctor"
  }
];

const pacientLinks = [
  {
    to: "/tests/pacient",
    text: "Tests",
    type: "pacient"
  },
  {
    to: "/results/pacient",
    text: "Results",
    type: "pacient"
  }
];

const HeaderLink = ({ to, text }) => (
  <li>
    <Link to={to}>{text}</Link>
  </li>
);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          to: "/",
          text: "Homepage",
          type: "all"
        }
      ],
      user: {}
    };
  }

  onLogout = () => {
    this.props.logoutUser();
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.user.typeUser === "admin" && this.state.menu.length === 1) {
      this.setState({
        menu: [...this.state.menu, ...adminLinks]
      });
    } else if (
      nextProps.user.typeUser === "doctor" &&
      this.state.menu.length === 1
    ) {
      this.setState({
        menu: [...this.state.menu, ...doctorLinks]
      });
    } else if (
      nextProps.user.typeUser === "pacient" &&
      this.state.menu.length === 1
    ) {
      this.setState({
        menu: [...this.state.menu, ...pacientLinks]
      });
    }

    return true;
  }

  render() {
    var menu = this.state.menu;
    return (
      <header className="uk-section-primary uk-preserve-color uk-margin-bottom">
        <div className="uk-navbar-container uk-container" uk-navbar="">
          <div className="uk-navbar-left ">
            <a className="uk-navbar-item uk-logo uk-preserve-color" href="/">
              Dotaznik
            </a>

            <ul className="uk-navbar-nav">
              {menu.map((link, index) => {
                const TheLink = <HeaderLink key={index} {...link} />;

                if (link.hasOwnProperty("auth")) {
                  if (
                    link.auth &&
                    link.type === "admin" &&
                    this.props.isAuthenticated &&
                    this.props.user.typeUser === "admin"
                  ) {
                    return TheLink;
                  } else if (
                    link.auth &&
                    this.props.isAuthenticated &&
                    link.type !== "admin"
                  ) {
                    return TheLink;
                  } else if (!link.auth && !this.props.isAuthenticated) {
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
                  />
                  {this.props.user.name + " " + this.props.user.surname}
                </a>
              </li>
              <li>
                {this.props.isAuthenticated ? (
                  <a nohref="" onClick={this.onLogout}>
                    Log out
                  </a>
                ) : (
                  <a href="/">Sing In</a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logoutUser }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Header);
