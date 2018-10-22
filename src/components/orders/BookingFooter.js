import React from "react";
import {Button, Form, TextArea} from "semantic-ui-react";
import Center from 'react-center';


class BookingFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static getDerivedStateFromProps(props, state) {
        if (+props.data.id !== +state.id) {
            return {
                ...props.data,
                adminComment: props.data.adminComment || "",
                isProcessed: !!(+props.data.isProcessed),
                isArchived: !!(+props.data.isArchived)
            }
        } else {
            return null
        }
    }
    toggleProcessed = () => {
        const isProcessed = true;
        this.setState({isProcessed});
        this.props.setBookingAdminData({...this.state, isProcessed });
    };
    toggleArchive = () => {
        const isArchived = !this.state.isArchived;
        this.setState({isArchived});
        this.props.setBookingAdminData({...this.state, isArchived });
    };
    handleCommentChange = (e) => {
        this.setState({adminComment: e.currentTarget.value});
    };
    render() {
        const {isProcessed, adminComment, isArchived} = this.state;
        return (
            <div>
                <Form.Group>
                    {
                        isProcessed
                            ? adminComment
                            : <TextArea style={{width: "100%", maxWidth: "100%"}}
                                        onChange={this.handleCommentChange} value={adminComment}>
				                        </TextArea>
                    }
                </Form.Group>
                <Center>
                    <Form.Group>
                        <Button.Group>
                            {
                                isProcessed
                                    ? <Button
                                        disabled
                                        color='green'
                                        onClick={this.toggleProcessed}>
                                        Approved
                                    </Button>
                                    : <Button
                                        onClick={this.toggleProcessed}
                                        color='green'
                                    >
                                        Set Approved
                                    </Button>
                            }
                            <Button.Or/>
                            <Button
                                onClick={this.toggleArchive}
                                color={isArchived ? 'green' : 'orange'}
                            >
                                {isArchived ? 'Put back': 'Move to trash'}
                            </Button>
                        </Button.Group>
                    </Form.Group>
                </Center>
            </div>
        )
    }

}

export default BookingFooter;