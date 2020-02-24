import React from "react";

export const ParallaxContainer = () => {
  return (
    <section className="blog bgwhite p-t-94 p-b-65">
      <div className="container">
        <div className="sec-title p-b-52">
          <h3 className="m-text5 t-center">Our Blog</h3>
        </div>

        <div className="row">
          <div className="col-sm-10 col-md-4 p-b-30 m-l-r-auto">
            <div className="block3">
              <a
                href="blog-detail.html"
                className="block3-img dis-block hov-img-zoom"
              >
                <img src="images/blog-01.jpg" alt="IMG-BLOG" />
              </a>

              <div className="block3-txt p-t-14">
                <h4 className="p-b-7">
                  <a href="blog-detail.html" className="m-text11">
                    Black Friday Guide: Best Sales & Discount Codes
                      </a>
                </h4>
                <span className="s-text6">By</span>{" "}
                <span className="s-text7">Nancy Ward</span>
                <span className="s-text6">on</span>{" "}
                <span className="s-text7">July 22, 2017</span>
                <p className="s-text8 p-t-16">
                  Duis ut velit gravida nibh bibendum commodo. Sus-pendisse
                  pellentesque mattis augue id euismod. Inter-dum et
                  malesuada fames
                    </p>
              </div>
            </div>
          </div>

          <div className="col-sm-10 col-md-4 p-b-30 m-l-r-auto">
            <div className="block3">
              <a
                href="blog-detail.html"
                className="block3-img dis-block hov-img-zoom"
              >
                <img src="images/blog-02.jpg" alt="IMG-BLOG" />
              </a>

              <div className="block3-txt p-t-14">
                <h4 className="p-b-7">
                  <a href="blog-detail.html" className="m-text11">
                    The White Sneakers Nearly Every Fashion Girls Own
                      </a>
                </h4>
                <span className="s-text6">By</span>{" "}
                <span className="s-text7">Nancy Ward</span>
                <span className="s-text6">on</span>{" "}
                <span className="s-text7">July 18, 2017</span>
                <p className="s-text8 p-t-16">
                  Nullam scelerisque, lacus sed consequat laoreet, dui enim
                  iaculis leo, eu viverra ex nulla in tellus. Nullam nec
                  ornare tellus, ac fringilla lacus. Ut sit ame
                    </p>
              </div>
            </div>
          </div>

          <div className="col-sm-10 col-md-4 p-b-30 m-l-r-auto">
            <div className="block3">
              <a
                href="blog-detail.html"
                className="block3-img dis-block hov-img-zoom"
              >
                <img src="images/blog-03.jpg" alt="IMG-BLOG" />
              </a>

              <div className="block3-txt p-t-14">
                <h4 className="p-b-7">
                  <a href="blog-detail.html" className="m-text11">
                    New York SS 2018 Street Style: Annina Mislin
                      </a>
                </h4>
                <span className="s-text6">By</span>{" "}
                <span className="s-text7">Nancy Ward</span>
                <span className="s-text6">on</span>{" "}
                <span className="s-text7">July 2, 2017</span>
                <p className="s-text8 p-t-16">
                  Proin nec vehicula lorem, a efficitur ex. Nam vehicula
                  nulla vel erat tincidunt, sed hendrerit ligula porttitor.
                  Fusce sit amet maximus nunc
                    </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxContainer;
