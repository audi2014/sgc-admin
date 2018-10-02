import React, {Component} from 'react';
import {
    E_CODE_ARG_MISSING,
    E_CODE_AUTH_FAIL,
    E_CODE_DUBLICATE,
    E_CODE_FILE_SIZE, MSG_MODE_DIALOG,
    MSG_MODE_STATIC
} from "../badcode/Constants";

class ModalMessage extends React.Component {
    state = {};

    render() {
        var title = false;
        var alertClass = "alert alert-success";
        switch (this.props.code) {
            case E_CODE_ARG_MISSING:
                title = "Empty field";
                break;
            case E_CODE_FILE_SIZE:
                title = "File too large";
                break;
            case E_CODE_DUBLICATE:
                title = "Dublicate";
                break;
            case E_CODE_AUTH_FAIL:
                title = "Auth fail";
                break;
            default:
                title = false;
        }
        if (!title) {
            title = "Info",
                alertClass = "alert alert-success";
        }
        else {
            alertClass = "alert alert-warning";
        }
        var okBtn = (<div></div>);
        var footerBtns = (<div></div>);
        var closeBtnHeader = (<div></div>);
        if (this.props.msgType != MSG_MODE_STATIC) {
            if (this.props.msgType == MSG_MODE_DIALOG) {
                okBtn = (
                    <button onClick={this.props.onDialogOk} type="button" className="btn btn-primary">Ok</button>
                );
            }
            closeBtnHeader = (
                <button onClick={this.props.app.hideMessage} type="button" className="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            );
            footerBtns = (
                <div className="modal-footer">
                    <button onClick={this.props.app.hideMessage} type="button" className="btn btn-default">Close
                    </button>
                    {okBtn}
                </div>
            );
        }
        return (
          	<div className="modal fade" id="modalMessage" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
           	   data-backdrop="static"
          	   data-keyboard="false">
          		<div className="modal-dialog" role="document"
           		data-backdrop="static"
           		data-keyboard="false">
           			<div className="modal-content">
           				<div className="modal-header">
          					{closeBtnHeader}
           					<h4 className="modal-title" id="myModalLabel">{title}</h4>
            				</div>
          				<div className="modal-body">
          				<div className={alertClass}>
           						{this.props.message}
          					</div>
           				</div>
           			{footerBtns}
            			</div>
          	</div>
            	</div>
        );
    }
};

export default ModalMessage;