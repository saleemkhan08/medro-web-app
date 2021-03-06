import React, { Component } from 'react';
import { connect } from "react-redux";
import { auth } from "../../store";
import { onLogin, onLogout } from "./AuthActions";
import { LoginLink, LogoutLink } from "./NavigationLinks";
class HeaderLinks extends Component {
  state = {
    isLoggedIn: false
  }
  componentDidMount() {
    const { dispatch } = this.props;
    auth.onAuthStateChanged((user) => {
      this.setState({ isLoggedIn: user ? true : false })
      if (user) {
        dispatch(onLogin(user))
      } else {
        dispatch(onLogout())
      }
    })
  }

  render() {
    const { classNames, linkClass } = this.props
    return (
      <ul className={classNames}>
        <li className={linkClass}>
          <a href="#about" className="full-width-height">About</a>
        </li>
        <li className={linkClass}>
          <a href="#products" className="full-width-height">Products</a>
        </li>
        <li className={linkClass}>
          <a href="#contact" className="full-width-height">Contact</a>
        </li>
        {
          this.state.isLoggedIn ? <LogoutLink linkClass={linkClass} />
            : <LoginLink linkClass={linkClass} />
        }
      </ul>
    )
  }
}

export default connect()(HeaderLinks);
