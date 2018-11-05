import React from "react";
import Center from 'react-center';
import { Form, Table} from "semantic-ui-react";
import PaidGiftFooter from './PaidGiftFooter';


const Line = (props) => {
    return (
        <Table.Row>
            <Table.Cell>
                {props.children}
            </Table.Cell>
        </Table.Row>
    )
};

const PaidGiftDetails = ({data, updateGiftPayments}) => {
        const {detailsJson, paymentInfo, name, price, code, at,
            adminComment, isArchived, isProcessed, id} = data;
        const parsedDetails = JSON.parse(detailsJson);
        const parsedInfo = JSON.parse(paymentInfo);
        const date = new Date(Date.parse(at + " GMT+0"));
        const livemode = parsedInfo && parsedInfo.livemode === true;
        return (
            <Form >
                <Center>
                    <Form.Group>
                        <h1>Order Info {livemode ? null : "(TEST)"}</h1>
                    </Form.Group>
                </Center>
                <Form.Group style={{
                    opacity: livemode ? 1 : 0.5
                }}>
                    <Form.Field>
                    <Table >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Purchaser</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Line>
                                Email: {parsedDetails.purchaser.email}
                            </Line>
                            <Line>
                                fullName: {parsedDetails.purchaser.fullName}
                            </Line>
                            <Line>
                                Phone: {parsedDetails.purchaser.phone}
                            </Line>
                            <Line>
                                State: {parsedDetails.purchaser.state}
                            </Line>
                            <Line>
                                City: {parsedDetails.purchaser.city}
                            </Line>
                            <Line>
                                Zip code: {parsedDetails.purchaser.zip}
                            </Line>
                            <Line>
                                Address: {parsedDetails.purchaser.address}
                            </Line>
                            <Line>
                                Card from: {parsedDetails.purchaser.sendGiftEmail}
                            </Line>
                            <Line>
                                Card Should Say: {parsedDetails.recipient.cardsay}
                            </Line>
                        </Table.Body>
                    </Table>
                    </Form.Field>
                        <Form.Field>
                    <Table  attached>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Recipient</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Line>
                                Email: {parsedDetails.recipient.email}
                            </Line>
                            <Line>
                                fullName: {parsedDetails.recipient.fullName}
                            </Line>
                            <Line>
                                Phone: {parsedDetails.recipient.phone}
                            </Line>
                            <Line>
                                Notes: {parsedDetails.recipient.notes}
                            </Line>
                        </Table.Body>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Card info</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Line>
                                Email: {parsedInfo.getAccountNumber}
                            </Line>
                            <Line>
                                fullName: {parsedInfo.getAccountType}
                            </Line>
                            <Line>
                                Phone: {parsedInfo.getTransId}
                            </Line>
                        </Table.Body>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Gift</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Line>
                                Name: {name}
                            </Line>
                            <Line>
                                Price: {Math.floor(price / 100)}
                            </Line>
                            <Line>
                                CODE: {code}
                            </Line>
                            <Line>
                                When: {date.toLocaleDateString()} {date.toLocaleTimeString()}
                            </Line>
                        </Table.Body>
                    </Table>
                        </Form.Field>
                </Form.Group>
                <Form.Group>
                    <h3>Admin notes:</h3>
                </Form.Group>
                <PaidGiftFooter
                    data={{id, adminComment,isArchived,isProcessed }}
                    updateGiftPayments={updateGiftPayments}
                />
            </Form>
        )
}

export default PaidGiftDetails;