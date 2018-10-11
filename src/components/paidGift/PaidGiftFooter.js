import React from "react";
import {Button, Form, TextArea} from "semantic-ui-react";
import Center from 'react-center';


class PaidGiftFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.data}
    }
    static getDerivedStateFromProps(props, state) {
        if (+props.data.id !== +state.id) {
            return {...props.data}
        } else {
            return null
        }
    }
   toggleProcessed = () => {
        const isProcessed = this.state.isProcessed === '0' ? '1' : '0';
        this.setState({isProcessed});
         this.props.updateGiftPayments({...this.state, isProcessed });
    };
    toggleArchive = () => {
         const isArchived = this.state.isArchived === '0' ? '1' : '0';
        this.setState({isArchived});
         this.props.updateGiftPayments({...this.state, isArchived });
    };
     handleCommentChange = (e) => {
         this.setState({adminComment: e.currentTarget.value});
    };
    render() {
        const {isProcessed, adminComment, isArchived} = this.state;
        return (
            <Form>
                <Form.Group>
                    {
                        isProcessed === '1'
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
                                isProcessed === '1'
                                    ? <Button
                                        color='green'
                                        onClick={this.toggleProcessed}>
                                        Processed
                                    </Button>
                                    : <Button
                                        onClick={this.toggleProcessed}
                                        color='green'
                                    >
                                        Set processed
                                    </Button>
                            }
                            <Button.Or/>

                                <Button
                                    onClick={this.toggleArchive}
                                    color={isArchived === '1' ? 'green' : 'orange'}
                                >
                                    {isArchived === '1' ? 'Put back': 'Move to trash'}
                                </Button>

                        </Button.Group>
                    </Form.Group>
                </Center>
            </Form>
        )
    }

}

export default PaidGiftFooter;

