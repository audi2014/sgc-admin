import React from "react";
import {Table, Form, Image, List} from "semantic-ui-react";
import Center from "react-center";
import BookingFooter from "./BookingFooter";
import {Stars} from '../rate';


const Attachments = ({attachment}) => {

    if(attachment.length) return (
        <Form.Group widths='equal' style={{height: 220}}>
            <h3>Attachments:</h3>
            {
                attachment.map(c =>
                    <Image src={c.url} size='small'
                           style={{height: 100}}
                           target='_blank'
                           href={c.url}
                    />
                )
            }
        </Form.Group>
    ) ;
    else return null;
};
const Priorities = ({priorities}) => {

    if(priorities && priorities.length) return (
        <Form.Group grouped>
            <h3>Priority List</h3>
            {
                priorities.map((c,key) =>
                    <List key={key} as='ul'>
                        <List.Item  as='li'>{c}</List.Item>

                    </List>
                )
            }
        </Form.Group>
    ) ;
    else return null;
};

const orserListSum = (orders) => {
    let sum = 0;
    if (!orders) return "no orders";
    orders.forEach(order => {
        sum += order.service.price * order.count;
    });
    return (sum / 100).toFixed(2);
};

const OrderList = ({orders}) => {
    return (
        <Table.Body>
            {orders.map(({service, count}) => <Line key={service.id}>
                    {service.name} :
                    ${(service.price / 100).toFixed(2)}
                    {+count !== 1 ? " x" + count : null}
                </Line>
            )}
            <Line>Total: ${orserListSum(orders)} </Line>
        </Table.Body>
    )
};
const Line = (props) => {
    return (
        <Table.Row>
            <Table.Cell>
                {props.children}
            </Table.Cell>
        </Table.Row>
    )
};

class BookingDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            cleanerRate,
            cleanerComment,
            paymentInfo, homeAccess_beHome, homeAccess_leaveKey,
            homeAccess_provideCode, zipCode, dirtyLevel, meetingDate, interval, adminComment, comment, orderList, id,
            isProcessed, isArchived, priorityList, attachmentList
        } = this.props.data;
        const {setBookingAdminData} = this.props;
        const parsedInfo = JSON.parse(paymentInfo);

        const livemode = parsedInfo && parsedInfo.livemode === true;
        return (
            <Form>
                <Center>
                    <Form.Group>
                        <h1>Order Info {livemode ? null : "(TEST)"}</h1>
                    </Form.Group>
                </Center>
                <Form.Group style={{
                    opacity: livemode ? 1 : 0.5
                }}>
                    <Form.Field>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Card Info</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Line>Number: {parsedInfo.getAccountNumber} </Line>
                                <Line>Type: {paymentInfo.getAccountType} </Line>
                                <Line>Transaction ID: {paymentInfo.getTransId}</Line>
                            </Table.Body>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Home Access</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Line>Be home: {homeAccess_beHome === '1' ? 'yes' : 'no'} </Line>
                                <Line>Leave key: {homeAccess_leaveKey === '1' ? 'yes' : 'no'} </Line>
                                <Line>Provide code: {homeAccess_provideCode === '1' ? 'yes' : 'no'}</Line>
                            </Table.Body>
                        </Table>
                    </Form.Field>
                    <Form.Field>
                        <Table attached>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Services</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <OrderList orders={orderList}/>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Summary</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Line>Zip Code: {zipCode} </Line>
                                <Line>Meeting date: {meetingDate} </Line>
                                <Line>Time interval: {interval.start} - {interval.end} </Line>
                                <Line>Comment: {comment} </Line>
                                <Line>Dirty level: {dirtyLevel} </Line>
                            </Table.Body>
                        </Table>
                    </Form.Field>
                </Form.Group>
                <Attachments attachment={attachmentList}/>
                <Priorities priorities={priorityList}/>

                {cleanerRate ? <Table attached>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Cleaners feedback</Table.HeaderCell>
                            <Table.HeaderCell>Comment</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>                        
                        <Table.Row>
                            <Table.Cell>
                                <Stars value={cleanerRate} />
                            </Table.Cell>
                            <Table.Cell>
                                {cleanerComment}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table> : null}

                <h3>Admin notes:</h3>
                <BookingFooter
                    data={{id, adminComment, isArchived, isProcessed}}
                    setBookingAdminData={setBookingAdminData}
                />
            </Form>
        )
    }


}

export default BookingDetails;