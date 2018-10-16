import React from "react"
import { Router, Link } from "@reach/router"
import Calendar from "../components/Calendar";
import UserListPage from "../components/user/UserListPage";
import ListService from "../components/service/ServiceListPage";
import ListPaidGifts from "../components/paidGift/PaidGiftListPage";
import ListBooking, {
        loadNewBookings,
    loadAllBookings,
    loadArchivedBookings,
    filterNewBookings,
    filterArchivedBookings,
    filterAllBookings,
}  from "../components/orders/NewBookingListPage";
import Settings from "../components/Settings";


export default () => (
    <Router>
        <ListPaidGifts path="/" />
        <UserListPage path="users" />
        <ListService path="service" />
        <ListPaidGifts path="paid_gift" />
        <ListBooking path="new_orders" load={loadNewBookings} itemsFilter={filterNewBookings} />
        <ListBooking path="orders" load={loadAllBookings} itemsFilter={filterAllBookings} />
        <ListBooking path="trashed_orders" load={loadArchivedBookings} itemsFilter={filterArchivedBookings}  />
        <Settings path="settings" />
    </Router>
);

