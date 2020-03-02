import React, { Component } from 'react'
import { connect } from "react-redux"
import { showToastMsg } from "../headers/AuthActions"
class ToastMsg extends Component {
    render() {
        const { toastMsg, toastMsgShowClass, parentId } = this.props.authReducer
        if (toastMsg) {
            this.removeMsg()
        }
        const toggleClass = (this.props.parentId === parentId) ? toastMsgShowClass : ""
        return (
            <div className={"toast-msg-container " + toggleClass}>
                <div className="toast-msg">
                    {toastMsg}
                </div>
            </div>)
    }

    removeMsg = () => {
        setTimeout(() => {
            this.props.dispatch(showToastMsg(undefined))
        }, 3000)
    }
}

const mapStateToProps = state => {
    return {
        authReducer: state.AuthReducer
    };
};

export default connect(mapStateToProps)(ToastMsg)

