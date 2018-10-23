import React from "react"
import { Router, Link } from "@reach/router"
import Calendar from "../components/calendar/CalendarLoad";
import UserListPage from "../components/user/UserListPage";
import ListService from "../components/service/ServiceListPage";
import ListPaidGifts from "../components/paidGift/PaidGiftListPage";
import ZipCodsLoad from '../components/zipCods/ZipCodsLoad';

import ListBooking, {
    filterNewBookings,
    filterArchivedBookings,
    filterAllBookings,
}  from "../components/orders/NewBookingListPage";
import {
    loadNewBookings,
    loadAllBookings,
    loadArchivedBookings,
}  from "../components/orders/loaders";
import Settings from "../components/settings/Settings";


export default () => (
    <Router>
        <ZipCodsLoad path='zip_cods'/>
        <ListPaidGifts path="/" />
        <UserListPage path="users" />
        <ListService path="service" />
        <ListPaidGifts path="paid_gift" />
        <Calendar path='calendar' load={loadAllBookings} />
        <ListBooking path="new_orders" load={loadNewBookings} itemsFilter={filterNewBookings} />
        <ListBooking path="orders" load={loadAllBookings} itemsFilter={filterAllBookings} />
        <ListBooking path="trashed_orders" load={loadArchivedBookings} itemsFilter={filterArchivedBookings}  />
        <Settings path="settings" />
    </Router>
);

