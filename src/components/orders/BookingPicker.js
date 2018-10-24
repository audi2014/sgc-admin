import React from "react";
import {Input, Select} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {MONTH_NAMES} from '../../badcode/Constants'

const monthOptions = MONTH_NAMES.map((s, i) => {
    return {key: i, text: s, value: i}
});

const YearPiker = ({handleChange, ...rest}) => {
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let i = currentYear - 10; i < currentYear + 10; i++) {
        yearOptions.push({key: i, text: i, value: i})
    }


    return <Select name="year"
                   onChange={this.handleChange}
                   {...rest}
                   options={yearOptions}
                   compact

    />
};

const MonthPiker = ({handleChange, ...rest}) => {
    return <Select name="month"
                   onChange={this.handleChange}
                   {...rest}
                   options={monthOptions}
                   compact

    />
};


class BookingPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: props.defaultMonth,
            year:props.defaultYear,
        }
    }

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});

        const year = name === 'year' ? value : this.state.year;
        const month = name === 'month' ? value : this.state.month;

        this.props.onBookingLoad({year, month});
    };

    render() {
        const {month, year} = this.state;
        return (
            <Input fluid

            >
                <MonthPiker
                    name="month"
                    onChange={this.handleChange}
                    value={month}
                />
                <YearPiker name="year"
                           onChange={this.handleChange}
                           value={year}

                />
            </Input>
        )
    }

}
BookingPicker.defaultProps = {
    defaultMonth:new Date().getMonth(),
    defaultYear:new Date().getFullYear(),

}
BookingPicker.propTypes = {
    defaultMonth:PropTypes.number,
    defaultYear:PropTypes.number,
    onBookingLoad: PropTypes.func.isRequired,
};

export default BookingPicker;