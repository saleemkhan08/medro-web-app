import React from "react";

export const ParallaxContainer = () => {
  return (
    <section
      className="parallax0 parallax100"
      style={{ backgroundImage: `url("images/bg-video-01.jpg")` }}
    >
      <div className="overlay0 p-t-190 p-b-200">
        <div className="flex-col-c-m p-l-15 p-r-15">
          <span className="m-text9 p-t-45 fs-20-sm">The Beauty</span>

          <h3 className="l-text1 fs-35-sm">Lookbook</h3>

          <span
            className="btn-play s-text4 hov5 cs-pointer p-t-25"
            data-toggle="modal"
            data-target="#modal-video-01"
          >
            <i className="fa fa-play" aria-hidden="true" />
            Play Video
              </span>
        </div>
      </div>
    </section>
  );
};

export default ParallaxContainer;
