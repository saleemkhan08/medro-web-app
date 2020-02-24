import React from "react";
export const Slides = (props) => {
  return (
    <div className="mobile-top-margin">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
          <li data-target="#carouselExampleIndicators" data-slide-to="3" />
        </ol>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="images/wallets.jpg"
              className="d-block slide-img"
              alt="..."
            />
            <div className="carousel-overlay" />
            <div className="carousel-caption carousel-caption-centered d-md-block">
              <h1 className="carousel-caption-title">Wallets</h1>
              <button type="button" className="btn btn-outline-white">
                SHOP NOW
              </button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/clutches.jpg"
              className="d-block slide-img"
              alt="..."
            />
            <div className="carousel-overlay" />
            <div className="carousel-caption carousel-caption-centered d-md-block">
              <h1 className="carousel-caption-title">Clutches</h1>
              <button type="button" className="btn btn-outline-white">
                SHOP NOW
              </button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/passport-holders.jpg"
              className="d-block slide-img"
              alt="..."
            />
            <div className="carousel-overlay" />
            <div className="carousel-caption carousel-caption-centered  d-md-block">
              <h1 className="carousel-caption-title">Passport Holders</h1>
              <button type="button" className="btn btn-outline-white">
                SHOP NOW
              </button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/book-covers.jpg"
              className="d-block slide-img"
              alt="..."
            />
            <div className="carousel-overlay" />
            <div className="carousel-caption carousel-caption-centered  d-md-block">
              <h1 className="carousel-caption-title">Book Covers</h1>
              <button type="button" className="btn btn-outline-white">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
      {props.children}
    </div>
  );
};

export default Slides;
