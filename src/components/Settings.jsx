import React, {Component} from 'react';
import {MSG_MODE_DIALOG, MSG_MODE_MODAL} from "../badcode/Constants";
import APIController from "../badcode/ApiController";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setStateFromInputById = this.setStateFromInputById.bind(this);
        this.onPasswordUpdated = this.onPasswordUpdated.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setStateFromInputById(e) {
        var obj = {};
        obj[e.target.id] = e.target.value;
        this.setState(obj)
    }

    onPasswordUpdated() {
        this.props.app.showMessage(
            null,
            "Password was updated.",
            MSG_MODE_DIALOG,
            function () {
                this.props.app.setView(false);
                this.props.app.setItemPanel("2");
            }.bind(this)
        );
    }

    onSubmit(e) {
        if (e) {
            e.preventDefault();
        }
        if (this.state.pwdNew != this.state.pwdConfirm) {
            this.props.app.showMessage(null, "Password does not match the confirm password.", MSG_MODE_MODAL, null);
        }
        else {
            APIController.changePassword(this.state.pwdOld, this.state.pwdNew, this.onPasswordUpdated);
        }

    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Change password</div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label for="pwd">Old password:</label>
                            <input type="password" className="form-control"
                                   id="pwdOld"
                                   value={this.state.pwdOld || ''}
                                   onChange={this.setStateFromInputById}/>
                        </div>
                        <div className="form-group">
                            <label for="pwd">New password:</label>
                            <input type="password" className="form-control"
                                   id="pwdNew"
                                   value={this.state.pwdNew || ''}
                                   onChange={this.setStateFromInputById}/>
                        </div>
                        <div className="form-group">
                            <label for="pwd">Re-type new password:</label>
                            <input type="password" className="form-control"
                                   id="pwdConfirm"
                                   value={this.state.pwdConfirm || ''}
                                   onChange={this.setStateFromInputById}/>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Settings;