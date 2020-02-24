import React from 'react';
import HeaderLinks from "./headers/HeaderLinks";
export const MainHeader = () => {
    return (
        <div>
            <div className="wrap_header fixed-header2 trans-0-4">
                <a href="index.html" className="logo">
                    <img src="images/medro_name_icon.png" alt="IMG-LOGO" />
                </a>
                <div className="header-icons">
                    <nav className="menu">
                        <HeaderLinks classNames="main_menu" />
                    </nav>
                </div>
            </div>
        </div>
    );
};

export const TransparentHeader = () => {
    return (
        <div className="container-menu-header-v2 logo-header">
            <div className="wrap_header bg-transparent">
                <div className="header-icons">
                    <nav className="menu">
                        <HeaderLinks classNames="main_menu white-menu main_menu2" />
                    </nav>
                </div>

                <div className="header-icons" />
            </div>
            <div className="topbar2 bg-transparent">
                <a href="index.html" className="logo2">
                    <img src="images/medro_title_rounded_shadow.png" alt="IMG-LOGO" />
                </a>
            </div>
        </div>
    );
};


export const MobileHeader = () => {
    return (
        <div className="mobile-fixed-top-header">
            <div className="wrap_header_mobile">
                <a href="index.html" className="logo-mobile">
                    <img src="images/medro_name_icon.png" alt="IMG-LOGO" />
                </a>

                <div className="btn-show-menu">
                    <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
                        <span className="hamburger-box">
                            <span className="hamburger-inner" />
                        </span>
                    </div>
                </div>
            </div>

            <div className="wrap-side-menu">
                <nav className="side-menu">
                    <HeaderLinks classNames="main-menu" linkClass="item-menu-mobile" />
                </nav>
            </div>
        </div>
    );
};
