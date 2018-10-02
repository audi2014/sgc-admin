import React, {Component} from 'react';
import APIController from "../badcode/ApiController";
import isBlank from './Function';
import PaidGiftView from './Function';
import giftListFilter from './Function';

class ListPaidGifts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: true,
            items: [],
            selectedId: this.props.selectedId
        };
        this.updateList = this.updateList.bind(this);
        this.loadData = this.loadData.bind(this);
        this.onDataLoaded = this.onDataLoaded.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.getItemText = this.getItemText.bind(this);
        this.switchFilter = this.switchFilter.bind(this);
        this.handleSerchTextChenged = this.handleSerchTextChenged.bind(this);

    }

    componentDidMount() {
        this.loadData();
    }

    onDataLoaded(arrayOfItems) {
        console.log('arrayOfItems', arrayOfItems);
        this.setState({
            ready: true,
            items: arrayOfItems,
        });
    }

    updateList(arrayOfItems) {
        this.onDataLoaded(arrayOfItems);
    }

    loadData() {

        this.setState({ready: false});
        APIController.getGiftPayments(
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
                    <PaidGiftView data={item} updateList={this.updateList}/>
                );
            }
        }).bind(this));
    }

    getItemText(item) {
        return (
            <span id={item.id} onClick={this.onClick}>
			{
                item.isArchived != 0
                    ? <span className="glyphicon glyphicon-trash"/>
                    : (item.isProcessed != 0
                    ? <span className="glyphicon glyphicon-ok"/>
                    : <span className="glyphicon glyphicon-flash"/>)
            }
                {item.id}) {item.name} {item.fullName} {item.phone}
			</span>
        );

    }

    switchFilter(e) {
        this.setState({filter: e.target.name});
    }

    handleSerchTextChenged(e) {
        this.setState({search: e.target.value});
    }

    render() {
        var items = giftListFilter(this.state.items, this.state.filter, this.state.search || "");
        return (
            <div className="panel panel-primary">
                <div className="panel-heading clearfix">
                    <input type="text" className="form-control input-lg" placeholder="serch"
                           onChange={this.handleSerchTextChenged}/>
                    <div className="btn-group pull-right">
                        <button
                            onClick={this.switchFilter}
                            name="all"
                            className={"btn btn-default btn-sm" + (this.state.filter === 'all' ? " active" : "")}>all
                        </button>
                        <button
                            onClick={this.switchFilter}
                            name="new"
                            className={"btn btn-default btn-sm" + (this.state.filter === 'new' ? " active" : "")}>new
                        </button>
                        <button
                            onClick={this.switchFilter}
                            name="processed"
                            className={"btn btn-default btn-sm" + (this.state.filter === 'processed' ? " active" : "")}>processed
                        </button>
                        <button
                            onClick={this.switchFilter}
                            name="archived"
                            className={"btn btn-default btn-sm" + (this.state.filter === 'archived' ? " active" : "")}>deleted
                        </button>
                    </div>
                </div>
                <div className="panel-body">
                    {this.state.ready ? null :
                        <img ref="iconLoading" src="http://global.fncstatic.com/static/v/all/img/loader-trans-2.gif"/>}
                    <ul className="top-buffer list-group">
                        {
                            items.map(
                                function (item, index) {
                                    var className = "list-group-item";
                                    var text = this.getItemText(item);
                                    if (isBlank(text)) text = (<u>[empty data]</u>);
                                    if (item.id == this.state.selectedId) {
                                        className = "list-group-item active";
                                    }
                                    return (
                                        <button
                                            onClick={this.onItemClick}
                                            type="button"
                                            className={className}
                                            key={item.id}
                                            id={item.id}>
                                            {text}
                                        </button>
                                    );
                                }.bind(this)
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default ListPaidGifts;