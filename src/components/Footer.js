import React from "react";

export const Footer = () => {
  return (
    <div>
      <footer className="bg6 p-t-25 p-b-25">
        <div className="t-center s-text8">
          Copyright © MEDRO-2020 All rights reserved
        </div>
      </footer>
      <div className="btn-back-to-top bg0-hov" id="myBtn">
        <span className="symbol-btn-back-to-top">
          <i className="fa fa-angle-double-up" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
};
export default Footer;
