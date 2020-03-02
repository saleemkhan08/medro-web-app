import React from "react";
import { login, logout } from "./AuthActions";
export const LoginLink = props => {
    return (<li className={props.linkClass}>
        <a href="#auth"
            onClick={() => {
                login()
            }}>
            Login
        </a>
    </li>)
}

export const LogoutLink = props => {
    return (<li className={props.linkClass}>
        <a href="#auth"
            onClick={() => {
                logout()
            }}>
            Logout
        </a>
    </li>)
}