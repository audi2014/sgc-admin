import React, {Component} from 'react';
import APIController from "../badcode/ApiController";



class PaidGiftFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminComment: String(props.adminComment || ''),
            isArchived: Boolean(Number(props.isArchived)),
            isProcessed: Boolean(Number(props.isProcessed)),
        };
        this.update = this.update.bind(this);
        this.toggleArchived = this.toggleArchived.bind(this);
        this.toggleProcessed = this.toggleProcessed.bind(this);
        this.handleCommentChenge = this.handleCommentChenge.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            adminComment: String(props.adminComment || ''),
            isArchived: Boolean(Number(props.isArchived)),
            isProcessed: Boolean(Number(props.isProcessed)),
        });

    }

    handleCommentChenge(e) {
        this.setState({adminComment: e.target.value});
    }

    update(isProcessed, isArchived, adminComment) {
        APIController.setGiftPaymentAdminData(this.props.id, isProcessed, isArchived, adminComment, function (array) {
            if (this.props.updateList) {
                this.props.updateList(array);
            }
        }.bind(this));
        this.setState({isProcessed: isProcessed, isArchived: isArchived, adminComment: adminComment});

    }

    toggleProcessed() {
        this.update(
            !this.state.isProcessed,
            this.state.isArchived,
            this.state.adminComment
        );
    }

    toggleArchived() {
        this.update(
            this.state.isProcessed,
            !this.state.isArchived,
            this.state.adminComment
        );
    }

    render() {
        return <div className="panel-footer">
            <p>
                Admin notes:
            </p>
            <p>
                {(this.state.isProcessed)
                    ? this.state.adminComment
                    : (<textarea style={{width: "100%", maxWidth: "100%"}}
                                 onChange={this.handleCommentChenge} value={this.state.adminComment}>
				}
				</textarea>)
                }
            </p>
            {(this.state.isProcessed)
                ? <button
                    id={this.state.id}
                    className="btn btn-info"
                    onClick={this.toggleProcessed}>
                    <span className="glyphicon glyphicon-ok"/>Processed
                </button>
                : <button
                    id={this.state.id}
                    onClick={this.toggleProcessed}
                    className="btn btn-info">
                    <span className="glyphicon glyphicon-flash"/>Set processed
                </button>
            }

            {(this.state.isArchived)
                ? <button
                    id={this.state.id}
                    onClick={this.toggleArchived}
                    className="btn btn-info">
                    <span className="glyphicon glyphicon-thumbs-up"/>Put back
                </button>
                : <button
                    id={this.state.id}
                    onClick={this.toggleArchived}
                    className="btn btn-warning">
                    <span className="glyphicon glyphicon-trash"/>Move to trash
                </button>
            }
        </div>
    }
}

export default PaidGiftFooter;