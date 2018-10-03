import React from "react"
import { Router, Link } from "@reach/router"
import Calendar from "../components/Calendar";
import ListUser from "../components/ListUser";
import ListService from "../components/ListService";
import ListPaidGifts from "../components/ListPaidGifts";
import ListBookingNew from "../components/ListBookingNew";
import ListBooking from "../components/ListBooking";
import ListBookingArchived from "../components/ListBookingArchived";
import Settings from "../components/Settings";


export default () => (
    <Router>
        <Calendar path="/" />
        <ListUser path="users" />
        <ListService path="service" />
        <ListPaidGifts path="paid_gift" />
        <ListBookingNew path="new_orders" />
        <ListBooking path="orders" />
        <ListBookingArchived path="trashed_orders" />
        <Settings path="settings" />
    </Router>
);

