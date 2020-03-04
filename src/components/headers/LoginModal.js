import React, { Component } from 'react'
import { connect } from "react-redux"
import { ConfirmationModal } from "thnki-react-modal"
import { hideLoginRequired } from "../headers/AuthActions"
import { login } from "./AuthActions"
class LoginModal extends Component {
    render() {
        const { showLoginRequired, loginRequiredMsg } = this.props.authReducer
        return (
            <ConfirmationModal
                onAccept={() => {
                    this.props.dispatch(hideLoginRequired())
                    login()
                }}
                acceptText="LOGIN"
                cancelText="CANCEL"
                showConfirmation={showLoginRequired}
                onCancel={() => { this.props.dispatch(hideLoginRequired()) }}
                confirmationText={loginRequiredMsg} />
        )
    }
}

const mapStateToProps = state => {
    return {
        authReducer: state.AuthReducer
    };
};

export default connect(
    mapStateToProps
)(LoginModal);


