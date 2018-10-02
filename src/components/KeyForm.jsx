import React, {Component} from 'react';
import {E_CODE_ARG_MISSING, MSG_MODE_MODAL} from "../badcode/Constants";
import APIController from "../badcode/ApiController";
class AesKeyForm extends React.Component {
    isBlankString = (str) => {
        return (str.length === 0 || !str.trim());
    };
    handleAesKeyHashChange = (evt) => {
        this.setState({aesKeyHash: evt.target.value});
    };
    handleOk = () => {
        if (this.isBlankString(this.state.aesKeyHash)) {
            this.props.app.showMessage(E_CODE_ARG_MISSING, "AES Key Hash is empty!", MSG_MODE_MODAL);
        }
        else {
            APIController.saveAesKeyHash(this.state.aesKeyHash);
            APIController.start();
        }
    };

    state = {
        aesKeyHash: ""
    };
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-5 col-md-3">

                        <div className="panel panel-primary ">
                            <div className="panel-heading">
                                Enter AES Key Hash
                            </div>
                            <div className="panel-body">
                                <input
                                    id="aesKeyHash"
                                    type="aesKeyHash"
                                    onChange={this.handleAesKeyHashChange}
                                    className="form-control input-sm chat-input"
                                    placeholder="aes Key Hash"
                                />
                                <div className="wrapper">
								<span className="group-btn">
									<button type="button" onClick={this.handleOk}
                                            className="btn btn-primary btn-md">Ok
                                        <i
                                        className="fa fa-sign-in">
                                        </i>
                                    </button>
								</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AesKeyForm;