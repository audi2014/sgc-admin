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
            selectedItem: null,
            items: [],
            page: 0,
            startDate: '',
            endDate: '',
            search: '',
            userInfo: null,

        };
    }

    setBookingIsProcessed = ({id, adminComment}) => {




        return ApiController.fetch('admin/set_booking_processed/', {
            bookingId: id,
            comment: adminComment,
        })
            .then(res => {
                if (res) {
                    this.state.selectedItem.isProcessed = '1';
                    this.state.selectedItem.adminComment = adminComment;
                    this.setState({
                        items:[...this.state.items],
                        selectedItem:{...this.state.selectedItem}
                    })
                }
            })
    };
    getOrders = ({startDate, endDate, page, search}) => {
        return this.props.load({startDate, endDate, page, search})
            .then(bookingList => {
                this.setState({items: bookingList});
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
        const booking = this.state.items.find(
            obj => Number(obj.id) === Number(id)
        );
        this.setState({selectedItem: booking});
        this.getUser(booking.userId)
    };


    render() {
        const {itemsFilter} = this.props;
        const {items, selectedItem, userInfo} = this.state;
        return (
            <PageTemplate
                listMenu={<OrderList
                    bookings={itemsFilter(items)}
                    selectedOrdersId={selectedItem ? selectedItem.id : null}
                    onBookingSelect={this.handleBookingSelect}
                />}
                detailsItems={
                    selectedItem
                        ? [
                            <BookingDetails

                                key={1}
                                data={selectedItem}
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