import React from "react";
import {MenuTemplate} from '../Templates';
import BookingCell from './BookingCell';


class BookingsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleBookingClick = (e) => {
        const {onBookingSelect} = this.props;
        onBookingSelect(e.currentTarget.id);
    };
    onDragEnd = () => {
        const {onBookingSelect} = this.props;
        onBookingSelect(null);
    };


    render() {
        const {bookings, selectedBookingId} = this.props;


        return (
            <MenuTemplate
                relaxed={true}
                divided={true}
                style={{overflow: 'auto', height: '80vh'}}
                header={<h1>Booking List</h1>}
                items={
                    bookings.filter(item => !item.cleanerUserId)
                        .map(c => (
                            <BookingCell
                                data={c}
                                onDragEnd={this.onDragEnd}
                                onDragStart={this.handleBookingClick}
                                draggable="true"
                                className="overflow"
                                active={c.id === selectedBookingId}
                                id={c.id} key={c.id}
                                onClick={this.handleBookingClick}/>
                        ))
                }


            />
        )
    }
}

export default BookingsPanel;