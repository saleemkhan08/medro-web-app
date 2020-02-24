import React, { Component } from 'react'
import ReactFileReader from "thnki-react-file-reader"
export default class UploadImagesGrid extends Component {
    state = {
        imageList: []
    }

    handleImagesUpload = (fileDict) => {
        const imageList = this.state.imageList
        const len = fileDict.length
        for (let i = 0; i < len; i++) {
            imageList.push(fileDict[i])
        }
        this.setState({ imageList: imageList })
        this.props.handleImagesUpload(imageList)
    }

    render() {
        const { imageList } = this.state
        return (
            <div className="row">
                {imageList.map((imgFile, index) => {
                    return (
                        <div className="col-6 col-sm-4 col-md-4 col-lg-3 p-b-40 p-b-40" key={index}>
                            <div className="block2">
                                <div className="block2-img wrap-pic-w of-hidden pos-relative center-cropped-mini"
                                    style={{ backgroundImage: `url(${URL.createObjectURL(imgFile)})` }}>
                                    <div className="block2-overlay trans-0-4">
                                        <a
                                            href="#delete-product"
                                            className="block2-btn-addwishlist block-btn-delete hov-pointer trans-0-4"
                                            onClick={() => {
                                                const imageListTemp = []
                                                imageList.forEach((imgFileTemp, indexTemp) => {
                                                    if (indexTemp !== index) {
                                                        imageListTemp.push(imgFileTemp)
                                                    }
                                                })
                                                this.setState({
                                                    imageList: imageListTemp
                                                })
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
                {
                    this.props.isDisabled ? ""
                        : <div className="col-6 col-sm-4 col-md-4 col-lg-3 p-b-40 p-b-40">
                            <ReactFileReader
                                handleFiles={fileDict => this.handleImagesUpload(fileDict)}
                                multipleFiles={true}
                                fileTypes={[".png", ".jpg", ".gif", ".jpeg", ".svg"]}>
                                <div className="block2">
                                    <div className="block2-img wrap-pic-w of-hidden pos-relative">
                                        <img className="add-thumbnail-bg" src="images/item-add.jpg" alt="" />
                                    </div>
                                </div>
                            </ReactFileReader>
                        </div>
                }

            </div >
        )
    }
}
