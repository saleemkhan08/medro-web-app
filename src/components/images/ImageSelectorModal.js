import React, { Component } from 'react';
import { connect } from "react-redux";
import ReactFileReader from "thnki-react-file-reader";
import Modal, { ModalHeader } from 'thnki-react-modal';
import { v4 as uuidv4 } from "uuid";
import { storageRef } from "../../store";
import { getProductRef } from "../products/ProductActions";
import { closeImageUploadDialog } from "./imagesActions";
import "./imageSelectorModal.css";
import ImagesGrid from "./ImagesGrid";
class ImageSelectorModal extends Component {
    state = {
        isUploading: false
    }
    render() {
        const { openUploadImgDialog } = this.props.imagesReducer
        const { product } = this.props.imagesReducer
        const { isUploading } = this.state
        return (
            <Modal
                onModalClose={this.onModalClose}
                isClosingDisabled={isUploading}
                openModal={openUploadImgDialog} >
                <ModalHeader text={isUploading ? "Uploading..." : "Upload Images"} />
                <div className="modal-body-container p-b-15">
                    <ImagesGrid product={product}>
                        <UploadBtn isDisabled={isUploading} onImagesUpload={(fileDict) => this.handleImagesUpload(fileDict, product)} />
                    </ImagesGrid>
                </div>
            </Modal >
        )
    }

    handleImagesUpload = (fileDict, product) => {
        this.setState({ isUploading: true })
        const imageList = []
        const len = fileDict.length
        for (let i = 0; i < len; i++) {
            imageList.push(fileDict[i])
        }

        const imageUrls = []
        if (product.images) {
            product.images.forEach((image) => {
                imageUrls.push(image)
            })
        }

        const totalImagesCount = (product && product.images) ? product.images.length + len : len

        imageList.forEach((imageFile) => {
            const imageRef = storageRef.child(product.categoryId + "/" + product.id + "/" + uuidv4());
            imageRef.put(imageFile).then(() => {
                imageRef.getDownloadURL().then(url => {
                    imageUrls.push(url)
                    if (totalImagesCount === imageUrls.length) {
                        product.images = imageUrls
                        this.updateDb(product)
                    }
                })
            })
        })
    }
    updateDb = (product) => {
        getProductRef(product).set(product).then(() => {
            this.setState({ isUploading: false })
        }).catch((err) => {
        })
    }

    onModalClose = () => {
        this.props.dispatch(closeImageUploadDialog())
    }
}

const UploadBtn = (props) => {
    return props.isDisabled ?
        <div className="col-6 col-sm-4 col-md-4 col-lg-3">
            <div className="block2">
                <div className="block2-img wrap-pic-w of-hidden pos-relative center-cropped-mini"
                    style={{ backgroundImage: `url("images/loading-2.gif")` }}>
                </div>
            </div>
        </div>
        : <div className="col-6 col-sm-4 col-md-4 col-lg-3">
            <ReactFileReader
                handleFiles={fileDict => props.onImagesUpload(fileDict)}
                multipleFiles={true}
                fileTypes={[".webp", ".png", ".jpg", ".gif", ".jpeg", ".svg"]}>

                <div className="block2">
                    <div className="block2-img wrap-pic-w of-hidden pos-relative center-cropped-mini"
                        style={{ backgroundImage: `url("images/item-add.jpg")` }}>
                    </div>
                </div>
            </ReactFileReader>
        </div >
}

const mapStateToProps = state => {
    return {
        imagesReducer: state.ImagesReducer,
        productReducer: state.ProductReducer
    };
};

export default connect(
    mapStateToProps
)(ImageSelectorModal);
