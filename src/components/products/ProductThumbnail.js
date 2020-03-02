import React, { Component } from 'react';
import { connect } from "react-redux";
import { ConfirmationModal } from "thnki-react-modal";
import { showLoginRequired } from "../headers/AuthActions";
import { openImageUploadDialog, showProductImages } from "../images/imagesActions";
import { deleteProduct, showOrderProductModal, showProductEditModal } from "./ProductActions";
import "./products.css";
class ProductThumbnail extends Component {
    state = {
        showConfirmation: false
    }

    orderProduct = (product) => {
        const { isLoggedIn } = this.props.authReducer;
        if (isLoggedIn) {
            this.props.dispatch(showOrderProductModal(product))
        } else {
            this.props.dispatch(showLoginRequired("Please login to place the order!"))
        }

    }

    showGallery = (product) => {
        this.props.dispatch(showProductImages(product))
    }
    render() {
        const { product } = this.props
        const { name, price } = product
        const { isAdmin } = this.props.authReducer;
        const { showConfirmation } = this.state
        const mainImage = product.images && product.images.length > 0 ? product.images[0] : "images/item-01.jpg";
        return (
            <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="block2 thumbnail-prod">
                    <div className="block2-img wrap-pic-w of-hidden pos-relative center-cropped thumbnail-prod-img"
                        style={{ backgroundImage: `url(${mainImage})` }} >
                        <div className="block2-overlay trans-0-4" onClick={(event) => {
                            console.log(">>>>>>>>>>>>>>>> Background : ", event.currentTarget, event.target)
                            if (event.target === event.currentTarget)
                                this.showGallery(product)
                        }}>
                            {isAdmin ?
                                this.getEditOptions(product)
                                : ""
                            }
                            <div className="block2-btn-addcart w-size1 trans-0-4">
                                <button className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4"
                                    onClick={(event) => {
                                        console.log(">>>>>>>>>>>>>>>> Button : ", event.currentTarget)
                                        if (event.target === event.currentTarget) {
                                            this.orderProduct(product)
                                        }
                                    }}>
                                    Bulk Order
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="prod-details-container">
                        <div className="prod-details">
                            <div className="prod-name s-text3">
                                {name}
                            </div>

                            <div className="prod-price m-text6">
                                {"₹ " + price}
                            </div>
                        </div>
                        <div className="buy-container">
                            <div className="buy-buttons">
                                <img src="images/amazon-logo.png" className="buyLogo" alt="amazon" />
                                <img src="images/flipkart-logo.png" className="buyLogo" alt="flipkart" />
                            </div>
                        </div>
                    </div>
                </div>
                <ConfirmationModal
                    onAccept={() => {
                        this.props.dispatch(deleteProduct(product))
                        this.hideConfirmation()
                    }}
                    acceptText="OK"
                    cancelText="CANCEL"
                    showConfirmation={showConfirmation}
                    onCancel={this.hideConfirmation}
                    confirmationText={`Are you sure you want to delete ${product.name} ?`} />
            </div>
        )
    }
    getEditOptions = (product) => {
        return (
            <div>
                <a
                    href="#edit-product"
                    className="block2-btn-addwishlist block-btn-edit-product hov-pointer trans-0-4"
                    onClick={() => {
                        this.props.dispatch(showProductEditModal(product))
                    }}
                >
                    <i
                        className="icon_pencil-edit"
                        aria-hidden="true"
                    />
                </a>

                <a
                    href="#product-images"
                    className="block2-btn-addwishlist block-btn-add-images hov-pointer trans-0-4"
                    onClick={() => {
                        this.props.dispatch(openImageUploadDialog(product))
                    }}
                >
                    <i
                        className="icon_images"
                        aria-hidden="true"
                    />
                </a>

                <a
                    href="#delete-product"
                    className="block2-btn-addwishlist block-btn-delete hov-pointer trans-0-4"
                    onClick={() => {
                        this.setState({ showConfirmation: true })
                    }}
                >
                    <i
                        className="fa fa-trash-o"
                        aria-hidden="true"
                    />
                </a>
            </div>)
    }
    hideConfirmation = () => {
        this.setState({
            showConfirmation: false
        })
    }
}

const mapStateToProps = state => {
    return {
        productReducer: state.ProductReducer,
        authReducer: state.AuthReducer
    };
};

export default connect(mapStateToProps)(ProductThumbnail)