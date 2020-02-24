import React, { Component } from 'react';
import CategoryTabs from "./categories/CategoryTabs";
class ProductsSection extends Component {

    render() {
        return (
            <section className="bgwhite p-t-45 p-b-58 below-slide">
                <div className="container">
                    <div className="sec-title p-b-22">
                        <h3 className="m-text5 t-center">Our Products</h3>
                    </div>
                    <CategoryTabs />
                </div>
            </section >);
    }
}

export default ProductsSection;
