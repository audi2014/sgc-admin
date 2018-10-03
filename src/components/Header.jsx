import React, {Component} from 'react';
import APIController from "../badcode/ApiController";
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from "@reach/router"

const cssNavActive = {
    background: "#21ba45" ,
    color: "white"
};
const cssNav = {
    background:"grey",
    color: "white"
};

const LinkedMenuItem = (props) => {
    return <Menu.Item
        as={Link}
        {...props}
        getProps={(props) => {
            console.log(props);
            return {
                style:props.isCurrent ? cssNavActive : cssNav
            };
        }}
    />
};

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected:"/"
        }
    }
    handleLogout = (e) => {
        APIController.logout();

    };

    render() {
        return (
            <Menu style={cssNav}>
                <LinkedMenuItem
                    name='Users'
                    to='/users'
                />
                <LinkedMenuItem
                    name=' Services'
                    to='/service'
                />
                <LinkedMenuItem
                    icon='gift'
                    name='Paid gifts'
                    to='/paid_gift'
                />
                <LinkedMenuItem
                    icon='lightning'
                    name='New Orders!'
                    to='/new_orders'
                />
                <LinkedMenuItem
                    name='Orders'
                    to='/orders'
                />
                <LinkedMenuItem
                    icon='calendar check outline'
                    name='Calendar'
                    to='/'
                />
                <LinkedMenuItem
                    name='Trashed Orders'
                    to='/trashed_orders'
                />
                <a className="item"
                       style={cssNav}
                       href={"http://rates-admin.s3-website-us-west-2.amazonaws.com/title?token=" + this.props.token}>
                    Feedbacks
                </a>

                <LinkedMenuItem
                    name='Settings'
                    to='/settings'
                />
                <Menu.Menu position='right'>
                <Menu.Item
                    style={cssNav}
                    name='Logout'
                    onClick={this.handleLogout}
                />
                </Menu.Menu>
            </Menu>
        );
    }
};

export default Header;