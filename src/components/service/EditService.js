import React from "react";
import {Segment, Form, Input, Radio, Button} from "semantic-ui-react";
import Center from "react-center";


class EditService extends React.Component {
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

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});
    };

    handlePriceChange = (e, {name, value}) => {
        if (isNaN(+value)) return;
        this.setState({price: Math.floor(value * 100)});
    };

    toggle = (e, {checked}) => {
        this.setState({isTemporal: checked ? '1' : '0'});
    };

    handleUpdate = () => {
        this.setState({deleted: '0'});
        this.props.onEditService({...this.state, deleted: '0'});

    };
    handleDelete = (deleted) => {
        this.setState({deleted: '1'});
        this.props.onEditService({...this.state, deleted: '1'});
    };

    render() {
        const {name, price, isTemporal, id, deleted} = this.state;
        return (
            <Form>
                <Center>
                    <Form.Group>
                        <h1>Edit Service {deleted === '1' ? " (DELETED)" : ""}</h1>
                    </Form.Group>
                </Center>
                <Form.Group>
                    <h4>Service name:</h4>
                </Form.Group>
                <Form.Group>
                    <Input type="text"
                           value={name}
                           name="name"
                           onChange={this.handleChange}
                           style={{overflow: 'auto', width: 700}}
                    />
                </Form.Group>
                <Form.Group>
                    <h4>Service price:</h4>
                </Form.Group>
                <Form.Group>
                    <Input
                        icon='dollar'
                        type="text"
                        value={Math.floor(price / 100)}
                        name="price"
                        onChange={this.handlePriceChange}
                        style={{overflow: 'auto', width: 700}}
                    />
                </Form.Group>
                <Form.Group>
                    <Radio label='Is time' toggle onChange={this.toggle} checked={isTemporal === '1'}/>
                </Form.Group>
                <Center>
                    <Form.Group>
                        <Button.Group>
                            {
                                (id)
                                    ?
                                    <Button
                                        disabled={deleted === '1'}
                                        inverted color='green'
                                        onClick={this.handleUpdate}
                                    >
                                        Update
                                    </Button>
                                    :
                                    <Button
                                        inverted color='green'
                                        onClick={this.handleUpdate}
                                    >
                                        Create
                                    </Button>
                            }
                            <Button.Or/>
                            {
                                (deleted === '1')
                                    ? <Button
                                        inverted color='yellow'
                                        onClick={this.handleUpdate}
                                    >
                                        Restore
                                    </Button>
                                    :
                                    <Button
                                        inverted color='red'
                                        onClick={this.handleDelete}
                                    >
                                        Delete
                                    </Button>
                            }
                        </Button.Group>
                    </Form.Group>
                </Center>
            </Form>
        )
    }
}

EditService.defaultProps = {
    data: {
        id: null,
        name: "",
        price: 100000,
        isMulticount: 0,
        isTemporal: 0
    }
};

export default EditService;