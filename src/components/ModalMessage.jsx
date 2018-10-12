import React, {Component} from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import *as MessageActions from "../actions/message";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";

class ModalMessage extends React.Component {
    state = { modalOpen: true };
    handleOpen = () => this.setState({ modalOpen: true });
    handleClose = () => {
        this.props.hideMessage();
    };

    render() {

            const { message, title } = this.props;

        return (
            <Modal
                open={message}
                onClose={this.handleClose}
                basic
                size='small'
            >
                <Header icon='browser' content={title} />
                <Modal.Content>
                    <h3>{message}</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Ok!
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
};
function mapStateToProps(state) {
    return {
        message: state.message.message,
        title: state.message.title,
    }
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(MessageActions, dispatch),
});


export default connect (mapStateToProps, mapDispatchToProps)(ModalMessage);