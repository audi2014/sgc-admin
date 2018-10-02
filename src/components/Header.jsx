import React, {Component} from 'react';
import Calendar from "./Calendar";
import Settings from "./Settings";
import AddCleaner from "./AddCleaner";
import APIController from "../badcode/ApiController";

class Header extends React.Component {

    componentDidMount = () => {
        this.props.app.setItemPanel("3");
        this.props.app.setView(<Calendar app={this.props.app}/>);
    };
    handleClick = (e) => {
        this.props.app.setItemPanel(e.target.id);
        if (e.target.id == "3") {
            this.props.app.setView(<Calendar app={this.props.app}/>);
        }
        else if (e.target.id == "6") {
            this.props.app.setView(<Settings app={this.props.app}/>);
        }
        else if (e.target.id == "9") {
            this.props.app.setView(<AddCleaner app={this.props.app}/>);
        }
        else {
            this.props.app.setView(false);
        }
    };
    handleLogout = (e) => {
        APIController.logout();

    };

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#"><span style={{"color": "green"}}>
							GreenCleaning </span>
                            <p>Admin panel</p>
                            <p>V6.0</p>
                        </a>
                    </div>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <button
                                id="0"
                                className={this.props.selectedItem == "0" ? "btn btn-success btn-lg" : "btn btn-secondary btn-lg"}
                                onClick={this.handleClick}>
                                Users
                            </button>
                        </li>
                        {/*<li className="nav-item">
						    <button
							    id="9"
							    className={this.props.selectedItem == "9" ? "btn btn-success btn-lg" : "btn btn-secondary btn-lg"}
							    onClick={this.handleClick}>
								Add Cleaner
							</button>
						</li>*/}
                        <li className="nav-item">
                            <button
                                id="1"
                                className={this.props.selectedItem == "1" ? "btn btn-success btn-lg" : "btn btn-secondary btn-lg"}
                                onClick={this.handleClick}>
                                Services
                            </button>
                        </li>

                        <li className="nav-item">
                            <button
                                id="8"
                                className={this.props.selectedItem == "8" ? "btn btn-success btn-lg" : "btn btn-secondary btn-lg"}
                                onClick={this.handleClick}>
                                <span className="glyphicon glyphicon-gift"/>Paid gifts
                            </button>
                        </li>

                        <li className="nav-item">
                            <button
                                id="7"
                                className={this.props.selectedItem == "7" ? "btn btn-success btn-lg" : "btn btn-secondary btn-lg"}
                                onClick={this.handleClick}>
                                <span className="glyphicon glyphicon-flash"/>New Orders!
                            </button>
                        </li>

                        <li className="nav-item">
                            <button
                                id="2"
                                className={this.props.selectedItem == "2" ? "btn btn-success btn-lg" : "btn btn-secondary btn-lg"}
                                onClick={this.handleClick}>
                                Orders
                            </button>
                        </li>

                        <li className="nav-item">
                            <button
                                id="3"
                                className={this.props.selectedItem == "3" ? "btn btn-success btn-lg" : "btn btn-secondary btn-lg"}
                                onClick={this.handleClick}>
                                Calendar
                            </button>
                        </li>


                        <li className="nav-item">
                            <button
                                id="5"
                                className={this.props.selectedItem == "5" ? "btn btn-success btn-lg" : "btn btn-secondary btn-lg"}
                                onClick={this.handleClick}>
                                Trashed Orders
                            </button>
                        </li>

                        <li className="nav-item">
                            <a className="btn btn-secondary btn-lg"
                               href={"http://rates-admin.s3-website-us-west-2.amazonaws.com/title?token=" + this.props.token}
                               role="button">Feedbacks</a>
                        </li>

                        <li className="nav-item">
                            <button
                                id="6"
                                className={this.props.selectedItem == "6" ? "btn btn-success btn-lg" : "btn btn-secondary btn-lg"}
                                onClick={this.handleClick}>
                                Settings
                            </button>
                        </li>

                        <li className="nav-item">
                            <button
                                id="4"
                                className="btn btn-warning btn-lg"
                                onClick={this.handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
};

export default Header;