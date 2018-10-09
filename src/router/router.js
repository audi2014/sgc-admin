import React from "react"
import { Router, Link } from "@reach/router"
import Calendar from "../components/Calendar";
import UserListPage from "../components/user/UserListPage";
import ListService from "../components/service/ServiceListPage";
import ListPaidGifts from "../components/ListPaidGifts";
import ListBookingNew from "../components/ListBookingNew";
import ListBooking from "../components/ListBooking";
import ListBookingArchived from "../components/ListBookingArchived";
import Settings from "../components/Settings";


export default () => (
    <Router>
        <Calendar path="/" />
        <UserListPage path="users" />
        <ListService path="service" />
        <ListPaidGifts path="paid_gift" />
        <ListBookingNew path="new_orders" />
        <ListBooking path="orders" />
        <ListBookingArchived path="trashed_orders" />
        <Settings path="settings" />
    </Router>
);

