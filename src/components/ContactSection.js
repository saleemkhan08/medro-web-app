import React, { Component } from 'react';
import { connect } from "react-redux";
import { auth, database } from "../store";
import { showLoginRequired, showToastMsg } from "./headers/AuthActions";
import { Input, TextArea } from "./utilities/Input";
class ContactSection extends Component {
    state = {
        name: "",
        phoneNo: "",
        email: "",
        message: "",
        nameErr: false,
        phoneNoErr: false,
        emailErr: false,
        messageErr: false,
        errorMsg: "",
        uid: "",
        isSendMsgStarted: false
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("onAuthStateChanged")
                if (this.state.isSendMsgStarted) {
                    this.setState({
                        uid: user.uid,
                    })
                    this.sendMessage()
                    this.setState({ isSendMsgStarted: false })
                } else {
                    this.setState({
                        name: user.displayName,
                        email: user.email,
                        phoneNo: user.phoneNumber,
                        uid: user.uid,
                    })
                }

            }
        })
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    sendMessage = () => {
        const { isLoggedIn } = this.props.authReducer
        const { name,
            phoneNo,
            email,
            message,
            uid } = this.state

        const newMessage = {
            name: name,
            phoneNo: phoneNo,
            email: email,
            message: message
        }
        if (name) {
            if (phoneNo) {
                if (email) {
                    if (message) {
                        if (isLoggedIn) {
                            this.setState({ isSending: true })
                            database.ref().child("messages").child(uid).push(newMessage).then(() => {
                                this.setState({
                                    isSending: false,
                                    name: "",
                                    phoneNo: "",
                                    email: "",
                                    message: ""
                                })
                                this.props.dispatch(showToastMsg("Message Sent"))
                            })
                        } else {
                            this.setState({ isSendMsgStarted: true })
                            this.props.dispatch(showLoginRequired("Please Login to send message!"))
                        }
                    } else {
                        this.showError("messageErr")
                    }
                } else {
                    this.showError("emailErr")
                }
            } else {
                this.showError("phoneNoErr")
            }
        } else {
            this.showError("nameErr")
        }
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

    render() {
        const disabledClass = this.state.isSending ? "disabled" : "";
        return (
            <div id="contact">
                <div className="sec-title bg-grey" >
                    <h3>Contact Us</h3>
                </div>
                <section className="bg-grey">
                    <div className="container">
                        <h4 className="m-text26 address"> 89c, Shakespear Sarani Road, Kolkata, India - 700017 </h4>
                        <h4 className="m-text26 contact-no"> 9880003649 | 9036283553 </h4>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="google-maps-container bo4 p-2 bgwhite">
                                    <iframe title="MedroAddress" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1675.302875624649!2d88.36341259081392!3d22.54385717019818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276e1ba250731%3A0x4c58378d67b7a2cc!2s89%2C%20Shakespeare%20Sarani%20Rd%2C%20Mallik%20Bazar%2C%20Dakshineswar%2C%20Mullick%20Bazar%2C%20Elgin%2C%20Kolkata%2C%20West%20Bengal%20700017!5e0!3m2!1sen!2sin!4v1582649805983!5m2!1sen!2sin" width="100%" height="100%" frameborder="0" style={{ borderRadius: 4 }} allowFullScreen />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h4 className="m-text26 p-b-20 mobile-padding-top">
                                    Send us your message
                                </h4>

                                <div className="bo4 of-hidden size15 m-b-20">
                                    <Input
                                        className="sizefull s-text7 p-l-22 p-r-22"
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        placeholderErr="Please enter your Name"
                                        isInvalid={this.state.nameErr}
                                        onChange={this.handleOnChange}
                                        value={this.state.name} />
                                </div>

                                <div className="bo4 of-hidden size15 m-b-20">
                                    <Input className="sizefull s-text7 p-l-22 p-r-22"
                                        type="text"
                                        name="phoneNo"
                                        onChange={this.handleOnChange}
                                        value={this.state.phoneNo}
                                        placeholder="Contact Number"
                                        placeholderErr="Please enter your Phone No."
                                        isInvalid={this.state.phoneNoErr} />
                                </div>

                                <div className="bo4 of-hidden size15 m-b-20">
                                    <Input className="sizefull s-text7 p-l-22 p-r-22"
                                        type="text"
                                        name="email"
                                        onChange={this.handleOnChange}
                                        value={this.state.email}
                                        placeholder="Email"
                                        placeholderErr="Please enter your Email"
                                        isInvalid={this.state.emailErr} />
                                </div>

                                <TextArea className="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20"
                                    name="message"
                                    onChange={this.handleOnChange}
                                    value={this.state.message}
                                    placeholder="Message"
                                    placeholderErr="Please enter your Message"
                                    isInvalid={this.state.messageErr}
                                />
                                <div className="w-size25">
                                    <button
                                        className={"flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4 " + disabledClass}
                                        onClick={() => {
                                            console.log("Clicked this.state.isSending: ", this.state.isSending)
                                            if (!this.state.isSending) {
                                                this.sendMessage()
                                            }
                                        }}>
                                        {this.state.isSending ? "Sending..." : "Send"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
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
)(ContactSection);