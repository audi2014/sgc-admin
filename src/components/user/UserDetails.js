import React from "react";
import { Form, Table} from "semantic-ui-react";
import Center from 'react-center';
import Stars from '../rate';


class ReplyForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { cleanerRateAvg,cleanerRateCount, fullName, email, phone, address, city, regDate, zipCode, bedrooms, fullBathrooms, bathroomsWithShower,
            halfBathrooms, levels, dogsPets, catsPets, footage, parkingInDriveway, parkingOnStreet, paidParking} = this.props.data;
        return (
                    <Form>
                        <Center>
                            <Form.Group>
                                <h1>User Info</h1>
                            </Form.Group>
                        </Center>
                        <Form.Group>
                            <h3>Full Name: {fullName}</h3>
                        </Form.Group>
                        <Form.Group>
                            <Table basic='very' celled collapsing>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            Email: {email}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row><Table.Cell>
                                    <Stars value={cleanerRateAvg} avg={cleanerRateAvg} count={cleanerRateCount}/>                                    
                                    </Table.Cell></Table.Row>                                    
                                    <Table.Row>
                                    <Table.Cell>
                                        Phone: {phone}
                                    </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Address: {address}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Reg date: {regDate}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            City: {city}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Zip code: {zipCode}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Form.Group>
                        <Form.Group inline >
                            <Form.Field>
                            <Table basic='very'>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            Bedrooms: {bedrooms ? bedrooms : '?'}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Full Bathrooms: {fullBathrooms ? fullBathrooms : '?'}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            With Shower Only: {bathroomsWithShower ? bathroomsWithShower : '?'}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Half Bathrooms: {halfBathrooms ? halfBathrooms : '?'}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Levels: {levels ? levels : '?'}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Dogs pets: {dogsPets ? dogsPets : '?'}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Cats pets: {catsPets ? catsPets : '?'}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table >
                            </Form.Field>
                            <Form.Field>
                            <Table basic='very'>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            Footage: {footage}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Parking in Driveway: {parkingInDriveway===1 ? 'yes' : 'no'}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Parking on street: {parkingOnStreet===1 ? 'yes' : 'no'}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Paid parking: {paidParking===1 ? 'yes' : 'no'}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            </Form.Field>
                        </Form.Group>
                    </Form>
        )
    }
}

export default ReplyForm;