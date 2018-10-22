import React from "react";
import Calendar from 'react-calendar';
import {Form} from 'semantic-ui-react';
import {getMonthStartEnd} from "../../badcode/Constants";
import {jsDateToServerDate} from "../../badcode/Constants";

class DateTimeFormInline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            startDate: '',
            endDate: ''
        };
    }

    onChange = date => {
        this.props.onItemSelect(date);
        this.setState({date});
    };
    tileDisabled = ({activeStartDate, date, view}) => {
        if(view !== 'month') return false;
        if (date.getDay() === 0) return true;
        else if (date.getTime() + 24 * 60 * 60 * 1000 < Date.now()) return true;
        else return false;

    };
    renderChildren = ({date, view}) => {
        if(view !== 'month') return null;
        const dateStr = jsDateToServerDate(date);
        const countBooking = (this.props.items.filter(b=>b.meetingDate === dateStr) ).length;
        const countBookingStr = countBooking > 0 ? "(" + countBooking+ ")" : "";
        if (date.getDay() === 0) {
            return(<p>{countBookingStr}</p>) ;
        } else if (date.getTime() + 24 * 60 * 60 * 1000 < Date.now()) {
            return(<p>{countBookingStr}</p>) ;
        }  else {
            return <p style={{color: "red"}}>{countBookingStr}</p>;
        }
    };
    handleChangeMonth = ({activeStartDate}) => {
        debugger;
        this.setState({date: activeStartDate});
        this.props.onGetOrders(getMonthStartEnd(activeStartDate))

    };
    handleClickMonth = (date) => {
        this.setState({date: date});
        this.props.onGetOrders(getMonthStartEnd(date))

    };

    render() {
        const {date} = this.state;
        return (
            <Form>
                <div>
                    <Calendar
                        onClickMonth={this.handleClickMonth}
                        tileDisabled={this.tileDisabled}
                        tileContent={this.renderChildren}
                        locale={"en-En"}
                        onActiveDateChange={this.handleChangeMonth}
                        onChange={this.onChange}
                        value={date}
                    />
                </div>
            </Form>
        );
    }
}

export default DateTimeFormInline;