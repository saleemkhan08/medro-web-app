/*
Show Uploaded Images
Handle deleting Images
*/
import React, { Component } from 'react';
import { ConfirmationModal } from "thnki-react-modal";
import { storage } from "../../store";
import { getProductRef } from "../products/ProductActions";
export default class ImagesGrid extends Component {
    state = {
        showConfirmation: false,
        imageNo: undefined,
        isDeleteing: false,
        imageUrl: ""
    }

    render() {
        const { product, children } = this.props
        const imageList = product.images
        const { isDeleteing, showConfirmation } = this.state
        if (imageList && imageList.length > 0) {
            return (
                <div className="row">
                    {imageList.map((image, index) => {
                        return (
                            <div className="col-6 col-sm-4 col-md-4 col-lg-3 p-b-20" key={index}>
                                <div className="block2">
                                    <div className="block2-img wrap-pic-w of-hidden pos-relative center-cropped-mini"
                                        style={{ backgroundImage: `url(${image})` }}>
                                        <div className="block2-overlay trans-0-4">
                                            <a
                                                href="#delete-product"
                                                className="block2-btn-addwishlist block-btn-delete hov-pointer trans-0-4"
                                                onClick={() => {
                                                    if (!isDeleteing) {
                                                        this.setState({ showConfirmation: true, imageNo: index, imageUrl: image })
                                                    }
                                                }}
                                            >
                                                <i
                                                    className="fa fa-trash-o"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })}
                    {children}
                    <ConfirmationModal
                        isDisabled={isDeleteing}
                        onAccept={() => {
                            this.deleteImage(product)
                        }}
                        acceptText="OK"
                        cancelText="CANCEL"
                        showConfirmation={showConfirmation}
                        onCancel={this.hideConfirmation}
                        confirmationText={isDeleteing ? "Deleting..." : "Are you sure you want to delete this Image ?"} />
                </div >
            )
        } else {
            return <div className="row">{children}</div>
        }

    }
    deleteImage = (product) => {
        this.setState({ isDeleteing: true })
        product.images.splice(this.state.imageNo, 1)
        const images = []
        product.images.forEach((img) => {
            if (img) images.push(img)
        })

        product.images = images
        
        storage.refFromURL(this.state.imageUrl)
            .delete().then(() => {
                getProductRef(product).set(product).then(() => {
                    this.setState({ isDeleteing: false, showConfirmation: false })
                })
            })
    }

    hideConfirmation = () => {
        this.setState({ showConfirmation: false })
    }
}
