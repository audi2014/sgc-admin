import React, {Component} from 'react';
import {DEFAULT_PDF_IMG} from "../badcode/Constants";
import APIController from "../badcode/ApiController";
import UserInfoPanel from "./UserInfoPanel";
import isBlank from './Function';

class DetailsUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarImgSrc: DEFAULT_PDF_IMG,
            data: this.props.data
        };
        this.onUserTypeChange = this.onUserTypeChange.bind(this);
        this.onUserTypeUpdated = this.onUserTypeUpdated.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.getEditUserPanel = this.getEditUserPanel.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            avatarImgSrc: DEFAULT_PDF_IMG
        });

        if (!isBlank(nextProps.data.img)) {
            this.setState({
                avatarImgSrc: this.props.data.img
            });
        }

    }

    onUserTypeChange(e) {
        var type = 0;
        switch (e.target.id) {
            case 'userTypeUser':
                type = 0;
                break;
            case 'userTypeTest':
                type = 2;
                break;
            case 'userTypeAdmin':
                type = 1;
                break;
            case 'userTypeGuest':
                type = 3;
                break;
            case 'userTypeCleaner':
                type = 4;
                break;
        }
        this.state.data.userType = type;
        APIController.updateUser(this.state.data, this.onUserTypeUpdated);
    }

    onUserTypeUpdated(userObj) {
        this.state.data.userType = userObj.userType;
        this.forceUpdate();
    }

    getEditUserPanel() {
        if (this.state.data.userType == 1) return null;
        else return (
            <div className="panel panel-primary top-buffer">
                <div className="panel-heading">Edit user</div>
                <div className="panel-body">
                    <p>User type:</p>
                    <form>
                        <ul>
                            <li>
                                <label className="radio-inline">
                                    <input
                                        onChange={this.onUserTypeChange}
                                        checked={this.state.data.userType == 0}
                                        ref="userTypeUser" type="radio" id="userTypeUser"
                                    />
                                    User
                                </label>
                            </li>
                            <li>
                                <label className="radio-inline">
                                    <input
                                        onChange={this.onUserTypeChange}
                                        checked={this.state.data.userType == 2}
                                        ref="userTypeTest" type="radio" id="userTypeTest"
                                    />
                                    Test User
                                </label>
                            </li>
                            <li>
                                <label className="radio-inline">
                                    <input
                                        disabled
                                        onChange={this.onUserTypeChange}
                                        checked={this.state.data.userType == 1}
                                        ref="userTypeAdmin" type="radio" id="userTypeAdmin"/>
                                    Admin
                                </label>
                            </li>
                            {/*<li>
						<label className="radio-inline">
							<input
								onChange={this.onUserTypeChange}
								checked={this.state.data.userType == 4}
								ref="userTypeCleaner" type="radio" id="userTypeCleaner"/>
							<b>Cleaner</b>
						</label>
						</li>*/}
                            <li>
                                <label className="radio-inline">
                                    <input
                                        onChange={this.onUserTypeChange}
                                        checked={this.state.data.userType == 3}
                                        ref="userTypeGuest" type="radio" id="userTypeGuest"/>
                                    Guest
                                </label>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="UIUserView">
                <UserInfoPanel app={this.props.app} data={this.state.data}/>
                {this.getEditUserPanel()}

            </div>
        );
    }
}

export default DetailsUser;