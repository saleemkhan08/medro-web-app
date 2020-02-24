import React, { Component } from "react";
import { connect } from "react-redux";
import EditProduct from "../products/EditProductModal";
import { fetchProducts } from "../products/ProductActions";
import Products from "../products/Products";
//import EditCategories from "./EditCategories";
import { fetchCategories, setCurrentCategory } from "./CategoryActions";
import EditCategories from "./EditCategoriesModal";
class CategoryTabs extends Component {
    state = {
        showCatModal: false,
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchCategories());
        dispatch(fetchProducts());
    }

    render() {
        const { categories } = this.props.categoryReducer;
        const { isLoggedIn } = this.props.authReducer;
        if (categories && categories.length > 0) {
            return (
                <div className="tab01">
                    <CategoryTabsLinks categories={categories} isLoggedIn={isLoggedIn}
                        editCategories={this.editCategories} onLinkClick={
                            (category) => this.props.dispatch(setCurrentCategory(category))
                        } />
                    <ProductTabContents categories={categories} />
                    <EditCategories showModal={this.state.showCatModal} hideModal={() => { this.hideModal("showCatModal") }} />
                    <EditProduct />
                </div>
            );
        }
        return <div className="loading-div">Loading ...</div>
    }

    editCategories = () => {
        this.setState({
            showCatModal: true
        })
    }

    hideModal = (stateName) => {
        this.setState({
            [stateName]: false
        })
    }
};

const CategoryTabsLinks = (props) => {
    const { categories, isLoggedIn, editCategories, onLinkClick } = props
    let catCount = 0;
    return (
        <ul className="nav nav-tabs" role="tablist">
            {categories.map((category) => {
                catCount++;
                const { id, name } = category
                const activeClass = catCount === 1 ? "active" : "";
                return (
                    <li className="nav-item" key={id}>
                        <a
                            className={"nav-link " + activeClass}
                            data-toggle="tab"
                            href={"#" + id}
                            onClick={() => { onLinkClick(category) }}
                            role="tab">
                            {name}
                        </a>
                    </li>
                );
            })}
            <CategoriesEditOption isLoggedIn={isLoggedIn} editCategories={editCategories} />
        </ul >
    )
}

const CategoriesEditOption = (props) => {
    if (props.isLoggedIn) {
        return (
            <li className="nav-item" >
                <button className="flex-c-m size2 bg4 bo-rad-23 hov1 m-text3 trans-0-4"
                    style={{ paddingRight: 20, paddingLeft: 20 }}
                    onClick={props.editCategories}>
                    Edit
                </button>
            </li>)
    }
    return "";
}

const ProductTabContents = (props) => {
    const { categories } = props
    let catCount = 0;
    return (
        <div className="tab-content p-t-35">
            {
                categories.map((category) => {
                    catCount++
                    return (
                        <Products
                            key={category.id}
                            catCount={catCount}
                            categoryId={category.id}
                        />
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        categoryReducer: state.CategoryReducer,
        productReducer: state.ProductReducer,
        authReducer: state.AuthReducer
    };
};

export default connect(
    mapStateToProps
)(CategoryTabs);