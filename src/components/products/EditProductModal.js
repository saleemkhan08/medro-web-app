import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal, { ModalFooter, ModalHeader } from "thnki-react-modal";
import { hideProductEditModal, saveProduct } from "./ProductActions";
import "./products.css";
class EditProduct extends Component {
    state = {
        errorMsg: ""
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateProductState = () => {
        const { currentProduct } = this.props.productReducer;
        if (currentProduct) {
            if (this.state.id !== currentProduct.id) {
                if (currentProduct) {
                    this.setState({
                        ...currentProduct
                    })
                }
            }
        } else {
            if (this.state.id !== undefined) {
                this.setState({
                    name: "",
                    price: "",
                    description: "",
                    amazon: "",
                    flipkart: "",
                    id: undefined
                })
            }
        }
    }

    hideModal = () => {
        this.props.dispatch(hideProductEditModal())
    }

    render() {
        const { showProdEditModal, currentProduct } = this.props.productReducer;
        const { currentCategory } = this.props.categoryReducer;
        this.updateProductState()
        return (
            <Modal
                isScrollableBody={false}
                onModalClose={this.hideModal}
                openModal={showProdEditModal}>
                <ModalHeader text="Product Editor" />
                <div className="edit-products-modal-body" >
                    <input
                        className="new-product-input"
                        value={this.state.name}
                        name="name"
                        onChange={this.handleOnChange}
                        type="text" placeholder="PRODUCT NAME" />
                    <input
                        className="new-product-input"
                        value={this.state.price}
                        name="price"
                        onChange={this.handleOnChange}
                        type="text" placeholder="PRODUCT PRICE" />
                    <input
                        className="new-product-input"
                        value={this.state.description}
                        name="description"
                        onChange={this.handleOnChange}
                        type="text" placeholder="PRODUCT DESCRIPTION" />
                    <input
                        className="new-product-input"
                        value={this.state.amazon}
                        name="amazon"
                        onChange={this.handleOnChange}
                        type="text" placeholder="AMAZON LINK" />
                    <input
                        className="new-product-input"
                        value={this.state.flipkart}
                        onChange={this.handleOnChange}
                        name="flipkart"
                        type="text" placeholder="FLIPKART LINK" />
                    <div className="modal-err-msg">{this.state.errorMsg}</div>
                </div>
                <ModalFooter
                    isDisabled={false}
                    acceptText="SAVE"
                    disabledText="SAVING..."
                    cancelText="CANCEL"
                    onCancel={this.hideModal}
                    onAccept={() => { this.validateAndSave(currentProduct, currentCategory) }} />
            </Modal >
        )
    }

    validateAndSave = (currentProduct, currentCategory) => {
        const productId = currentProduct ? currentProduct.id : undefined
        const { amazon, description, flipkart, name, price } = this.state;

        const product = {
            id: productId,
            categoryId: currentCategory.id,
            name: name,
            price: price,
            description: description,
            amazon: amazon,
            flipkart: flipkart
        }

        if (name) {
            if (price) {
                if (description) {
                    if (amazon) {
                        if (flipkart) {
                            this.props.dispatch(saveProduct(product))
                        } else {
                            this.showErrorMsg("Please enter flipkart link")
                        }
                    } else {
                        this.showErrorMsg("Please enter amazon link")
                    }
                } else {
                    this.showErrorMsg("Please enter product description")
                }

            } else {
                this.showErrorMsg("Please enter product price")
            }
        } else {
            this.showErrorMsg("Please enter product name")
        }


    }
    showErrorMsg = (msg) => {
        this.setState({
            errorMsg: msg
        })
        setTimeout(() => {
            this.setState({
                errorMsg: ""
            })
        }, 900);
    }
}

const mapStateToProps = state => {
    return {
        productReducer: state.ProductReducer,
        categoryReducer: state.CategoryReducer
    };
};

export default connect(
    mapStateToProps
)(EditProduct);
