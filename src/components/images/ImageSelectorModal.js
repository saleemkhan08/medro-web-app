import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal, { ModalFooter, ModalHeader } from 'thnki-react-modal';
import { storageRef } from "../../store";
import { getProductRef } from "../products/ProductActions";
import { closeImageUploadDialog } from "./imagesActions";
import "./imageSelectorModal.css";
import ImagesGrid from "./ImagesGrid";
import UploadImagesGrid from "./UploadImagesGrid";
class ImageSelectorModal extends Component {
    state = {
        openEditDialog: false,
        openAddDialog: false,
        image: undefined,
        searchStr: "",
        imageList: []
    }

    onModalClose = () => {
        const { dispatch } = this.props;
        dispatch(closeImageUploadDialog())
    }

    render() {
        const { openUploadImgDialog } = this.props.imagesReducer
        const { product } = this.props.imagesReducer
        return (
            <Modal
                onModalClose={this.onModalClose}
                openModal={openUploadImgDialog} >
                <ModalHeader text="Upload Images" />
                <div className="modal-body-container">
                    <UploadImagesGrid
                        handleImagesUpload={(imageList) => { this.setState({ imageList: imageList }) }}
                        isDisabled={this.state.uploading} />
                    <ImagesGrid product={product} />
                    <div className="modal-err-msg">{this.state.errorMsg}</div>
                </div>
                <ModalFooter
                    isDisabled={this.state.uploading}
                    acceptText="UPLOAD"
                    disabledText="UPLOADING..."
                    cancelText="CANCEL"
                    onCancel={this.onModalClose}
                    onAccept={this.uploadImages} />
            </Modal >
        )
    }

    uploadImages = () => {
        const { product } = this.props.imagesReducer
        this.setState({ uploading: true })
        const imageUploadPromises = []
        const getDownloadUrlPromises = []
        const productUpdatePromises = []

        const currentImageNo = product.images ? product.images.length : 0;
        this.state.imageList.forEach((imageFile, index) => {
            const imgName = currentImageNo + index
            const imageRef = storageRef.child(product.categoryId + "/" + product.id + "/" + imgName);
            imageUploadPromises.push(imageRef.put(imageFile).then(() => {
                if (!product.images) {
                    product.images = []
                }
                getDownloadUrlPromises.push(imageRef.getDownloadURL().then(url => {
                    product.images.push(url)
                    productUpdatePromises.push(getProductRef(product).set(product))
                }))
            }))
        })

        Promise.all(imageUploadPromises, productUpdatePromises).then(() => {
            this.setState({ uploading: false })
            this.onModalClose()
        })
    }

    hideConfirmation = () => {
        this.setState({
            showConfirmation: false,
            category: {}
        })
    }

    showErrorMsg = () => {
        this.setState({
            errorMsg: "Category name cannot be empty"
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
        categoryReducer: state.CategoryReducer,
        imagesReducer: state.ImagesReducer,
        productReducer: state.ProductReducer
    };
};

export default connect(
    mapStateToProps
)(ImageSelectorModal);
