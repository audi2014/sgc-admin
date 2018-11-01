import React from "react";
import ApiController from '../../badcode/ApiController';
import {Button, Header, Segment, Grid, Form} from "semantic-ui-react";
import {bindActionCreators} from "redux";
import * as messageActions from "../../actions/message";
import connect from "react-redux/es/connect/connect";

const emptyUser = {
    email: '',
    password: '',
    phone: '',
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
};

class AddCleaner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...emptyUser};
    }
    handleChange = (e) => {
        const obj = {};
        obj[e.currentTarget.name] =  e.currentTarget.value;
        this.setState(obj);
    };
    handleCreate = () => {
        return ApiController.fetch('admin/register-cleaner/', {
            user: this.state,
            password:this.state.password
            })
            .then(res => {
                if (res) {
                  this.props.showMessage
                    ('A new cleaner has been registered', 'Email verification was sent to e-mail address:'+this.state.email);
                    this.setState({...emptyUser});
                }
            })
    };
    render () {
        const {email, password, fullName, phone} = this.state;
        return (
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2'  textAlign='center'>
                        Create New Cleaner
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                placeholder='email'
                                type='email'
                                name='email'
                                onChange={this.handleChange}
                                value={email}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                placeholder='password'
                                type='password'
                                name='password'
                                onChange={this.handleChange}
                                value={password}

                            />
                            <Form.Input
                                fluid
                                placeholder='full name'
                                type='text'
                                name='fullName'
                                onChange={this.handleChange}
                                value={fullName}

                            />
                            <Form.Input
                                fluid
                                placeholder='phone'
                                type='text'
                                name='phone'
                                onChange={this.handleChange}
                                value={phone}
                            />

                            <Button color='green'
                                    onClick={this.handleCreate}
                            >
                                Create
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    return {
        message: state.message,
    }
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(messageActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCleaner);