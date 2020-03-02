import React, { Component } from 'react';
import CategoryTabs from "./categories/CategoryTabs";
class ProductsSection extends Component {

    render() {
        return (
            <div id="products">
                <div className="sec-title" >
                    <h3>Our Products</h3>
                </div>
                <section className="bgwhite p-b-40">
                    <div className="container">
                        <CategoryTabs />
                    </div>
                </section >
            </div>);
    }
}

export default ProductsSection;
