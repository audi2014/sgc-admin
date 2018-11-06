import React from "react";
import ApiController from "../../badcode/ApiController";
import {PageTemplate} from '../Templates';
import OrderList from './BookingList';
import BookingDetails from './BookingDetails';
import UserDetails from "../user/UserDetails";
import { getMonthStartEnd} from '../../badcode/Constants';

export const filterNewBookings = array => array.filter(c=> !+c.isProcessed &&  !+c.isArchived);
export const filterArchivedBookings = array => array.filter(c=> +c.isArchived);
export const filterAllBookings = array => array;


class ListBookingNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            items: [],
            page: 0,
            year: new Date().getFullYear(),
            month:  new Date().getMonth(),
            search: '',
            userInfo: null,

        };
    }

    setBookingAdminData = ({id, ...rest}) => {

        return ApiController.fetch('admin/set_booking_admin_data/', {
            bookingId: id,
            ...rest
        })
            .then(res => {
                if (res) {

                    this.state.selectedItem.isArchived = rest.isArchived;
                    this.state.selectedItem.isProcessed = rest.isProcessed;
                    this.state.selectedItem.adminComment = rest.adminComment;

                    this.setState({
                        items:[...this.state.items],
                    })
                }
            })
    };
    getOrders = ({month, year, page, search}) => {
        const date = (isFinite(month) && isFinite(year)) ? new Date(year, month) : new Date();
        this.setState({year:date.getFullYear(), month:date.getMonth()});
        return this.props.load(
            {
                 ...getMonthStartEnd(date),
                serch: search || ''
            }
        )
            .then(bookingList => {
                this.setState({
                    items: bookingList.sort( (a,b) => Date.parse(a.meetingDate) - Date.parse(b.meetingDate) )
                });
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
                    users={userInfo}
                    bookings={itemsFilter(items)}
                    selectedOrdersId={selectedItem ? selectedItem.id : null}
                    onBookingSelect={this.handleBookingSelect}
                    onBookingLoad={this.getOrders}
                />}
                detailsItems={
                    selectedItem
                        ? [
                            <BookingDetails

                                key={1}
                                data={selectedItem}
                                setBookingAdminData={this.setBookingAdminData}

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