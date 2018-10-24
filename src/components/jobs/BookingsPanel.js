import React from "react";
import {MenuTemplate} from '../Templates';
import {List} from "semantic-ui-react";

class BookingsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    skipAnon =  (str) => {
        return str.startsWith('@anon') ? '' : str;
    };
    bookingToTitle =  (bookings) => {
        return `${bookings.meetingDate} ${bookings.address} ${this.skipAnon(bookings.email)}
        ${this.skipAnon(bookings.fullName)} ${bookings.phone}`

    };

    render() {
        const {bookings, onSelectBooking} = this.props;
        console.log(bookings);
        return (
            <MenuTemplate
                style={{overflow: 'auto', maxHeight: 500}}
                header={<h1>Booking List</h1>}
                items={
                    bookings
                        .map(c => (
                            <List.Item

                                draggable="true"
                                className="overflow"
                                active={c.id === onSelectBooking}
                                id={c.id} key={c.id}
                            >
                                {this.bookingToTitle(c)}
                            </List.Item>
                        ))
                }


            />
        )
    }
}

export default BookingsPanel;