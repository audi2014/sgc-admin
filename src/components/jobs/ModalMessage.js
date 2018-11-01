import React from "react";
import { Button, Modal } from 'semantic-ui-react'
const skipAnon = (str) => {
    return str.startsWith('@anon') ? '' : str;
};
// //react@16.6...

class ModalMessage extends React.PureComponent {
    state = {
        open:true,
        bookingId:null,
        cleanerId:null,
    };
    handleClose = () => {
        const {onCancel} = this.props;
        onCancel();
        this.setState({open:false});
    };
    handleOk = () => {
        const {onOk, booking, cleaner} = this.props;
        onOk(booking, cleaner);
        this.setState({open:false});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newBookingId = nextProps.booking && nextProps.booking.id;
        const prevBookingId = prevState.bookingId;

        const newCleanerId = nextProps.cleaner && nextProps.cleaner.id;
        const prevCleanerId = prevState.cleanerId;

        if (newCleanerId !== prevCleanerId || newBookingId !== prevBookingId) {
            return {
                cleanerId: newCleanerId,
                bookingId: newBookingId,
                open:true,
            };
        }
        return null;
    }

    render() {
        console.log('render')
        const { booking, cleaner, forceHide} = this.props;
        const open = booking && cleaner && this.state.open && !forceHide;
        return (
            <Modal size='mini' open={booking && cleaner && open && !forceHide} onClose={this.handleClose}>
                <Modal.Header>Job assignment</Modal.Header>
                <Modal.Content>
                    <p>Are you sure, you want to adding job assignment?</p>
                    {
                        open
                        ? (
                            <div>
                            <p>Cleaner: {cleaner.fullName} {cleaner.email}</p>
                            <p>
                                Booking:<br/>
                                {booking.meetingDate} <br/>
                                {booking.address}<br/>
                                {booking.city}<br/>
                                {skipAnon(booking.email)}<br/>
                            </p>
                            </div>)
                        :null
                    }
                    

                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.handleClose}>No</Button>
                    <Button positive icon='checkmark'
                    labelPosition='right'
                    content='Yes'
                    onClick={this.handleOk}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

//react@16.7.0-alpha
// import React, { useState, useEffect } from "react";
// import { Button, Modal } from 'semantic-ui-react'
// function ModalMessage({onCancel, onOk, booking, cleaner, forceHide}) {

//     const [open,setOpen] = useState(true);

//     const handleClose = () => {
//         onCancel();
//         setOpen(false);
//     };
//     const handleOk = () => {
//         onOk(booking, cleaner);
//         setOpen(false);
//     }

//     useEffect(
//         () => {
//             setOpen(true);
//         },
//         [
//             booking && booking.id, 
//             cleaner && cleaner.id
//         ]
//     );

//     return (
//             <Modal size='mini' open={booking && cleaner && open && !forceHide} onClose={handleClose}>
//                 <Modal.Header>Job assignment</Modal.Header>
//                 <Modal.Content>
//                     <p>Are you sure, you want to adding job assignment?</p>
//                 </Modal.Content>
//                 <Modal.Actions>
//                     <Button negative onClick={handleClose}>No</Button>
//                     <Button positive icon='checkmark'
//                             labelPosition='right'
//                             content='Yes'
//                             onClick={handleOk}
//                     />
//                 </Modal.Actions>
//             </Modal>
//     );
// }

export default ModalMessage;