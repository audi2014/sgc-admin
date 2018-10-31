import React from "react";
import ApiController from "../../badcode/ApiController";
import {Grid} from 'semantic-ui-react';
import BookingPicker from "../orders/BookingPicker";
import BookingsPanel from "./BookingsPanel";
import CleanersPanel from "./CleanersPanel";
import {getMonthStartEnd} from "../../badcode/Constants";
import ModalMessage from './ModalMessage';


class ListOfJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCleaner: null,
            selectedBooking: null,
            cleaners: [],
            bookings: null,
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            distances: {},
            skipModal: false
        };
    }

    setCleanerOfBooking = (booking, cleaner, ) => {

        booking.cleanerUserId = cleaner.id;
        this.setState({
            bookings: [...this.state.bookings],
            selectedCleaner: null,
            selectedBooking: null,
        });

        return ApiController.fetch(
            'admin/set_booking_cleaner_id/',
            {
                bookingId: booking.id,
                cleanerUserId: cleaner.id,
            }
        );
    };
    clearCleanerFromBooking = (bookingId) => {
        this.setState({
            bookings: this.state.bookings.map(
                b => {
                    if (b.id === bookingId) b.cleanerUserId = null;
                    return b;
                }
            )
        });

        return ApiController.fetch(
            'admin/set_booking_cleaner_id/',
            {
                bookingId: bookingId,
                cleanerUserId: null,
            }
        )
    };

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
        this.setState({year: date.getFullYear(), month: date.getMonth()});
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
    getDistanceAndDuration = (bookingId) => {
        return ApiController.fetch(
            'admin/distancematrix_cache/',
            {
                bookingId: bookingId,
            }
        ).then(res => {
            if (res) {
                const result = {};
                res['cleaners_distances'].forEach(item => {
                    result[item.cleanerUserId] = item;
                });
                this.setState({
                    distances: result
                })
            }
        })
    };

    componentDidMount() {
        this.getAllCleaners(this.state);
        this.getBookingsByInterval(this.state);
    }

    handleBookingSelect = (id) => {
        const booking = this.state.bookings.find(
            obj => Number(obj.id) === Number(id)
        );
        this.setState({selectedBooking: booking});
        this.getDistanceAndDuration(id)
    };
    onDragEnter = (id) => {
        const { selectedCleaner } = this.state;
        if(!selectedCleaner || +selectedCleaner.id !== +id) {
            const cleaner = this.state.cleaners.find(
                obj => Number(obj.id) === Number(id)
            );
            this.setState({selectedCleaner: cleaner, skipModal: true});
        }

    };
    onCleanerSelect = (id) => {
        const cleaner = this.state.cleaners.find(
            obj => Number(obj.id) === Number(id)
        );
        this.setState({selectedCleaner: cleaner, skipModal: false})
    };


    handleDragEnd = (e) => {
        this.setState({selectedCleaner: null, selectedBooking: null, skipModal: false});
    };

    handleDrop = (e) => {
        const {selectedBooking, selectedCleaner} = this.state;
        // console.log('_onDrop c', e.currentTarget);
// prevent default action (open as link for some elements)
        e.preventDefault();
// move dragged elem to the selected drop target
        if (
            e.target.classList.contains("cleaner-item")
            && selectedBooking
            && selectedCleaner
        ) {
            // alert(JSON.stringify({selectedBooking,selectedCleaner}))
            this.setCleanerOfBooking(selectedBooking,selectedCleaner);

        }
    };
    onDragOver = (e) => {
        e.preventDefault();
    };

    render() {
        const {skipModal, bookings, cleaners, selectedBooking, selectedCleaner, distances} = this.state;
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column mobile={4} tablet={4} computer={4} width={4}>
                        <BookingPicker
                            onBookingLoad={this.getBookingsByInterval}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}
                          onDragOver={this.onDragOver}
                          onDragEnd={this.handleDragEnd}
                          onDrop={this.handleDrop}
                >
                    <Grid.Column mobile={8} tablet={8} computer={8} width={8}>
                        {
                            bookings !== null
                                ? <BookingsPanel
                                    bookings={bookings}
                                    selectedBookingId={selectedBooking ? selectedBooking.id : null}
                                    onBookingSelect={this.handleBookingSelect}
                                />
                                : null
                        }
                    </Grid.Column>
                    <Grid.Column mobile={8} tablet={8} computer={8} width={8}>
                        {
                            cleaners && bookings !== null
                                ? <CleanersPanel
                                    distances={distances}
                                    onDragEnter={this.onDragEnter}
                                    onCleanerSelect={this.onCleanerSelect}
                                    onClearCleanerOfBooking={this.clearCleanerFromBooking}
                                    cleaners={cleaners}
                                    bookings={bookings}
                                    selectedCleanerId={selectedCleaner ? selectedCleaner.id : null}
                                />
                                : null
                        }
                    </Grid.Column>
                </Grid.Row>
                <ModalMessage
                    forceHide={skipModal}
                    onCancel={this.handleDragEnd}
                    onOk={this.setCleanerOfBooking}
                    cleaner={selectedCleaner}
                    booking={selectedBooking}
                />
            </Grid>
        )
    }
}

export default ListOfJobs;