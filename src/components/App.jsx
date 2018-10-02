import React from "react";
import APIController from "../badcode/ApiController";
import {API_AUTH_OK, API_NO_AES, API_NO_AUTH, API_OFF, MSG_MODE_STATIC} from "../badcode/Constants";
import $ from "jquery";
import modal from "jquery-modal";
import cookie from "jquery.cookie";
import CryptoJS from "cryptojs";
import pickmeup from "pickmeup";
import ListUser from "./ListUser";
import ListService from "./ListService";
import ListBooking from "./ListBooking";
import ListBookingArchived from "./ListBookingArchived";
import ListBookingNew from "./ListBookingNew";
import ListPaidGifts from "./ListPaidGifts";
import AesKeyForm from "./KeyForm";
import LoginForm from "./LoginForm";
import Header from "./Header";

 class App extends React.Component {
    componentDidMount = () => {
        APIController.app = this;
        APIController.start();
    };
    showMessage = (code, textStr, type, onOk) => {
        if (type === undefined) type = MSG_MODE_STATIC;
        if (onOk === undefined) onOk = null;
        var timeOffset = Date.now() - this.state.lastHideModalTime;
        if (timeOffset > 300) {
            $('#modalMessage').modal('show');
        }
        this.setState({
            msgType: type,
            messageCode: code,
            messageText: textStr,
            onDialogOk: onOk
        });
    };
    hideMessage = (e) => {
        if (e) {
            e.preventDefault();
        }
        $('#modalMessage').modal('hide');
        this.state.lastHideModalTime = parseInt(Date.now());
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
    setItemPanel = (idx) => {
        var items = false;
        switch (idx) {
            case "0":
                items = (<ListUser app={this}/>);
                break;
            case "1":
                items = (<ListService app={this}/>);
                break;
            case "2":
                items = (<ListBooking app={this}/>);
                break;
            case "5":
                items = (<ListBookingArchived app={this}/>);
                break;
            case "7":
                items = (<ListBookingNew app={this}/>);
                break;
            case "8":
                items = (<ListPaidGifts app={this}/>);
                break;
            default:
                break;
        }

        this.setState({
            itemPanel: items,
            selectedMenuIdx: idx
        });

    };
    setView = (val) => {
        this.setState({
            itemView: val
        });
    };
    setRoute = (val) => {
        this.setState({
            route: val
        });
    };
    getContent = () => {
        if (this.state.apiStatus === API_OFF) {
            return (<div/>);
        }
        else if (this.state.apiStatus == API_NO_AES) {
            APIController.app = this;
            return (<AesKeyForm app={this}/>);
        }
        else if (this.state.apiStatus == API_NO_AUTH) {
            APIController.app = this;
            return (<LoginForm app={this}/>);
        }
        else if (this.state.apiStatus == API_AUTH_OK) {
            var itemPanel = this.state.itemPanel;
            var itemView = this.state.itemView;
            // if(itemPanel === false) {
            // 	itemPanel = <div></div>
            // }
            // if(itemView === false) {
            // 	itemView = <div></div>
            // }
            return (
                <div className="admin-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <Header ref="header" selectedItem={this.state.selectedMenuIdx} token={this.state.token}
                                        app={this}/>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                {itemPanel}
                            </div>
                            <div className={itemPanel === false ? "col-sm-12" : "col-lg-8 col-md-8 col-sm-12"}>
                                {itemView}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="app">{this.getContent()}

            </div>
        );
    }
}

export default App;