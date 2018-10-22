import React from "react";
import DateTimeFormInline from "./CalendarList";
import {Grid, Segment} from 'semantic-ui-react';
import TimeAdjustment from "./TimeAdjustment";
import BookingDetails from "../orders/BookingDetails";
import UserDetails from "../user/UserDetails";

export default ({
                    availableHours,
                    items,
                    selectedDay,
                    selectedBookings,
                    selectedUserArray,
                    onItemSelect,
                    onEditAvailableHours,
                    onGetOrders
                }
) => (
    <Grid>
        <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8} width={8}>
                {items ?
                    <DateTimeFormInline
                        onGetOrders={onGetOrders}
                        availableHours={availableHours}
                        items={items}
                        onItemSelect={onItemSelect}
                    /> : null}
            </Grid.Column>
            {
                selectedDay
                    ?
                    <Grid.Column mobile={16} tablet={8} computer={5} width={5}>
                        <Segment>
                            <TimeAdjustment
                                items={selectedBookings}
                                data={selectedDay}
                                onEditAvailableHours={onEditAvailableHours}
                            />
                        </Segment>
                    </Grid.Column> : null}
        </Grid.Row>
        {
            selectedDay
                ? <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={16} width={16}>
                            {
                                selectedBookings.map(c => (
                                        <Grid>
                                            <Grid.Row stretched>
                                                <Grid.Column width={8}>
                                                    <Segment>
                                                        <BookingDetails key={c.id}
                                                                        data={c}
                                                        />
                                                    </Segment>
                                                </Grid.Column>
                                                <Grid.Column width={8}>
                                                    <Segment>
                                                        <UserDetails key={c.userId}
                                                                     data={selectedUserArray.find(u => +u.id === +c.userId) || {}}
                                                        />
                                                    </Segment>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    )
                                )
                            }
                    </Grid.Column>

                </Grid.Row>
                : null
        }


    </Grid>
);