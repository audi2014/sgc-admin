import AbstractItemList from "./AbstractItemList";
import APIController from "../badcode/ApiController";
import DetailsBooking from "./DetailsBooking";
import pickmeup from "pickmeup";
import React from "react";

class ListBooking extends AbstractItemList {
    constructor(props) {
        super(props);
        this.state.startDate = false;
        this.state.endDate = false;
        this.clearDate = this.clearDate.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    updateList() {
        this.forceUpdate();
    }

    loadData() {

        var startDate = new Date().toISOString().slice(0, 10);
        var endDate = new Date().toISOString().slice(0, 10);
        var serch = "";
        if (this.state.startDate) startDate = this.state.startDate;
        if (this.state.endDate) endDate = this.state.endDate;

        this.setState({ready: false});
        APIController.getBookingList(
            this.state.page,
            startDate,
            endDate,
            serch,
            this.onDataLoaded
        );
    }

    onItemClick(e) {
        e.preventDefault();
        this.setState({
            selectedId: e.target.id
        });
        this.state.items.forEach((function (item, i, arr) {
            if (item.id == e.target.id) {
                this.props.app.setView(
                    <DetailsBooking
                        updateList={this.updateList}
                        app={this.props.app}
                        data={item}
                    />
                );
            }
        }).bind(this));
    }

    getItemText(item) {
        var text = "" + item.meetingDate;
        for (var i = 0; i < item.orderList.length; i++) {
            text += ", " + item.orderList[i].service.name;
        }

        return (
            <span id={item.id} onClick={this.onClick}>
			{
                (item.isArchived != 0)
                    ? <span className="glyphicon glyphicon-trash"/>
                    : item.isProcessed != 0
                    ? <span className="glyphicon glyphicon-ok"/>
                    : <span className="glyphicon glyphicon-flash"/>
            }
                {text}
			</span>
        );

    }

    getSerchBar() {
        return null;
    }

    getOrderBar() {
        return (
            <div className="btn-group pull-right">

                <input
                    ref="dateRange"
                    className={this.state.startDate ? this.state.sortBtnClassActive : this.state.sortBtnClass}
                    id="btnStartDate"
                    type="button"
                />
                {/*<input
				type="button"
				id="btnStartDate"
				defaultValue="Start Date"
				name={this.state.startDate ? this.state.startDate : "Start Date" }
				className={this.state.startDate ? this.state.sortBtnClassActive :  this.state.sortBtnClass} />
				<input
				type="button"
				id="btnEndDate"
				defaultValue="End Date"
				name={this.state.endDate ? this.state.endDate : "End Date" }
				className={this.state.endDate ? this.state.sortBtnClassActive :  this.state.sortBtnClass} />*/}


                <button
                    onClick={this.clearDate}
                    id="btnClear"
                    className={this.state.sortBtnClass}>Clear
                </button>
            </div>
        );
    }

    getPanelHead() {
        return (
            <div className="panel-heading clearfix">
                Order list
                {this.getOrderBar()}
            </div>
        );
    }

    clearDate() {
        this.state.startDate = false;
        this.state.endDate = false;
        this.loadData();
    }

    componentDidMount() {
        var dateRange = this.refs.dateRange;
        pickmeup(dateRange, {
            format: 'm/d/Y',
            mode: 'range',
            position: 'bottom',
            hide_on_select: false

        });
        dateRange.addEventListener('pickmeup-change', function (e) {
            var start = e.detail.date[0].toISOString().slice(0, 10);
            var end = e.detail.date[1].toISOString().slice(0, 10);

            this.state.startDate = start;
            this.state.endDate = end;
            this.loadData();
        }.bind(this));

        // $( "#btnStartDate" ).datepicker({
        // 	dateFormat: 'yy-mm-dd',
        // 	onSelect: function(dateText, inst, extensionRange) {
        // 		this.setState({startDate:dateText});
        // 		this.loadData();
        // 	}.bind(this)
        // });

        // $( "#btnEndDate" ).datepicker({
        // 	dateFormat: 'yy-mm-dd',
        // 	onSelect: function(dateText, inst, extensionRange) {
        // 		this.setState({endDate:dateText});
        // 		this.loadData();
        // 	}.bind(this)
        // });
        super.componentDidMount();
    }
}

export default  ListBooking;