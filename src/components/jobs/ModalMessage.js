import React from "react";
import { Button, Modal } from 'semantic-ui-react'

class ModalMessage extends React.Component {
    state = { open: true };

    close = () => {
        this.props.onCancel();
        this.setState({ open: false })};

    setCleanerOfBooking = () => {
        this.props.onCancel();
        this.props.onThisDrop(this.props.booking, this.props.cleaner);
        this.setState({ open: false })
    };

    render() {
        const { open} = this.state;

        return (

                <Modal size='mini' open={open} onClose={this.close}>
                    <Modal.Header>Job assignment</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure, you want to adding job assignment?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>No</Button>
                        <Button positive icon='checkmark'
                                labelPosition='right'
                                content='Yes'
                                onClick={this.setCleanerOfBooking}
                        />
                    </Modal.Actions>
                </Modal>
        )
    }
}

export default ModalMessage;