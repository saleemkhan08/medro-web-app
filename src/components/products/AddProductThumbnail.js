import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showProductEditModal } from "./ProductActions";
class AddProductThumbnail extends Component {
    render() {
        return (
            <div className="col-sm-6 col-md-4 col-lg-3 p-b-50">
                <div className="block2 add-product-container">
                    <div className="block2-img wrap-pic-w of-hidden pos-relative center-cropped"
                        style={{ backgroundImage: `url("images/item-add.jpg")` }}>

                    </div>
                    <div className="block2-overlay trans-0-4">
                        <div className="block2-btn-addcart w-size1 trans-0-4">
                            <button
                                onClick={() => {
                                    this.props.dispatch(showProductEditModal())
                                }}
                                className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                                Add New
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(AddProductThumbnail);
