import React, { useState, useEffect } from "react";
import { Button, Modal } from 'semantic-ui-react'

function ModalMessage({onCancel, onOk, booking, cleaner, forceHide}) {

    const [open,setOpen] = useState(true);

    const handleClose = () => {
        onCancel();
        setOpen(false);
    };
    const handleOk = () => {
        onOk(booking, cleaner);
        setOpen(false);
    }

    useEffect(
        () => {
            setOpen(true);
        },
        [
            booking && booking.id, 
            cleaner && cleaner.id
        ]
    );

    return (
            <Modal size='mini' open={booking && cleaner && open && !forceHide} onClose={handleClose}>
                <Modal.Header>Job assignment</Modal.Header>
                <Modal.Content>
                    <p>Are you sure, you want to adding job assignment?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={handleClose}>No</Button>
                    <Button positive icon='checkmark'
                            labelPosition='right'
                            content='Yes'
                            onClick={handleOk}
                    />
                </Modal.Actions>
            </Modal>
    );
}

export default ModalMessage;