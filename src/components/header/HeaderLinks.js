import firebase from "firebase/app";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { auth } from "../../store";
import { onLogin, onLogout } from "../headers/AuthActions";
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
    const provider = new firebase.auth.GoogleAuthProvider();
    return (
      <ul className={classNames}>
        <li className={linkClass}>
          <a href="#about">About</a>
        </li>
        <li className={linkClass}>
          <a href="#products">Products</a>
        </li>
        <li className={linkClass}>
          <a href="#contact">Contact</a>
        </li>
        {
          this.state.isLoggedIn ? <LogoutLink linkClass={linkClass} />
            : <LoginLink linkClass={linkClass} provider={provider} />
        }
      </ul>
    )
  }
}

export default connect()(HeaderLinks);
