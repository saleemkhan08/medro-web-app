import React, { Component } from 'react';
import { connect } from "react-redux";
import AddProductThumbnail from './AddProductThumbnail';
import ProductThumbnail from "./ProductThumbnail";
class Products extends Component {
    render() {
        const { categoryId, catCount } = this.props;
        const { products } = this.props.productReducer;
        const { isLoggedIn } = this.props.authReducer;
        const productsMap = products[categoryId]
        const activeClass = (catCount === 1) ? "show active " : "";
        const areProductsAvailable = productsMap && Object.keys(productsMap).length > 0
        return (
            <div
                key={categoryId}
                className={"tab-pane fade " + activeClass}
                id={categoryId}
                role="tabpanel"
            >
                <ProductTiles
                    isLoggedIn={isLoggedIn}
                    areProductsAvailable={areProductsAvailable}
                    productsMap={productsMap} />
            </div >
        )
    }
}

const ProductTiles = (props) => {
    const { areProductsAvailable, productsMap, isLoggedIn } = props;
    if (areProductsAvailable) {
        return (
            <div className="row">
                {
                    Object.keys(productsMap).map((key) => {
                        const product = productsMap[key];
                        return (
                            <ProductThumbnail
                                key={product.id}
                                product={product}
                            />)

                    })
                }
                <AddProductOption isEmpty={false} isLoggedIn={isLoggedIn} />
            </div>
        )
    } else if (isLoggedIn) {
        return (<AddProductOption isEmpty={true} isLoggedIn />)
    }
    return (<NoProductFound />)
}

const AddProductOption = (props) => {
    const { isLoggedIn, isEmpty } = props;
    if (isEmpty && isLoggedIn) {
        return (
            <div className="row">
                <AddProductThumbnail />
            </div>
        );
    } else if (isLoggedIn) {
        return (<AddProductThumbnail />)
    }
    else {
        return ""
    }
}

const NoProductFound = () => {
    return (
        <div className="row loading-div">
            No Products Found!!!
        </div>
    )
}
const mapStateToProps = state => {
    return {
        productReducer: state.ProductReducer,
        authReducer: state.AuthReducer
    };
};

export default connect(
    mapStateToProps
)(Products);