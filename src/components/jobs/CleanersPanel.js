import React from "react";
import {MenuTemplate} from '../Templates';
import {List, Segment, Icon,  Accordion} from "semantic-ui-react";
import CleanerCell from './CleanerCell';

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
        this.setState({selected:newIndex});
        onCleanerSelect(e.currentTarget.id);
    };



    onDragEnter = (e) => {
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
                            <CleanerCell
                                id={c.id}
                                key={c.id}
                                className="overflow cleaner-item"
                                onDragEnter={this.onDragEnter}
                                onOpenClick={this.handleSelect}
                                onDeleteBooking={this.handleDelete} 
                                active={c.id === selectedCleanerId} 
                                opened={c.id === selected} 
                                cleaner={c}
                                bookings={bookings}
                                distances={distances}
                            />                            
                        ))
                           
                }


            />
        )
    }
}

export default CleanersPanel;