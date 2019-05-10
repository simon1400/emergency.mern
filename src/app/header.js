import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logoutUser } from "../modules/auth";

const adminLinks = [
  {
    to: "/tests/admin",
    text: "All tests",
    type: "admin",
    icon: 'list'
  },
  {
    to: "/create",
    text: "Create test",
    type: "admin",
    icon: 'plus'
  },
  {
    to: "/list/all/doctor",
    text: "Lists doctors",
    type: "admin",
    icon: 'users'
  }
];

const doctorLinks = [
  {
    to: "/list/all/pacient",
    text: "Lists pacient",
    type: "doctor",
    icon: 'users'
  },
];

const pacientLinks = [
  {
    to: "/tests/pacient",
    text: "Tests",
    type: "pacient",
    icon: 'list'
  },
  {
    to: "/results/pacient",
    text: "Results",
    type: "pacient",
    icon: 'star'
  }
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          to: "/",
          text: "Homepage",
          type: "all",
          icon: 'home'
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
      <Fragment>
        <header className="uk-preserve-color uk-margin-bottom">
          <div className="uk-navbar-container">
            <div className="uk-container" uk-navbar="">
              <div className="uk-navbar-left">
                <a className="uk-navbar-item uk-logo uk-preserve-color" href="/">
                  Dotaznik
                </a>

                <ul className="uk-navbar-nav uk-visible@s">
                  {menu.map((link, index) => (
                    <li key={index}>
                      <Link  to={link.to}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="uk-navbar-right uk-visible@s">
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
          </div>
        </header>
        <div className="controlPanel uk-hidden@s" >
          <ul>
            {menu.map((link, index) => (
              <li key={index}>
                <Link  to={link.to} title={link.text}><span uk-icon={`icon: ${link.icon}`}></span></Link>
              </li>
            ))}
            <li>
              {this.props.isAuthenticated ? <a nohref="" onClick={this.onLogout}><span uk-icon="icon: sign-out"></span></a> : ''}
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logoutUser }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Header);
