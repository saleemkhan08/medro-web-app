import React, { Component } from 'react'

export default class AboutSection extends Component {
    render() {
        return (
            <div className="bg-grey" id="about" >
                <div className="sec-title">
                    <h3>About Us</h3>
                </div>
                <section className="bg-grey p-b-40">
                    <div className="container bg-grey">
                        <div className="row">
                            <div className="col-md-4" >
                                <div className="bo4 bgwhite p-2" >
                                    <div className="hov-img-zoom" style={{
                                        backgroundImage: `url("images/medro-about-cropped.jpg")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        height: "100%",
                                        width: "100%",
                                        minHeight: "400px",
                                        borderRadius: "2px"
                                    }} />
                                </div>
                            </div>
                            <div className="col-md-8 p-b-30">
                                <h3 className="m-text26 p-b-15 mobile-padding-top">
                                    Our story
					        </h3>
                                <p className="p-b-28">
                                    Phasellus egestas nisi nisi, lobortis ultricies risus semper nec. Vestibulum pharetra ac ante ut pellentesque. Curabitur fringilla dolor quis lorem accumsan, vitae molestie urna dapibus. Pellentesque porta est ac neque bibendum viverra. Vivamus lobortis magna ut interdum laoreet. Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutrum, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula.
					        </p>
                                <div className="bo13 p-l-29 m-l-9 p-b-10">
                                    <p className="p-b-11">
                                        Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.
						        </p>

                                    <span className="s-text7">
                                        - Steve Job’s
						        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
