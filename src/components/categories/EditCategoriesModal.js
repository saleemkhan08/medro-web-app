import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal, { ConfirmationModal, ModalHeader } from 'thnki-react-modal';
import "./categories.css";
import { addCategory, editCategory, removeCategory } from "./CategoryActions";
class EditCategories extends Component {
    state = {
        categoryName: "",
        isInitialized: false,
        editCategoryId: "",
        addCategoryName: "",
        errorMsg: "",
        showConfirmation: false,
        category: {}
    }
    initializeState = () => {
        if (!this.state.isInitialized) {
            const { categories } = this.props.categoryReducer;
            if (categories && categories.length > 0) {
                categories.forEach(category => {
                    this.setState({
                        [category.id + "css"]: "hidden-edit",
                        [category.id + "name"]: category.name,
                    })
                });
                this.setState({
                    isInitialized: true
                })
            }
        }
    }

    render() {
        const { categories } = this.props.categoryReducer;
        const { showModal, hideModal } = this.props
        const { showConfirmation, category, errorMsg } = this.state
        this.initializeState()
        return (
            <Modal
                isScrollableBody={false}
                onModalClose={hideModal}
                openModal={showModal} >
                <ModalHeader text="Edit Categories" />
                <div className="edit-categories-modal-body" >
                    {categories.map((category) => {
                        const { id, name } = category
                        return (
                            <div key={id}>
                                <div className={this.state[id + "css"] === "hidden-edit" ? "category-row" : "hidden-edit"} >
                                    <span className="flex-item category-text">
                                        {name}
                                    </span>
                                    <span className="flex-item category-name-edit" onClick={() => {
                                        this.setState({
                                            [id + "css"]: ""
                                        })
                                    }}>
                                        <i className="fs-12 fa fa-edit" aria-hidden="true"></i>
                                    </span>
                                    <span className="flex-item category-delete" onClick={() => {
                                        //this.props.dispatch(removeCategory(id))
                                        this.setState({
                                            isInitialized: false,
                                            showConfirmation: true,
                                            category: category
                                        })
                                        this.initializeState()
                                    }}>
                                        <i className="fs-12 fa fa-close" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <div className={"category-row add-category-row edit-category-name " + this.state[id + "css"]}>
                                    <input
                                        className="new-category-input"
                                        value={this.state[id + "name"]}
                                        onChange={(event) => {
                                            this.setState({
                                                [id + "name"]: event.target.value
                                            })
                                        }}
                                        type="text" placeholder={name} />
                                    <button onClick={() => {
                                        const categoryname = this.state[id + "name"]
                                        if (categoryname && categoryname !== "") {
                                            this.props.dispatch(editCategory(id, categoryname))
                                            this.setState({
                                                [id + "css"]: "hidden-edit",
                                                isInitialized: false,
                                            })
                                            this.initializeState()
                                        } else {
                                            this.showErrorMsg();
                                        }

                                    }} className="swal-button add-category-btn">UPDATE</button>
                                </div>
                            </div>);
                    })}
                    <div className="category-row add-category-row">
                        <input
                            className="new-category-input"
                            value={this.state.addCategoryName}
                            onChange={(event) => {
                                this.setState({
                                    addCategoryName: event.target.value
                                })
                            }}
                            type="text" placeholder="CATEGORY NAME"></input>
                        <button onClick={() => {
                            const { addCategoryName } = this.state;
                            if (addCategoryName && addCategoryName !== "") {
                                this.props.dispatch(addCategory(addCategoryName))
                                this.setState({
                                    isInitialized: false,
                                    addCategoryName: ""
                                })
                                this.initializeState()
                            } else {
                                this.showErrorMsg();
                            }
                        }} className="swal-button add-category-btn">ADD</button>
                    </div>
                    <div className="modal-err-msg">{errorMsg}</div>
                </div>
                <ConfirmationModal
                    onAccept={() => {
                        this.props.dispatch(removeCategory(category.id))
                        this.hideConfirmation()
                    }}
                    acceptText="OK"
                    cancelText="CANCEL"
                    showConfirmation={showConfirmation}
                    onCancel={this.hideConfirmation}
                    confirmationText={`Are you sure you want to delete ${category.name} ?`} />
            </Modal>
        )
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
        categoryReducer: state.CategoryReducer
    };
};

export default connect(
    mapStateToProps
)(EditCategories);
