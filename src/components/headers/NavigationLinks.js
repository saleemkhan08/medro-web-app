import React from "react";
import { auth } from "../../store";
export const LoginLink = props => {
    return (<li className={props.linkClass}>
        <a href="#auth"
            onClick={() => {
                auth.signInWithPopup(props.provider);
            }}>
            Login
        </a>
    </li>)
}

export const LogoutLink = props => {
    return (<li className={props.linkClass}>
        <a href="#auth"
            onClick={() => {
                auth.signOut();
            }}>
            Logout
        </a>
    </li>)
}