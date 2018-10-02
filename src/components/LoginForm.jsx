import React, {Component} from 'react';
import {E_CODE_ARG_MISSING, MSG_MODE_MODAL} from "../badcode/Constants";
import APIController from "../badcode/ApiController";
import { Button, Form, Grid, Header,Segment } from 'semantic-ui-react'

class LoginForm extends React.Component {
    isBlankString = (str) => {
        return (str.length === 0 || !str.trim());
    };
    handleEmailChange = (evt) => {
        this.setState({email: evt.target.value});
    };
    handlePasswordChange = (evt) => {
        this.setState({password: evt.target.value});
    };
    handleLogin = () => {
        if (this.isBlankString(this.state.email)) {
            //code, textStr, type = MSG_MODE_STATIC, onOk = null
            this.props.app.showMessage(E_CODE_ARG_MISSING, "email is empty!", MSG_MODE_MODAL);
        }
        else if (this.isBlankString(this.state.password)) {
            this.props.app.showMessage(E_CODE_ARG_MISSING, "password is empty!", MSG_MODE_MODAL);
        }
        else {
            APIController.login(this.state.email, this.state.password);
        }
    };
    handleReset = () => {
        if (this.isBlankString(this.state.email)) {
            //code, textStr, type = MSG_MODE_STATIC, onOk = null
            this.props.app.showMessage(E_CODE_ARG_MISSING, "email is empty!", MSG_MODE_MODAL);
        }
        else {
            APIController.resetPassword(
                this.state.email,
                function () {
                    this.props.app.showMessage(
                        null,
                        "A new password has been sent to your e-mail address: " + this.state.email,
                        MSG_MODE_MODAL
                    );
                }.bind(this)
            );
        }
    };

    state = {
        email: "",
        password: "",
        error: '',
    };

    render() {
        return (
            <div className='login-form'>
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
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
                                    iconPosition='left'
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
            </div>
        );
    }
};

export default LoginForm;