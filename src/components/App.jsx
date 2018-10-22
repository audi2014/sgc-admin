import React from "react";
import APIController from "../badcode/ApiController";
import {API_AUTH_OK, API_NO_AES, API_NO_AUTH, API_OFF, MSG_MODE_STATIC} from "../badcode/Constants";
import $ from "jquery";
import modal from "jquery-modal";
import cookie from "jquery.cookie";
import CryptoJS from "cryptojs";
import pickmeup from "pickmeup";
// import ListUser from "./ListUser";
import UserListPage from "./user/UserListPage";
import ListService from "./service/ServiceListPage";
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
 //   setItemPanel = (idx) => {
   //     var items = false;
  //      switch (idx) {
  //          case "0":
   //             items = (<UserListPage />);
   //             break;
   //         case "1":
   //             items = (<ListService app={this}/>);
   //             break;
   //         case "2":
    //            items = (<ListBooking app={this}/>);
    //            break;
     //       case "5":
     //           items = (<ListBookingArchived app={this}/>);
     //           break;
    //        case "7":
      //          items = (<ListBookingNew app={this}/>);
     //           break;
      //      case "8":
        //        items = (<ListPaidGifts app={this}/>);
       //         break;
      //      default:
        //        break;
      //  }

    //    this.setState({
      //      itemPanel: items,
     //       selectedMenuIdx: idx
      //  });

    //};
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
        else if (this.state.apiStatus == API_NO_AUTH) {
            APIController.app = this;
            return (<LoginForm app={this}/>);
        }
        else if (this.state.apiStatus == API_AUTH_OK) {
            return (
                <div >
                    <div >
                        <div >
                            <div >
                                <Header ref="header" selectedItem={this.state.selectedMenuIdx} token={this.state.token}
                                        app={this}/>
                            </div>
                        </div>
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