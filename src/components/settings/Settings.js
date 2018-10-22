import React from "react";
import ApiController from '../../badcode/ApiController';
import {Segment, Form, Header, Button, Grid} from 'semantic-ui-react';
import { navigate } from "@reach/router";
import ModalMessage from "../ModalMessage";
import {bindActionCreators} from "redux";
import * as messageActions from "../../actions/message";
import connect from "react-redux/es/connect/connect";
import {MSG_MODE_MODAL} from "../../badcode/Constants";


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
    }
    updatePassword = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (this.state.newPassword!==this.state.confirmPassword){
            return  this.props.showMessage('You are mistaken', 'Password does not match the confirm password');
        }
        else{
            return ApiController.fetch('user/change_password/', {
                newPassword: this.state.newPassword,
                oldPassword: this.state.oldPassword,
                confirmPassword: this.state.confirmPassword
            })
                .then(res => {
                    if (res) {
                        navigate(`/`)
                    }
                })
        }
    };
    handleOldPasswordChange = (e) => {
        this.setState({oldPassword: e.currentTarget.value});
    };
    handleNewPasswordChange = (e) => {
        this.setState({newPassword: e.currentTarget.value});
    };
    handleConfirmPasswordChange = (e) => {
        this.setState({confirmPassword: e.currentTarget.value});
    };
    render () {
        return(
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2'  textAlign='center'>
                        Change password
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <h3>Old password:</h3>
                            <Form.Input
                                onChange={this.handleOldPasswordChange}
                                fluid
                                icon='lock'
                                placeholder=''
                                type='password'
                                name={'p'}
                            />
                            <h3>New password:</h3>
                            <Form.Input
                                onChange={this.handleNewPasswordChange}
                                fluid
                                icon='lock'
                                placeholder=''
                                type='password'
                                name={'p1'}
                                autocomplete="new-password"

                            />
                            <h3>Re-type new password:</h3>
                            <Form.Input
                                onChange={this.handleConfirmPasswordChange}
                                fluid
                                icon='lock'
                                placeholder=''
                                type='password'
                                name={'p2'}
                                autocomplete="new-password"

                            />

                            <Button color='green'
                                    onClick={this.updatePassword}
                            >
                                Submit
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);