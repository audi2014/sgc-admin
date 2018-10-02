import React, {Component} from 'react';
import APIController from "../badcode/ApiController";
import isBlank from './Function';

class BookingInfoPanel extends React.Component {
    constructor(props) {
        super(props);
        var paymentInfo = this.tryGetPaymentInfo(this.props.data);
        this.state = {
            data: this.props.data,
            paymentInfo: paymentInfo,
            isLivePayment: (paymentInfo.livemode === true)
        };
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.putBack = this.putBack.bind(this);
        this.moveToTrash = this.moveToTrash.bind(this);
        this.onAdminCommentChange = this.onAdminCommentChange.bind(this);
        this.setProcessed = this.setProcessed.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var paymentInfo = this.tryGetPaymentInfo(this.props.data);
        this.setState({
            data: nextProps.data,
            paymentInfo: paymentInfo,
            isLivePayment: (paymentInfo.livemode === true)
        });
    }

    //#UI
    tryGetPaymentInfo(data) {
        let result = null;
        try {
            result = JSON.parse(data.paymentInfo)
        } catch (e) {
        }
        if (!result) return {}
        else return result;
    }

    getSummary(data) {
        var interval = "no data";
        if (data.interval && data.interval.start && data.interval.end) {
            interval = data.interval.start + " - " + data.interval.end;
        }
        return (
            <div className="col-sm-6">
                <h4>Summary</h4>
                <table className="table table-hover">
                    <tbody>
                    <tr>
                        <td>Zip Code</td>
                        <td>{data.zipCode || ""}</td>
                    </tr>
                    <tr>
                        <td>Meeting date</td>
                        <td>{data.meetingDate}</td>
                    </tr>
                    <tr>
                        <td>Time interval</td>
                        <td>{interval}</td>
                    </tr>
                    <tr>
                        <td>Comment</td>
                        <td>{data.comment}</td>
                    </tr>
                    <tr>
                        <td>Dirty level</td>
                        <td><b>{data.dirtyLevel == 0 ? 'no data' : data.dirtyLevel}</b></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    getHomeAccess(data) {
        return (
            <div className="col-sm-6">
                <h4>Home Access</h4>
                <table className="table table-hover">
                    <tbody>
                    <tr>
                        <td>be home</td>
                        <td>{data.homeAccess_beHome == 1 ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td>leave key</td>
                        <td>{data.homeAccess_leaveKey == 1 ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td>provide code</td>
                        <td>{data.homeAccess_provideCode == 1 ? "Yes" : "No"}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    getAttachmentList(data) {

        var cols = [];
        for (var i = 0; i < data.attachmentList.length; i++) {
            cols.push(
                <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4">
                    <div className="thumbnail">
                        <a href={data.attachmentList[i].url} target="_blank">
                            <img src={data.attachmentList[i].url} style={{"width": "100%"}} alt="no image"/>
                            <div class="caption">
                                <p>Open in new tab</p>
                            </div>
                        </a>
                    </div>
                </div>
            );
        }
        if (cols.length == 0) return null;
        else return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h4>Attachments</h4>
                <div class="row">
                    {cols}
                </div>
            </div>
        );
    }

    getPriorityList(data) {
        var rows = [];
        if (data.priorityList) {
            for (var i = 0; i < data.priorityList.length; i++) {
                rows.push(
                    <tr>
                        <td width="35px">{i + 1}:</td>
                        <td>{data.priorityList[i]}</td>
                    </tr>
                );
            }
        }
        if (rows.length === 0) rows = null
        return (
            <div className="col-sm-6">
                <h4>Priority List</h4>
                <table className="table table-hover">
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }

    getCard(paymentInfo) {

        return (
            <div className="col-sm-6">
                <h4>Card info</h4>
                <table className="table table-hover">
                    <tbody>
                    <tr>
                        <td>Number:</td>
                        <td>{paymentInfo.getAccountNumber}</td>
                    </tr>
                    <tr>
                        <td>Type:</td>
                        <td>{paymentInfo.getAccountType}</td>
                    </tr>
                    <tr>
                        <td>Transaction ID:</td>
                        <td>{paymentInfo.getTransId}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    getServiceList(data) {
        var price = 0;
        var sum = 0;
        var rows = [];
        for (var i = 0; i < data.orderList.length; i++) {
            var name = data.orderList[i].service.name;
            var count = parseInt(data.orderList[i].count);
            price = parseInt(data.orderList[i].service.price);
            sum += price * count;

            var multCountText = "";
            if (data.orderList[i].service.isMulticount != 0) {
                multCountText += "x" + count;
            }

            rows.push(
                <tr>
                    <td>{name}</td>
                    <td>{'$ ' + price / 100}&nbsp;<b>{multCountText}</b></td>
                </tr>
            );
        }

        rows.push(
            <tr>
                <td><b>Total</b></td>
                <td><b>{'$ ' + sum / 100}</b></td>
            </tr>
        );
        return (
            <div className="col-sm-6">
                <h4>Services</h4>
                <table className="table table-hover">
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }

    getPanelHead(isLivePayment) {
        var text = (<font>Order Info</font>);
        if (!isLivePayment) text = (<font color="#000">Order Info <b>(TEST MODE)</b></font>);
        return (<div className="panel-heading">{text}</div>);
    }

    setProcessed(e) {
        e.preventDefault();
        this.state.data.isProcessed = 1;
        console.log("setProcessed", e.target.id);

        APIController.setBookingIsProcessed(e.target.id, this.state.data.adminComment || "", function () {
            if (this.props.updateList) {
                this.props.updateList();
            }
            this.forceUpdate();
        }.bind(this));
    }

    putBack(e) {
        e.preventDefault();
        this.state.data.isArchived = 0;
        console.log("putBack", e.target.id);

        APIController.setBookingisArchived(e.target.id, 0, function () {
            if (this.props.updateList) {
                this.props.updateList();
            }
            this.forceUpdate();
        }.bind(this));
    }

    moveToTrash(e) {
        e.preventDefault();
        this.state.data.isArchived = 1;
        console.log("moveToTrash", e.target.id);

        APIController.setBookingisArchived(e.target.id, 1, function () {
            if (this.props.updateList) {
                this.props.updateList();
            }
            this.forceUpdate();
        }.bind(this));
    }

    onAdminCommentChange(e) {
        var data = this.state.data;
        data.adminComment = e.target.value;
        this.setState({data: data});
    }

    render() {
        var order = {"orderList": []};
        if (typeof this.state.data.paymentInfo == "string" && !isBlank(this.state.data.paymentInfo)) {
            try {
                order.orderList = JSON.parse(this.state.data.paymentInfo).order.orderList;
            }
            catch (err) {
                console.log(err);
                order.orderList = this.state.data.orderList;
            }
        }

        return (
            <div className={this.state.isLivePayment ? "panel panel-primary" : "panel panel-disabled"}>
                {this.getPanelHead(this.state.isLivePayment)}
                <div className="panel-body">
                    <div className="row">
                        {this.getCard(this.state.paymentInfo)}
                        {this.getServiceList(order)}
                        {this.getHomeAccess(this.state.data)}
                        {this.getSummary(this.state.data)}
                        {this.getAttachmentList(this.state.data)}
                        {this.getPriorityList(this.state.data)}
                    </div>
                </div>
                <div className="panel-footer">
                    <p>
                        Admin notes:
                    </p>
                    <p>
                        {(this.state.data.isProcessed != 0)
                            ? this.state.data.adminComment || ""
                            : (<textarea style={{width: "100%", maxWidth: "100%"}}
                                         onChange={this.onAdminCommentChange}
                                         value={this.state.data.adminComment || ""}>
						}
						</textarea>)
                        }
                    </p>
                    {(this.state.data.isProcessed != 0)
                        ? <button className="btn btn-info" disabled><span className="glyphicon glyphicon-ok"/>Approved
                        </button>
                        : <button id={this.state.data.id} onClick={this.setProcessed} className="btn btn-info"><span
                            className="glyphicon glyphicon-flash"/>Set Approved</button>
                    }

                    {(this.state.data.isArchived != 0)
                        ? <button id={this.state.data.id} onClick={this.putBack} className="btn btn-info"><span
                            className="glyphicon glyphicon-thumbs-up"/>Put back</button>
                        : <button id={this.state.data.id} onClick={this.moveToTrash} className="btn btn-warning"><span
                            className="glyphicon glyphicon-trash"/>Move to trash</button>
                    }
                </div>
            </div>
        );
    }
}

export default  BookingInfoPanel;