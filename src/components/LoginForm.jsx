import React from 'react';
import {connect} from 'react-redux';
import APIController from "../badcode/ApiController";
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import *as messageActions from '../actions/message';
import {bindActionCreators} from 'redux';


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleEmailChange = (evt) => {
        this.setState({email: evt.target.value});
    };
    handlePasswordChange = (evt) => {
        this.setState({password: evt.target.value});
    };
    handleLogin = () => {
        const { showError } = this.props;

        if (!(this.state.email)) {
            showError("email is empty" );
        }
        else if (!(this.state.password)) {
            showError("password is empty" );
        }
        else {
            APIController.login(this.state.email, this.state.password);
        }
    };
    handleReset = () => {
        const { showError, showMessage } = this.props;
        if (!(this.state.email)) {
            showError("email is empty" );
        }
        else {
            APIController.fetch(
                'app/send_new_password/', 
                {user: {email: this.state.email}}
            ).then(
                () => {
                    showMessage(
                        "Ok!",
                        "A new password has been sent to your e-mail address: "
                        + this.state.email
                    )

                }
            );
        }
    };


    render() {
        return (
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Login as admin
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid icon='user'
                                placeholder='E-mail address'
                                onChange={this.handleEmailChange}
                            />
                            <Form.Input
                                fluid
                                placeholder='Password'
                                type='password'
                                onChange={this.handlePasswordChange}
                                value={this.state.password}
                            />

                            <Button color='teal'
                                    onClick={this.handleLogin}>
                                Login
                            </Button>
                            <Button color='teal'
                                    onClick={this.handleReset}>
                                Reset password
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
};

function mapStateToProps(state) {
    return {
        message: state.message,
    }
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(messageActions, dispatch),
});
export default connect (mapStateToProps, mapDispatchToProps)(LoginForm);