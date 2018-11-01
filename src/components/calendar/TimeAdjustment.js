import React from "react";
import {Button, Form, Input, Radio} from 'semantic-ui-react';
import Center from "react-center";

const orderListSum = (intervalStart, booking) => {
    let sum = 0;
    if ((parseInt(booking.interval.start) === intervalStart)) {
        booking.orderList.forEach(order => {
            if (!!+order.service.isTemporal) {
                sum += +order.service.name.substring(0, 1) * order.count;
            }
        });
    }
    return sum;
};
const bookingListSum = (intervalStart, items) => {
    let sum = 0;
    items.forEach(b => {
        sum += orderListSum(intervalStart, b);
    });
    return sum;

};

class TimeAdjustment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static getDerivedStateFromProps(props, state) {
        if (
            props.data.date !== state.date ||
            props.data.id !== state.id
        ) {
            return {
                ...props.data,
                hide1: +props.data.availableHours1 === 0,
                hide2: +props.data.availableHours2 === 0,
            }
        } else {
            return null
        }
    }

    handleChange1 = (e, {name, value}) => {
        if (isNaN(+value)) return;
        this.setState({availableHours1: value});
    };
    handleChange2 = (e, {name, value}) => {
        if (isNaN(+value)) return;
        this.setState({availableHours2: value});
    };

    toggle1 = (e, {checked}) => {
        this.setState({hide1: !checked});
    };
    toggle2 = (e, {checked}) => {
        this.setState({hide2: !checked});
    };
    handleUpdate = () => {
        const {availableHours1, availableHours2, hide1, hide2} = this.state;
        this.props.onEditAvailableHours({
            ...this.state,
            availableHours1: hide1 ? 0 : availableHours1,
            availableHours2: hide2 ? 0 : availableHours2,
        });
    };

    render() {
        const {items} = this.props;
        const {availableHours1, availableHours2, hide1, hide2} = this.state;
        return (
            <Form style={{ margin:0, marginTop:60}}>
                <Center>
                    <Form.Group inline>
                        <Form.Field>
                            <h4>8:00</h4>
                        </Form.Field>
                        <Form.Field>
                            <Radio toggle onChange={this.toggle1} checked={!hide1}/>
                        </Form.Field>
                    </Form.Group>
                </Center>
                <Form.Group inline>
                    <Form.Field>
                        <div> {bookingListSum(8, items)} hours of</div>
                    </Form.Field>
                    <Form.Field>
                        <Input type="text"
                               size='small'
                               disabled={hide1}
                               value={hide1 ? 0 : availableHours1}
                               name="availableHours1"
                               onChange={this.handleChange1}
                        />
                    </Form.Field>
                </Form.Group>
                <Center>
                    <Form.Group>
                        <Form.Field>
                            <h4>11:00</h4>
                        </Form.Field>
                        <Form.Field>
                            <Radio toggle onChange={this.toggle2} checked={!hide2}/>
                        </Form.Field>
                    </Form.Group>
                </Center>
                <Form.Group inline>
                    <Form.Field>
                        <div> {bookingListSum(11, items)} hours of</div>
                    </Form.Field>
                    <Form.Field>
                        <Input type="text"
                               disabled={hide2}
                               value={hide2 ? 0 : availableHours2}
                               name="availableHours2"
                               onChange={this.handleChange2}
                        />
                    </Form.Field>
                </Form.Group>
                <Center>
                    <Form.Button
                        style={{margin:0, marginTop:60}}
                        onClick={this.handleUpdate}
                        color='green'
                    >
                        Update
                    </Form.Button>
                </Center>
            </Form>
        )
    }
}

export default TimeAdjustment;