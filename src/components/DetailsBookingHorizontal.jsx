import React, {Component} from 'react';
import APIController from "../badcode/ApiController";
import UserInfoPanel from "./UserInfoPanel";
import BookingInfoPanel from "./BookingInfoPanel";

class DetailsBookingHorizontal extends React.Component {
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
        else return (<BookingInfoPanel app={this.props.app} data={booking}/>);
    }


    render() {
        return (

            <div className="panel panel-primary">
                <div className="panel-heading">
                    Order #{this.state.data.id}
                </div>
                <div className="panel-body">

                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            {this.getBookingInfoPanel(this.state.data)}
                        </div>
                        <div className="col-sm-6 col-md-6">
                            {this.getUserInfoPanel(this.state.userInfo)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailsBookingHorizontal;