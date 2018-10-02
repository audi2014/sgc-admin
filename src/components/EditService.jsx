import React, {Component} from 'react';
import {MSG_MODE_MODAL} from "../badcode/Constants";
import APIController from "../badcode/ApiController";
import isBlank from './Function';

class EditService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            name: this.props.data.name,
            price: this.props.data.price,
            isTemporal: this.props.data.isTemporal,
            isMulticount: this.props.data.isMulticount,
            deleted: this.props.data.deleted,
        };
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onIsMulticountChange = this.onIsMulticountChange.bind(this);
        this.onIsTemporalChange = this.onIsTemporalChange.bind(this);
        this.insertService = this.insertService.bind(this);
        this.deleteService = this.deleteService.bind(this);
        this.onServerResponceItem = this.onServerResponceItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.data.id,
            name: nextProps.data.name,
            price: nextProps.data.price,
            isTemporal: nextProps.data.isTemporal,
            isMulticount: nextProps.data.isMulticount,
            deleted: nextProps.data.deleted,
        });
    }

    onNameChange(e) {
        this.setState({name: e.target.value});
    }

    onPriceChange(e) {
        this.setState({price: e.target.value * 100});
    }

    onIsTemporalChange(e) {
        this.setState({
            isTemporal: (e.target.checked ? '1' : '0')
            , isMulticount: (e.target.value ? 0 : this.state.isMulticount)
        });
    }

    onIsMulticountChange(e) {
        this.setState({
            isMulticount: (e.target.checked ? '1' : '0')
            , isTemporal: (e.target.value ? 0 : this.state.isTemporal)
        });
    }

    insertService() {
        if (isBlank(this.state.name)) {
            this.props.app.showMessage(0, "Set name of service", MSG_MODE_MODAL, null);
        }
        else {
            APIController.insertService(
                {
                    "id": (this.state.id ? this.state.id : null),
                    "name": this.state.name,
                    "price": this.state.price,
                    "isTemporal": this.state.isTemporal,
                    "isMulticount": this.state.isMulticount,
                    "deleted": 0
                }
                , this.onServerResponceItem
            );
        }
    }

    deleteService() {
        APIController.insertService(
            {
                "id": this.state.id,
                "name": this.state.name,
                "price": this.state.price,
                "isTemporal": this.state.isTemporal,
                "isMulticount": this.state.isMulticount,
                "deleted": 1
            }
            , this.onServerResponceItem
        )
    }

    onServerResponceItem(data) {
        if (this.state.id) {
            this.props.data.price = data.price;
            this.props.data.name = data.name;
            this.props.data.id = data.id;
            this.props.data.deleted = data.deleted;
            //commit fix:
            this.props.data.isTemporal = data.isTemporal;
            this.props.data.isMulticount = data.isMulticount;
        }
        else {
            this.props.list.addItem(data);
        }
        this.setState({
            "id": data.id,
            "name": data.name,
            "price": data.price,
            "isTemporal": data.isTemporal,
            "isMulticount": data.isMulticount,
            "deleted": data.deleted
        });
        this.props.list.forceUpdate();
    }

    render() {
        return (
            <div className="UIUserView">
                <div className="panel panel-primary top-buffer">
                    <div className="panel-heading">
                        Edit Service {this.state.deleted == 1 ? " (DELETED)" : ""}
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Service name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={this.state.name}
                                    ref="name"
                                    onChange={this.onNameChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Service price: </label>
                                <input
                                    onChange={this.onPriceChange}
                                    type="number" min="1" step="1" className="form-control" id="price"
                                    value={parseInt(this.state.price / 100)}/>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        onChange={this.onIsTemporalChange}
                                        id="isTemporal" type="checkbox" checked={this.state.isTemporal == '1'}/>
                                    Is time
                                </label>
                            </div>
                            <div className="checkbox">
                                <label><input
                                    onChange={this.onIsMulticountChange}
                                    id="isMulticount" type="checkbox" checked={this.state.isMulticount == '1'}/>is
                                    multicount</label>
                            </div>
                            {
                                this.state.id
                                    ? (<button type="button" className="btn btn-success"
                                               onClick={this.insertService}>Update</button>)
                                    : (<button type="button" className="btn btn-success"
                                               onClick={this.insertService}>Cereate</button>)
                            }
                            {
                                (this.state.deleted != 1 && this.state.id)
                                    ? (<button type="button" className="btn btn-danger pull-right"
                                               onClick={this.deleteService}>Delete</button>)
                                    : null
                            }
                            {
                                this.state.deleted == 1
                                    ? (<button type="button" className="btn btn-warning pull-right"
                                               onClick={this.insertService}>Restore</button>)
                                    : null
                            }

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditService;