import React from "react";
import ApiController from "../../badcode/ApiController";
import {Grid, Segment} from 'semantic-ui-react';
import BookingPicker from "../orders/BookingPicker";
import BookingsPanel from "./BookingsPanel";
import {getMonthStartEnd} from "../../badcode/Constants";


class ListOfJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCleanerId: null,
            selectedBookingId: null,
            cleaners: [],
            bookings: null,
            year: new Date().getFullYear(),
            month:  new Date().getMonth(),
        };
    }

    getAllCleaners = () => {
        return ApiController.fetch('admin/get_all_cleaners/')
            .then(res => {
                if (res) {
                    this.setState({
                        cleaners: res['userList']
                    })
                }
            })
    };

    getBookingsByInterval = ({year, month}) => {

        const date = (isFinite(month) && isFinite(year)) ? new Date(year, month) : new Date();
        this.setState({year:date.getFullYear(), month:date.getMonth()});
        return ApiController.fetch('admin/get_all_cleaners_bookings_by_interval/', {
            ...getMonthStartEnd(date),
        })
            .then(res => {
                if (res) {
                    this.setState({
                        bookings: res['bookingSmList']
                    })
                }
            })
    };

    componentDidMount() {
        this.getAllCleaners(this.state);
        this.getBookingsByInterval(this.state);
    }

    render() {
        const {bookings, cleaners, selectedBookingId, selectedCleanerId} = this.state;
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column mobile={4} tablet={4} computer={4} width={4}>
                        <BookingPicker
                            onBookingLoad={this.getBookingsByInterval}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column mobile={8} tablet={8} computer={8} width={8}>
                    {
                        bookings !== null
                            ? <BookingsPanel
                                    bookings={bookings}
                                    onSelectBooking={selectedBookingId ? selectedBookingId.id : null}
                                />
                            :  null
                    }
                    </Grid.Column>
                    <Grid.Column mobile={8} tablet={8} computer={8} width={8}>

                    </Grid.Column>
                </Grid.Row>

            </Grid>
        )
    }
}

export default ListOfJobs;