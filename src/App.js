import React, { Component } from "react";
import "./App.css";
import Footer from "./components/Footer";
import { MainHeader, MobileHeader, TransparentHeader } from "./components/Headers";
import ImageSelectorModal from "./components/images/ImageSelectorModal";
import ProductsSection from "./components/ProductsSection";
import Slides from "./components/Slides";

class App extends Component {
  render() {
    return (
      <div>
        <MainHeader />
        <Slides>
          <TransparentHeader />
          <MobileHeader />
        </Slides>
        <ProductsSection />
        <ImageSelectorModal />
        <Footer />
      </div>
    );
  }
}
export default App;