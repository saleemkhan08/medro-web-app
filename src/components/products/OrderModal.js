import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal, { ModalHeader } from "thnki-react-modal";
import { auth, database } from "../../store";
import { showToastMsg } from "../headers/AuthActions";
import ToastMsg from '../utilities/ToastMsg';
import { hideOrderProductModal } from "./ProductActions";
import "./products.css";
class OrderModal extends Component {
    state = {
        errorMsg: "",
        numProduct: 10,
        phoneNo: "",
        email: "",
        name: "",
        uid: "",
        phonePH: "Contact Number",
        ephonePH: "",
        isPlacingOrder: false
    }
    parentId = "OrderModal"
    hideModal = () => {
        this.props.dispatch(hideOrderProductModal())
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    name: user.displayName,
                    email: user.email,
                    phoneNo: user.phoneNumber,
                    uid: user.uid
                })
            }
        })
    }

    showErrorMsg = (key, value) => {
        const initValue = this.state[key]
        this.setState({
            [key]: value,
            ["e" + key]: "err-placeholder"
        })
        setTimeout(() => {
            this.setState({
                [key]: initValue,
                ["e" + key]: ""
            })
        }, 1000);
    }

    placeOrder = (product) => {
        const { numProduct, phoneNo, name, email, uid } = this.state
        if (phoneNo) {
            this.setState({ isPlacingOrder: true })
            database.ref().child("orders").child(uid).push({
                numProduct: numProduct,
                phoneNo: phoneNo,
                name: name,
                email: email,
                productId: product.id,
                categoryId: product.categoryId
            }).then(() => {
                this.setState({ isPlacingOrder: false })
                this.props.dispatch(showToastMsg("Order Placed.", this.parentId))
                setTimeout(() => {
                    this.props.dispatch(showToastMsg("We'll get in touch with you soon", this.parentId))
                }, 1000)
            })
        } else {
            this.showErrorMsg("phonePH", "Phone No. Required!")
        }
    }

    render() {
        const { showOrderProdModal, currentProduct } = this.props.productReducer;
        const disabled = this.state.isPlacingOrder ? "disabled" : ""
        if (!currentProduct) {
            return ""
        }
        return (
            <Modal
                isScrollableBody={false}
                onModalClose={this.hideModal}
                openModal={showOrderProdModal}>
                <ModalHeader text="Place Order" />
                <div className="product-order-body row">
                    <div className="product-order-image-container">
                        <div className="block2">
                            <div className="block2-img wrap-pic-w of-hidden pos-relative center-cropped-2"
                                style={{ backgroundImage: `url(${currentProduct.images[0]})` }}
                            />
                        </div>
                    </div>
                    <div className="product-order-details">
                        <div className="row">
                            <div className="product-detail-name m-text17 p-b-13">
                                {currentProduct.name}
                            </div>
                            <div className="product-detail-price m-text17">
                                {"₹ " + currentProduct.price}
                            </div>
                        </div>
                        <div className="s-text8 p-t-10 product-order-description">
                            {currentProduct.description}
                        </div>
                        <div className="product-order-count">
                            <div className="flex-w of-hidden m-t-10 m-b-10">
                                <button className="color1 flex-c-m size7 bg8 eff2 minus-btn" onClick={() => {
                                    if (this.state.numProduct <= 10) {
                                        this.props.dispatch(showToastMsg("Minimum order is : 10", this.parentId))
                                    }
                                    const numProduct = this.state.numProduct <= 10 ? 10 : this.state.numProduct - 1
                                    this.setState({ numProduct: numProduct })
                                }}>
                                    <i className="fs-12 fa fa-minus" aria-hidden="true"></i>
                                </button>
                                <input onChange={this.handleOnChange}
                                    className="size8 m-text18 t-center num-product" type="number" name="numProduct"
                                    value={this.state.numProduct} />

                                <button className="color1 flex-c-m size7 bg8 eff2 plus-btn" onClick={() => {
                                    const numProduct = this.state.numProduct + 1
                                    this.setState({ numProduct: numProduct })
                                }}>
                                    <i className="fs-12 fa fa-plus" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <input
                                placeholder={this.state.phonePH}
                                className={"product-order-input " + this.state.ephonePH}
                                value={this.state.phoneNo}
                                name="phoneNo"
                                onChange={this.handleOnChange} />
                        </div>
                        <div className="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
                            <button className={"flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 " + disabled} onClick={() => {
                                if (!this.state.isPlacingOrder) {
                                    this.placeOrder(currentProduct)
                                }
                            }}>
                                {this.state.isPlacingOrder ? "Placing Order... " : "Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="modal-err-msg">{this.state.errorMsg}</div>
                <ToastMsg parentId={this.parentId} />
            </Modal >
        )
    }
}

const mapStateToProps = state => {
    return {
        productReducer: state.ProductReducer,
        categoryReducer: state.CategoryReducer,
        authReducer: state.AuthReducer
    };
};

export default connect(
    mapStateToProps
)(OrderModal);