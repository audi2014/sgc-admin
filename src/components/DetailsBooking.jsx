import React, {Component} from 'react';
import APIController from "../badcode/ApiController";
import UserInfoPanel from "./UserInfoPanel";
import BookingInfoPanel from "./BookingInfoPanel";

class DetailsBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ajaxGetUser: null,
            userInfo: null,
            data: this.props.data
        };
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.loadUserData = this.loadUserData.bind(this);
        this.onUserDataLoaded = this.onUserDataLoaded.bind(this);

        this.loadUserData(this.props.data.userId);
    }

    componentWillReceiveProps(nextProps) {
        this.state.userInfo = null;
        this.state.data = nextProps.data;
        this.forceUpdate();
        this.loadUserData(nextProps.data.userId);
    }

    loadUserData(id) {
        if (this.state.ajaxGetUser) this.state.ajaxGetUser.abort();
        this.state.ajaxGetUser = APIController.getUserById(this.state.data.userId, this.onUserDataLoaded);
    }

    onUserDataLoaded(user) {
        this.state.ajaxGetUser = null;
        this.setState({userInfo: user});
    }

    getUserInfoPanel(userInfo) {
        if (!userInfo) return null;
        else return (<UserInfoPanel app={this.props.app} data={userInfo}/>);
    }

    getBookingInfoPanel(booking) {
        if (!booking) return null;
        else return (<BookingInfoPanel updateList={this.props.updateList} app={this.props.app} data={booking}/>);
    }


    render() {
        return (
            <div className="UIUserView">
                {this.getBookingInfoPanel(this.state.data)}
                {this.getUserInfoPanel(this.state.userInfo)}
            </div>
        );
    }
}
export default DetailsBooking;