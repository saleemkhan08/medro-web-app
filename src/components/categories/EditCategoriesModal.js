import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal, { ConfirmationModal, ModalHeader } from 'thnki-react-modal';
import { InputBtnGroup } from "../utilities/Input";
import "./categories.css";
import { addCategory, editCategory, removeCategory } from "./CategoryActions";
class EditCategories extends Component {
    state = {
        categoryName: "",
        categoryNameErr: false,
        isInitialized: false,
        editCategoryId: "",
        addCategoryName: "",
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

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { categories } = this.props.categoryReducer;
        const { showModal, hideModal } = this.props
        const { showConfirmation, category } = this.state
        this.initializeState()
        return (
            <Modal
                isScrollableBody={false}
                onModalClose={hideModal}
                openModal={showModal} >
                <ModalHeader text="Edit Categories" />
                {this.editCategoriesBody(categories)}
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

    editCategoriesBody = (categories) => {
        return (
            <div className="edit-categories-modal-body" >
                {categories.map((category) => {
                    const { id, name } = category
                    return (
                        <div key={id}>
                            <div className={this.state[id + "css"] === "hidden-edit" ? "category-row" : "hidden-edit"} >
                                <span className="flex-item category-text">
                                    {name}
                                </span>
                                {this.editButton(id)}
                                {this.deleteButton(category)}
                            </div>
                            {this.editCategoryInput(id)}
                        </div>);
                })}
                {this.addCategoryInput()}
            </div>
        )
    }

    editButton = (id) => {
        return (
            <span className="flex-item category-name-edit"
                onClick={() => {
                    this.setState({
                        [id + "css"]: ""
                    })
                }}>
                <i className="fs-12 fa fa-edit" aria-hidden="true" />
            </span>
        )
    }

    deleteButton = (category) => {
        return (
            <span className="flex-item category-delete" onClick={() => {
                this.setState({
                    isInitialized: false,
                    showConfirmation: true,
                    category: category
                })
                this.initializeState()
            }}>
                <i className="fs-12 fa fa-close" aria-hidden="true"></i>
            </span>
        )
    }
    editCategoryInput = (id) => {
        return (
            <InputBtnGroup
                className={"category-row add-category-row " + this.state[id + "css"]}
                value={this.state[id + "name"]}
                name={[id + "name"]}
                placeholderErr="Category Name cannot be empty"
                isInvalid={this.state[id + "Err"]}
                onChange={this.handleOnChange}
                buttonTxt="UPDATE"
                onClick={() => {
                    this.editExistingCategory(id)
                }}
            />
        )
    }

    editExistingCategory = (id) => {
        const categoryname = this.state[id + "name"]
        if (categoryname && categoryname !== "") {
            this.props.dispatch(editCategory(id, categoryname))
            this.setState({
                [id + "css"]: "hidden-edit",
                isInitialized: false,
            })
            this.initializeState()
        } else {
            this.showError(id + "Err");
        }
    }

    addCategoryInput = () => {
        return (
            <InputBtnGroup
                value={this.state.addCategoryName}
                name="addCategoryName"
                placeholder="New Category Name"
                placeholderErr="Category Name cannot be empty"
                buttonTxt="ADD"
                isInvalid={this.state.categoryNameErr}
                onChange={this.handleOnChange}
                onClick={() => {
                    this.addNewCategory()
                }}
            />
        )
    }

    addNewCategory = () => {
        const { addCategoryName } = this.state;
        if (addCategoryName && addCategoryName !== "") {
            this.props.dispatch(addCategory(addCategoryName))
            this.setState({
                isInitialized: false,
                addCategoryName: ""
            })
            this.initializeState()
        } else {
            this.showError("categoryNameErr");
        }
    }

    hideConfirmation = () => {
        this.setState({
            showConfirmation: false,
            category: {}
        })
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
        categoryReducer: state.CategoryReducer
    };
};

export default connect(
    mapStateToProps
)(EditCategories);
