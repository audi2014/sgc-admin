import React, {Component} from 'react';
import {E_CODE_ARG_MISSING, MSG_MODE_MODAL} from "../badcode/Constants";
import APIController from "../badcode/ApiController";

class AddCleaner extends React.Component {

    state = {
        email: "",
        password: "",
        phone: "",
        fullName: "",
        address: "",
        city: "",
        zipCode: "",
    };
    isBlankString = (str) => {
        return (str.length === 0 || !str.trim());
    };
    handleChange = (evt) => {
        const obj = {};
        obj[evt.target.id] = evt.target.value;
        this.setState(obj);
    };
    handleCreate = () => {
        if (this.isBlankString(this.state.email)) {
            //code, textStr, type = MSG_MODE_STATIC, onOk = null
            this.props.app.showMessage(E_CODE_ARG_MISSING, "email is empty!", MSG_MODE_MODAL);
        }
        else if (this.isBlankString(this.state.password)) {
            this.props.app.showMessage(E_CODE_ARG_MISSING, "password is empty!", MSG_MODE_MODAL);
        }
        else {
            APIController.registerCleaner(
                {
                    email: this.state.email,
                    phone: this.state.phone,
                    fullName: this.state.fullName,
                    address: this.state.address,
                    city: this.state.city,
                    zipCode: this.state.zipCode,
                },
                this.state.password,
                function () {
                    this.props.app.showMessage(
                        null,
                        "A new cleaner has been registered. Email verification was sent to e-mail address: " + this.state.email,
                        MSG_MODE_MODAL
                    );
                    this.setState({
                        email: "",
                        password: "",
                        phone: "",
                        fullName: "",
                        address: "",
                        city: "",
                        zipCode: "",
                    });

                }.bind(this)
            );
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-5 col-md-3">

                        <div className="panel panel-primary ">
                            <div className="panel-heading">
                                Create New Cleaner
                            </div>
                            <div className="panel-body">
                                <input
                                    id="email"
                                    type="email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    className="form-control input-sm chat-input"
                                    placeholder="email"
                                />
                                <br/>
                                <input
                                    type="text"
                                    id="password"
                                    type="password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    className="form-control input-sm chat-input"
                                    placeholder="password"
                                />
                                <br/>
                                <input
                                    type="text"
                                    id="fullName"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.fullName}
                                    className="form-control input-sm chat-input"
                                    placeholder="full name"
                                />
                                <br/>
                                <input
                                    type="text"
                                    id="phone"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.phone}
                                    className="form-control input-sm chat-input"
                                    placeholder="phone"
                                />
                                <br/>
                                <div className="wrapper">
					<span className="group-btn">
						<button type="button" onClick={this.handleCreate} className="btn btn-primary btn-md">create <i
                            className="fa fa-plus-circle"></i></button>

					</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default AddCleaner;