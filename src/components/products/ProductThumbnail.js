import React, { Component } from 'react';
import { connect } from "react-redux";
import { ConfirmationModal } from "thnki-react-modal";
import { openImageUploadDialog } from "../images/imagesActions";
import { deleteProduct, showProductEditModal } from "./ProductActions";
import "./products.css";
class ProductThumbnail extends Component {
    state = {
        showConfirmation: false
    }

    render() {
        const { product } = this.props
        const { name, price } = product
        const { showConfirmation } = this.state
        const mainImage = product.images && product.images.length > 0 ? product.images[0] : "images/item-01.jpg";
        return (
            <div className="col-sm-6 col-md-4 col-lg-3 p-b-50" >
                <div className="block2">
                    <div className="block2-img wrap-pic-w of-hidden pos-relative center-cropped"
                        style={{ backgroundImage: `url(${mainImage})` }}>
                        <div className="block2-overlay trans-0-4">
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

                            <div className="block2-btn-addcart w-size1 trans-0-4">
                                <button className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="block2-txt p-t-20">
                        <a
                            href="product-detail.html"
                            className="block2-name dis-block s-text3 p-b-5"
                        >
                            {name}
                        </a>

                        <span className="block2-price m-text6 p-r-5">
                            {"₹ " + price}
                        </span>
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
    hideConfirmation = () => {
        this.setState({
            showConfirmation: false
        })
    }
}

const mapStateToProps = state => {
    return {
        productReducer: state.ProductReducer
    };
};

export default connect(mapStateToProps)(ProductThumbnail)