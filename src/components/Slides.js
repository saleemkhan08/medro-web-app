import React from "react";
export const Slides = (props) => {
  return (
    <div className="mobile-top-margin">
      <div
        id="carouselIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselIndicators" data-slide-to="1" />
          <li data-target="#carouselIndicators" data-slide-to="2" />
          <li data-target="#carouselIndicators" data-slide-to="3" />
        </ol>
        <div className="carousel-inner">
          <CarouselItem className="carousel-item active" text="Wallets" img="images/wallets.jpg" />
          <CarouselItem className="carousel-item" text="Clutches" img="images/clutches.jpg" />
          <CarouselItem className="carousel-item" text="Passport Holders" img="images/passport-holders.jpg" />
          <CarouselItem className="carousel-item" text="Book Covers" img="images/book-covers.jpg" />
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselIndicators"
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

const CarouselItem = (props) => {
  const { text, img, isTwoWords, ...other } = props
  return (
    <div {...other}>
      <img
        src={img}
        className="d-block slide-img"
        alt="..."
      />
      <div className="carousel-overlay" />
      <div className="carousel-caption carousel-caption-centered d-md-block ">
        <h1 className="carousel-caption-title ">{text}</h1>
      </div>
    </div>
  )
}

export default Slides;
