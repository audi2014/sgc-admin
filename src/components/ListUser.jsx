import AbstractItemList from "./AbstractItemList";
import APIController from "../badcode/ApiController";
import DetailsUser from "./DetailsUser";
import React from "react";

class ListUser extends AbstractItemList {
    loadData() {
        this.setState({ready: false});
        APIController.getUsers(
            this.state.page,
            this.state.orderBy,
            this.state.serchText,
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
                    <DetailsUser
                        app={this.props.app}
                        data={item}
                    />
                );
            }
        }).bind(this));
    }

    getItemText(item) {
        var text = "";
        if (item.userType == 3) {
            item.email = "Guest email";
            if (item.fullName.startsWith("@anon@")) item.fullName = "Guest User " + item.id;
        }
        if (this.state.orderBy) {
            text = item[this.state.orderBy];
        }
        else {
            if (item.userType == 3) {
                text = item.fullName;
            }
            else {
                text = item.fullName + " " + item.email;
            }
        }
        return text;
    }

    getOrderBar() {
        return (
            <div className="btn-group pull-right">
                <button
                    onClick={this.handleSort}
                    id="fullName"
                    className={(this.state.orderBy != 'fullName') ? this.state.sortBtnClass : this.state.sortBtnClassActive}>by
                    name
                </button>
                <button
                    onClick={this.handleSort}
                    id="email"
                    className={(this.state.orderBy != 'email') ? this.state.sortBtnClass : this.state.sortBtnClassActive}>by
                    email
                </button>
            </div>
        );
    }

    getPanelHead() {
        return (
            <div className="panel-heading clearfix">
                User list
                {this.getOrderBar()}
            </div>
        );
    }
}

export default ListUser;