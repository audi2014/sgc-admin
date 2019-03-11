import React from "react";
import APIController from "../badcode/ApiController";
import { Menu, Dropdown, Grid } from "semantic-ui-react";
import { Link } from "@reach/router";

const cssNavActive = {
    background: "#21ba45",
    color: "white"
};
const cssNav = {
    background: "grey",
    color: "white"
};

const LinkedMenuItem = props => {
    return (
        <Menu.Item
            as={Link}
            {...props}
            getProps={props => {
                return {
                    style: props.isCurrent ? cssNavActive : cssNav
                };
            }}
        />
    );
};

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "/"
        };
    }
    handleLogout = e => {
        APIController.logout();
    };

    render() {
        return (
            <Menu as={Grid} style={cssNav}>
                {<LinkedMenuItem icon="calendar check outline" name="Calendar" to="/calendar" />}
                {<LinkedMenuItem  name="Zip_Code" to="/zip_code" />}
                {<LinkedMenuItem  name="List Of Jobs" to="/jobs" />}
                <Dropdown style={cssNav} item text="Orders">
                    <Dropdown.Menu>
                        <LinkedMenuItem icon="gift" name="Paid gifts" to="/paid_gift" />
                        {<LinkedMenuItem
                            icon="lightning"
                            name="New Orders!"
                            to="/new_orders"
                        />}
                        {<LinkedMenuItem name="Orders" to="/orders" />}
                        {<LinkedMenuItem name="Trashed Orders" to="/trashed_orders" />}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown position="right" style={cssNav} item text="Settings">
                    <Dropdown.Menu>
                        <LinkedMenuItem name="Users" to="/users" />
                        <LinkedMenuItem name="Services" to="/service" />
                        {<LinkedMenuItem name="Set Password" to="/settings" />}
                        {<LinkedMenuItem name="Add Cleaner" to="/cleaner" />}
                    </Dropdown.Menu>
                </Dropdown>

                <a
                    className="item"
                    style={cssNav}
                    href={
                        "http://rates-admin.s3-website-us-west-2.amazonaws.com/title?token=" +
                        this.props.token
                    }
                >
                    Feedbacks
                </a>

                <Menu.Item
                    position="right"
                    style={cssNav}
                    name="Logout"
                    onClick={this.handleLogout}
                />
            </Menu>
        );
    }
}

export default Header;
