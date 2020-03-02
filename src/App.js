import React, { Component } from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { connect } from "react-redux";
import "./App.css";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { MainHeader, MobileHeader, TransparentHeader } from "./components/Headers";
import LoginModal from "./components/headers/LoginModal";
import { hideProductImagesGallery } from "./components/images/imagesActions";
import ImageSelectorModal from "./components/images/ImageSelectorModal";
import OrderModal from "./components/products/OrderModal";
import ProductsSection from "./components/ProductsSection";
import Slides from "./components/Slides";
import ToastMsg from "./components/utilities/ToastMsg";
class App extends Component {
  state = {
    photoIndex: 0
  }
  render() {
    const { isAdmin } = this.props.authReducer;
    const { photoIndex } = this.state
    const { galleryImages, showGallery } = this.props.imagesReducer
    return (
      <div>
        <MainHeader />
        <Slides>
          <TransparentHeader />
          <MobileHeader />
        </Slides>
        <AboutSection />
        <ProductsSection />
        <ContactSection />
        <OrderModal />
        <LoginModal />
        <ToastMsg />
        {isAdmin ? <ImageSelectorModal /> : ""}
        {showGallery && (
          <Lightbox
            mainSrc={galleryImages[photoIndex]}
            nextSrc={galleryImages[(photoIndex + 1) % galleryImages.length]}
            prevSrc={galleryImages[(photoIndex + galleryImages.length - 1) % galleryImages.length]}
            onCloseRequest={() => {
              this.setState({
                photoIndex: 0
              })
              this.props.dispatch(hideProductImagesGallery())
            }}
            onMovePrevRequest={() => {
              const prevIndex = (photoIndex + galleryImages.length - 1) % galleryImages.length
              if (galleryImages.length > 1) {
                this.setState({
                  photoIndex: prevIndex
                })
              }
            }}
            onMoveNextRequest={() => {
              const nextIndex = (photoIndex + 1) % galleryImages.length
              if (galleryImages.length > 1) {
                this.setState({
                  photoIndex: nextIndex,
                })
              }
            }}
          />
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authReducer: state.AuthReducer,
    imagesReducer: state.ImagesReducer
  };
};

export default connect(
  mapStateToProps
)(App);