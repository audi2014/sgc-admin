import React from "react";
import {List, Segment, Icon,  Accordion} from "semantic-ui-react";

const css = {
	item:{paddingBottom: 20}
}

export default function CleanerCell({onDragEnter, onOpenClick, onDeleteBooking, active, opened, cleaner, bookings, distances, ...rest}) {
	const cleanerId = cleaner && cleaner.id;
	const bookingsOfCleanerId = getBookingsOfCleanerId(cleanerId,bookings);
	
	return (
		<List.Item
		    style={css.item}
		    onDragEnter={onDragEnter}
		    active={active}
		    {...rest}
		>
		    <Accordion className="cleaner-item" id={cleaner.id}>
		        <Accordion.Title
		            className="cleaner-item" id={cleaner.id}
		            onClick={onOpenClick}
		            index={cleaner.id}
		            active={opened}
		        >
		            <Icon name='dropdown' className="cleaner-item" id={cleaner.id} />
				    {cleaner.fullName} {cleaner.email} ({bookingsOfCleanerId.length})
				    {
				        distances && distances[cleaner.id] && distances[cleaner.id].distance_text
				        ? <span> ({distances[cleaner.id].distance_text} {distances[cleaner.id].duration_text})</span>
				        : null
				    }
			        </Accordion.Title>
			        <Accordion.Content
			            className="cleaner-item" id={cleaner.id}
			            active={opened}
			        >
				    {
				        bookingsOfCleanerId.map(booking => (
			                <BookingCell 
			                	key={booking.id}
			                	booking={booking}
			                	onDelete={onDeleteBooking}

			                />
			            ))
				    }
		        	</Accordion.Content>
		    </Accordion>
		</List.Item>
	);
};

function BookingCell({booking, onDelete}) {
	return (
		<Segment 
        	color='green' 
        >
                <List.Item
                    className="overflow cleaner-item"
                    id={booking.id} 
                >
                    {booking.meetingDate}<br/>
            		{booking.address}, {booking.city}; {booking.phone}
                    <Icon 
                        id={booking.id}
                        onClick={onDelete} 
                        link 
                        name='close'
                    />
                </List.Item>

        </Segment>
    );
};

function getBookingsOfCleanerId(id, array) {
	if(!id || !array) return [];
	else return array.filter(c=>+c.cleanerUserId === +id)
};
