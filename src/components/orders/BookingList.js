import React from "react";
import {MenuTemplate} from '../Templates';
import {Button, List} from "semantic-ui-react";
import BookingPicker from './BookingPicker';
export default class ListContainer extends React.Component{
    state={sort: 'meetingDate'};
    filterByName= () => {
        this.setState({sort: 'fullName'})
    };
    filterByDate= () => {
        this.setState({sort: 'meetingDate'})
    };
    render() {
        return(<BookingList
            {...this.props}
            sort={this.state.sort}
            filterByDate={this.filterByDate}
            filterByName={this.filterByName}
        />)
    }
}
const bookingToTitle = (booking) => {
    const services = booking.orderList.map(({service,count})=>service.name).join(', ');
    return  <List.Content>
        <List.Header>
            {booking.meetingDate}, {booking.interval.start}, {booking.fullName}
        </List.Header>
        <List.Description>
             {booking.address},  {booking.zipCode} <br/>
            {services}
        </List.Description>
    </List.Content>
};


const BookingList = ({bookings,  selectedOrdersId, onBookingSelect, onBookingLoad, filterByDate, filterByName, sort }) => {
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
            search={[
                <Button
                    key={1}
                    size='mini'
                    onClick={filterByName}
                >
                    by name
                </Button>,
                <Button
                    key={2}
                    size='mini'
                    onClick={filterByDate}

                >
                    by date
                </Button>
            ]}
            items={
                bookings
                .sort((a,b) => a[sort].localeCompare(b[sort]))
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
};