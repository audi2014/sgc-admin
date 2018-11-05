import React from "react";
import APIController from "../badcode/ApiController";
import {API_AUTH_OK, API_NO_AUTH, API_OFF} from "../badcode/Constants";
import Header from "./Header";
import {bindActionCreators} from "redux";
import * as messageActions from "../actions/message";
import connect from "react-redux/es/connect/connect";
import ModalMessage from './ModalMessage';
import LoginForm from "./LoginForm";


import Router from '../router/router';

class App extends React.Component {
    componentDidMount() {
        APIController.app = this;
        APIController.start();
    };

    showMessage = (code, textStr) => {
        const {showApiMessage} = this.props;
        showApiMessage({code, message: textStr});
    };
    hideMessage = (e) => {
        if (e) {
            e.preventDefault();
        }
        this.props.hideMessage();
    };
    state = {
        lastHideModalTime: 0,
        messageCode: 0,
        messageText: "",
        token: '',
        apiStatus: API_OFF,
        itemPanel: false,
        itemView: false
    };
    getContent = () => {
        if (this.state.apiStatus === API_OFF) {
            return (<div/>);
        }
        else if (this.state.apiStatus == API_NO_AUTH) {
            APIController.app = this;
            return (<LoginForm app={this}/>);
        }
        else if (this.state.apiStatus == API_AUTH_OK) {
            return (
                <div>
                    <div>
                        <Header ref="header" token={this.state.token}
                                app={this}/>
                    </div>
                    <div>
                        <Router/>
                    </div>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="app">
                <ModalMessage/>
                {this.getContent()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.message,
    }
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(messageActions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);