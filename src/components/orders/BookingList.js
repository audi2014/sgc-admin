import React from "react";
import {MenuTemplate} from '../Templates';
import {List} from "semantic-ui-react";
import BookingPicker from './BookingPicker';

const bookingToTitle = (booking) => {
    const services = booking.orderList.map(({service,count})=>service.name).join(', ')
    return `${booking.meetingDate} ${services}`
};

export default ({bookings,  selectedOrdersId, onBookingSelect, onBookingLoad}) => {
    const handleBookingClick = (e) => {
        onBookingSelect(e.currentTarget.id);
    };
    return (
        <MenuTemplate
            style={{overflow: 'auto', height: '80vh'}}
            header={<h1>Booking List</h1>}
            topMenu={<BookingPicker
                onBookingLoad={onBookingLoad}
            />}
            items={
                bookings
                .map(c => (
                <List.Item
                className="overflow"
                active={c.id === selectedOrdersId}
                onClick={handleBookingClick}
                id={c.id} key={c.id}
                >
                    {bookingToTitle(c)}
                </List.Item>
                ))
            }


        />
    )
}