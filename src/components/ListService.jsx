import AbstractItemList from "./AbstractItemList";
import APIController from "../badcode/ApiController";
import EditService from "./EditService";
import React from "react";
import isBlank from './Function';

class ListService extends AbstractItemList {
    constructor(props) {
        super(props);
        this.onCreateClick = this.onCreateClick.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    addItem(item) {
        this.state.items.push(item);
    }

    loadData() {
        this.setState({ready: false});
        APIController.getServiceList(
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
                    <EditService
                        list={this}
                        app={this.props.app}
                        data={item}
                    />
                );
            }
        }).bind(this));
    }

    onCreateClick(e) {
        e.preventDefault();
        var data = {
            'id': null,
            'name': "",
            'price': 100000,
            'isMulticount': 0,
            'isTemporal': 0
        };
        this.setState({
            selectedId: false
        });
        this.props.app.setView(
            <EditService
                list={this}
                app={this.props.app}
                data={data}
            />
        );
    }

    handleSerch(e) {
        var sortedData = [];
        this.state.items.map(
            function (item, index) {
                if (isBlank(this.state.serchText) || item.name.indexOf(this.state.serchText) != -1) {
                    console.log(item.name);
                    if (!this.state.orderBy) {
                        sortedData.push(item);
                    }
                    else if (this.state.orderBy == 'isTemporal' && item.isTemporal == 1) {
                        sortedData.push(item);
                    }
                    else if (this.state.orderBy == 'isMulticount' && item.isMulticount == 1) {
                        sortedData.push(item);
                    }
                }

            }.bind(this)
        );

        this.setState({
            itemsSorted: sortedData
        });
    }

    handleSort(e) {
        if (e.target.id == this.state.orderBy) this.state.orderBy = false;
        else {
            this.state.orderBy = e.target.id;
        }
        var sortedData = [];
        this.state.items.map(
            function (item, index) {
                if (!this.state.orderBy) {
                    sortedData.push(item);
                }
                else if (this.state.orderBy == 'isTemporal' && item.isTemporal == 1) {
                    sortedData.push(item);
                }
                else if (this.state.orderBy == 'isMulticount' && item.isMulticount == 1) {
                    sortedData.push(item);
                }
            }.bind(this)
        );
        this.setState({
            itemsSorted: sortedData
        });
    }

    getItemText(item) {
        if (item.deleted == 1) "(DELETED) " + item.name + " $" + item.price / 100;
        else return item.name + " $" + item.price / 100;
    }

    getOrderBar() {
        return (
            <div className="btn-group pull-right">
                <button
                    onClick={this.handleSort}
                    id="isTemporal"
                    className={(this.state.orderBy != 'isTemporal') ? this.state.sortBtnClass : this.state.sortBtnClassActive}>isTemporal
                </button>
                <button
                    onClick={this.handleSort}
                    id="isMulticount"
                    className={(this.state.orderBy != 'isMulticount') ? this.state.sortBtnClass : this.state.sortBtnClassActive}>isMulticount
                </button>
            </div>
        );
    }

    getPanelHead() {
        return (
            <div className="panel-heading clearfix">
                Service list
                {this.getOrderBar()}
            </div>
        );
    }

    getNavBar() {
        return (
            <div className="panel-footer">
                <button onClick={this.onCreateClick} className="btn btn-sm btn-primary">Create service</button>
            </div>
        );
    }
}

export default ListService;