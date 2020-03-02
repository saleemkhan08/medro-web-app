import React, { Component } from 'react';
import { connect } from "react-redux";
import AddProductThumbnail from './AddProductThumbnail';
import ProductThumbnail from "./ProductThumbnail";
class Products extends Component {
    render() {
        const { categoryId, catCount } = this.props;
        const { products } = this.props.productReducer;
        const { isAdmin } = this.props.authReducer;
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
                    isAdmin={isAdmin}
                    areProductsAvailable={areProductsAvailable}
                    productsMap={productsMap} />
            </div >
        )
    }
}

const ProductTiles = (props) => {
    const { areProductsAvailable, productsMap, isAdmin } = props;
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
                <AddProductOption isEmpty={false} isAdmin={isAdmin} />
            </div>
        )
    } else if (isAdmin) {
        return (<AddProductOption isEmpty={true} isAdmin />)
    }
    return (<NoProductFound />)
}

const AddProductOption = (props) => {
    const { isAdmin, isEmpty } = props;
    if (isEmpty && isAdmin) {
        return (
            <div className="row">
                <AddProductThumbnail />
            </div>
        );
    } else if (isAdmin) {
        return (<AddProductThumbnail />)
    }
    else {
        return ""
    }
}

const NoProductFound = () => {
    return (
        <div className="row no-products-div">
            <h3>No Products Found !!!</h3>
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