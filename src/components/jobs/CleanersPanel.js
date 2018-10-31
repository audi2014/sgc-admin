import React from "react";
import {MenuTemplate} from '../Templates';
import {List, Segment, Icon,  Accordion} from "semantic-ui-react";

class CleanersPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:-1
        }
    }

    handleSelect = (e, { index }) => {
        const { selected } = this.state;
        const {onCleanerSelect} = this.props;
        const newIndex = selected === index ? -1 : index;

        // console.log({selected,newIndex, index});
        this.setState({selected:newIndex});
        onCleanerSelect(e.currentTarget.id);
    };



    onDragEnter = (e) => {
        // console.log('onDragEnter', e.currentTarget.id);
        const {onDragEnter} = this.props;

        onDragEnter(e.currentTarget.id);
    };

    getBookingsOfCleanerId = (id, bookings) => {
        const i = [];

        const _f = booking => {
            if (booking.cleanerUserId === id) {
                i.push(booking)
            }
        };

        bookings.forEach(_f);

        return i;
    };
    handleDelete = (e) => {
        if (e.currentTarget.id) {
            this.props.onClearCleanerOfBooking(e.currentTarget.id);
        }

    };

    render() {
        const {cleaners, selectedCleanerId, bookings, distances} = this.props;
        const {selected} = this.state;
        return (
            <MenuTemplate
                style={{overflow: 'auto', height: '80vh'}}
                header={<h1>Cleaners List</h1>}
                items={
                    cleaners
                        .map((c,index) => (
                            <List.Item
                                style={{marginBottom: 20}}
                                onDragEnter={this.onDragEnter}
                                className="overflow cleaner-item"
                                active={c.id === selectedCleanerId}
                                id={c.id} key={c.id}
                            >
                                <Accordion className="cleaner-item" id={c.id}>
                                    <Accordion.Title
                                        className="cleaner-item" id={c.id}
                                        onClick={this.handleSelect}
                                        index={index}
                                        active={selected === index}
                                    >
                                        <Icon name='dropdown' className="cleaner-item" id={c.id} />
                                {c.fullName} {c.email} ({this.getBookingsOfCleanerId(c.id, bookings).length})

                                {
                                    distances && distances[c.id] && distances[c.id].distance_text
                                        ? <span> ({distances[c.id].distance_text} {distances[c.id].duration_text})</span>
                                        : null
                                }
                                    </Accordion.Title>
                                    <Accordion.Content
                                        className="cleaner-item" id={c.id}
                                        active={selected === index}>
                                {
                                    this.getBookingsOfCleanerId(c.id, bookings)
                                        .filter(booking => booking.id)
                                        .map(booking => (
                                            <Segment color='green' key={booking.id}>
                                                    < List.Item
                                                    className="overflow cleaner-item"
                                                    id={booking.id} key={booking.id}
                                                    >
                                                        {booking.meetingDate}<br/>
                                                {booking.address} {booking.phone}
                                                    <Icon id={booking.id}
                                                    key={c.id}
                                                    onClick={this.handleDelete} link name='close'/>
                                                    </List.Item>

                                            </Segment>
                                        ))
                                }
                                    </Accordion.Content>
                                </Accordion>
                            </List.Item>
                        ))
                }


            />
        )
    }
}

export default CleanersPanel;