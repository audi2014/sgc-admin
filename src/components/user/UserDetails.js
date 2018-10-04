import React from "react";
import {Input, Form} from "semantic-ui-react";

class ReplyForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {id,fullName} = this.props.data;
        return (
            <Form>
                <Form.Field inline>
                    <label>First name</label>
                    <Input placeholder={fullName}/>
                </Form.Field>
            </Form>
        )
    }
}

export default ReplyForm;