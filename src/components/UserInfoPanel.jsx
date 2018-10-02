import React, {Component} from 'react';
import {DEFAULT_PDF_IMG} from "../badcode/Constants";
import isBlank from './Function';

class UserInfoPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarImgSrc: DEFAULT_PDF_IMG,
            data: this.props.data
        };
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
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

    render() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">User info</div>
                <div className="panel-body">
                    <h3>{isBlank(this.state.data.fullName) ? "" : "Full name: "} {this.state.data.fullName}</h3>
                    <div className="row">
                        <div className="col-sm-6">
                            <img src={this.state.avatarImgSrc} className="pull-right img-rounded" alt="Loading..."/>
                        </div>
                        <div className="col-sm-6">

                            <table className="table table-hover">
                                <tbody>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.state.data.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>{this.state.data.phone}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{this.state.data.address}</td>
                                </tr>
                                <tr>
                                    <td>Reg date</td>
                                    <td>{this.state.data.regDate}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{this.state.data.city}</td>
                                </tr>
                                <tr>
                                    <td>Zip code</td>
                                    <td>{this.state.data.zipCode}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-6">
                            <table className="table table-hover">
                                <tbody>
                                <tr>
                                    <td>Bedrooms</td>
                                    <td>{this.state.data.bedrooms ? this.state.data.bedrooms : "?"}</td>
                                </tr>
                                <tr>
                                    <td>Full Bathrooms</td>
                                    <td>{this.state.data.fullBathrooms ? this.state.data.fullBathrooms : "?"}</td>
                                </tr>
                                <tr>
                                    <td>With Shower Only</td>
                                    <td>{this.state.data.bathroomsWithShower ? this.state.data.bathroomsWithShower : "?"}</td>
                                </tr>
                                <tr>
                                    <td>Half Bathrooms</td>
                                    <td>{this.state.data.halfBathrooms ? this.state.data.halfBathrooms : "?"}</td>
                                </tr>
                                <tr>
                                    <td>Levels</td>
                                    <td>{this.state.data.levels ? this.state.data.levels : "?"}</td>
                                </tr>
                                <tr>
                                    <td>Dogs pets</td>
                                    <td>{this.state.data.dogsPets ? this.state.data.dogsPets : "?"}</td>
                                </tr>
                                <tr>
                                    <td>Cats pets</td>
                                    <td>{this.state.data.catsPets ? this.state.data.catsPets : "?"}</td>
                                </tr>
                                {/*<p>otherPets: {this.state.data.otherPets}</p>*/}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-6">
                            <table className="table table-hover">
                                <tbody>
                                <tr>
                                    <td>Footage</td>
                                    <td>{this.state.data.footage}</td>
                                </tr>
                                <tr>
                                    <td>Parking in Driveway</td>
                                    <td>{this.state.data.parkingInDriveway == 1 ? "yes" : "no"}</td>
                                </tr>
                                <tr>
                                    <td>Parking on street</td>
                                    <td>{this.state.data.parkingOnStreet == 1 ? "yes" : "no"}</td>
                                </tr>
                                <tr>
                                    <td>Paid parking</td>
                                    <td>{this.state.data.paidParking == 1 ? "yes" : "no"}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfoPanel;