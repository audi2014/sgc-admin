import React from "react";
import {Segment, Form, List, Radio} from "semantic-ui-react";
import Center from "react-center";

const userTypes = [
    {title: "User", value: "0"},
    {title: "Admin", value: "1"},
    {title: "Cleaner", value: "4"},
    {title: "Guest", value: "3"},
    {title: "Test", value: "2"},
];

const Item = ({selectedValue, value, title, onChange}) => {
    return (<List.Item>
    <List.Icon name='users'/>
    <List.Content>
        <Radio
            value={value}
            checked={selectedValue === value}
            onChange={onChange}
            name='radioGroup'
            label={title}
        />
    </List.Content>
</List.Item>)}

class EditForm extends React.Component {
    state = {};
    handleChange = (e, {value}) => {

        this.props.onEditUser({...this.props.data, userType:value})

        this.setState({value},)
    };

    render() {
        const user = this.props.data;
        return (
            <Segment.Group>
                <Segment>
                    <Form>
                        <Center>
                            <Form.Group>
                                <h1>Edit User</h1>
                            </Form.Group>
                        </Center>
                        <Form.Group>
                            <h2>User type:</h2>
                        </Form.Group>
                        <Form.Group>
                            <List>
                                {userTypes.map(c => <Item
                                    selectedValue={user.userType}
                                    key={c.value}
                                    {...c}
                                    onChange={this.handleChange}
                                />)}
                            </List>
                        </Form.Group>
                    </Form>
                </Segment>
            </Segment.Group>
        )
    }
}

export default EditForm