import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal, { ModalFooter, ModalHeader } from "thnki-react-modal";
import Input from '../utilities/Input';
import { hideProductEditModal, saveProduct } from "./ProductActions";
import "./products.css";
class EditProduct extends Component {
    state = {
        name: "",
        price: "",
        description: "",
        amazon: "",
        flipkart: "",
        nameErr: false,
        priceErr: false,
        descriptionErr: false,
        amazonErr: false,
        flipkartErr: false,
        id: undefined,
        categoryId: "",
        images: []
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
                    id: undefined,
                    categoryId: "",
                    images: []
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
                    <Input
                        className="new-product-input"
                        value={this.state.name}
                        name="name"
                        onChange={this.handleOnChange}
                        type="text" placeholder="Product Name"
                        placeholderErr="Name is Required!"
                        isInvalid={this.state.nameErr} />
                    <Input
                        className="new-product-input"
                        value={this.state.price}
                        name="price"
                        onChange={this.handleOnChange}
                        type="text" placeholder="Product Price"
                        placeholderErr="Price is Required!"
                        isInvalid={this.state.priceErr} />
                    <Input
                        className="new-product-input"
                        value={this.state.description}
                        name="description"
                        onChange={this.handleOnChange}
                        type="text"
                        placeholder="Prodcut Description"
                        placeholderErr="Description is Required!"
                        isInvalid={this.state.descriptionErr}
                    />
                    <Input
                        className="new-product-input"
                        value={this.state.amazon}
                        name="amazon"
                        onChange={this.handleOnChange}
                        placeholderErr="Amazon Link is Required!"
                        isInvalid={this.state.amazonErr}
                        type="text" placeholder="Amazon Link" />
                    <Input
                        className="new-product-input"
                        value={this.state.flipkart}
                        onChange={this.handleOnChange}
                        name="flipkart"
                        type="text"
                        placeholderErr="Flipkart Link is Required!"
                        isInvalid={this.state.flipkartErr}
                        placeholder="Flipkart Link" />
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
            flipkart: flipkart,
            images: currentProduct && currentProduct.images ? currentProduct.images : []
        }

        if (name) {
            if (price) {
                if (description) {
                    if (amazon) {
                        if (flipkart) {
                            this.props.dispatch(saveProduct(product))
                        } else {
                            this.showError("flipkartErr")
                        }
                    } else {
                        this.showError("amazonErr")
                    }
                } else {
                    this.showError("descriptionErr")
                }

            } else {
                this.showError("priceErr")
            }
        } else {
            this.showError("nameErr")
        }
    }

    showError = (key) => {
        this.setState({
            [key]: true
        })
        setTimeout(() => {
            this.setState({
                [key]: false
            })
        }, 1000)
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
