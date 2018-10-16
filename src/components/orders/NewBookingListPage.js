import React from "react";
import ApiController from "../../badcode/ApiController";
import {PageTemplate} from '../Templates';
import OrderList from './BookingList';
import BookingDetails from './BookingDetails';
import UserDetails from "../user/UserDetails";

export const filterNewBookings = array => array.filter(c=> !+c.isProcessed &&  !+c.isArchived)
export const filterArchivedBookings = array => array.filter(c=> +c.isArchived)
export const filterAllBookings = array => array;

export const loadNewBookings = ({startDate, endDate, page, search}) => {
    return ApiController.fetch('admin/get_booking_list_new_only/', {
        page,
        startDate: '1999-01-01',
        endDate: '2019-01-01',
        serch: search
    })
        .then(res => {
            if (res) {
                return res['bookingList'];
            } else return [];
        })
};

export const loadAllBookings = ({startDate, endDate, page, search}) => {
    return ApiController.fetch('admin/get_booking_list/', {
        page,
        startDate: '1999-01-01',
        endDate: '2019-01-01',
        serch: search
    })
        .then(res => {
            if (res) {
                return res['bookingList'];
            } else return [];
        })
};

export const loadArchivedBookings = ({startDate, endDate, page, search}) => {
    return ApiController.fetch('admin/get_booking_list_archived/', {
        page,
        startDate: '1999-01-01',
        endDate: '2019-01-01',
        serch: search
    })
        .then(res => {
            if (res) {
                return res['bookingList'];
            } else return [];
        })
};

class ListBookingNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNewOrders: null,
            newOrders: [],
            page: 0,
            startDate: '',
            endDate: '',
            search: '',
            userInfo: null,
            adminComment: '',
            isProcessed: '',
            isArchived: ''

        };
    }

    setBookingIsProcessed = ({id, adminComment}) => {

        this.state.selectedNewOrders.isProcessed = '1';
        this.state.selectedNewOrders.adminComment = adminComment;

        return ApiController.fetch('admin/set_booking_processed/', {
            bookingId: id,
            comment: adminComment,
        })
            .then(res => {
                if (res) {
                    this.setState({adminComment: res.adminComment})
                }
            })
    };
    getOrders = ({startDate, endDate, page, search}) => {
        return this.props.load({startDate, endDate, page, search})
            .then(bookingList => {
                this.setState({newOrders: bookingList});
            })
    };
    getUser = (id) => {
        return ApiController.fetch('admin/get_user/', {
            user: {
                id: id
            }
        })
            .then(res => {
                if (res) {
                    console.log(res);
                    this.setState({userInfo: res.user});
                }
            })
    };

    componentDidMount() {
        this.getOrders(this.state)
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.load !== prevProps.load) {
            this.getOrders(this.state)
        }
    }

    handleBookingSelect = (id) => {
        const booking = this.state.newOrders.find(
            obj => Number(obj.id) === Number(id)
        );
        this.setState({selectedNewOrders: booking});
        this.getUser(booking.userId)
    };


    render() {
        const {itemsFilter} = this.props;
        const {newOrders, selectedNewOrders, userInfo} = this.state;
        return (
            <PageTemplate
                listMenu={<OrderList
                    bookings={itemsFilter(newOrders)}
                    selectedOrdersId={selectedNewOrders ? selectedNewOrders.id : null}
                    onBookingSelect={this.handleBookingSelect}
                />}
                detailsItems={
                    selectedNewOrders
                        ? [
                            <BookingDetails

                                key={1}
                                data={selectedNewOrders}
                                onBookingProcessed={this.setBookingIsProcessed}

                            />,
                            (userInfo ? <UserDetails key={2}
                                                     data={userInfo}

                            /> : null)
                        ]
                        : []
                }
            />
        )
    }
}

export default ListBookingNew;