import AbstractItemList from "./AbstractItemList";
import APIController from "../badcode/ApiController";
import {Menu, Button, Input, List, Form, Grid} from 'semantic-ui-react'
import React from "react";
import Center from 'react-center';
import ApiController from '../badcode/ApiController';



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

class ListUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem:null,
            items: [],
            page:0,
            orderBy:'id',
            search:'',
        }


        this.onClick = this.onClick.bind(this);
    }

    load = ({page, orderBy, search}) => {
        ApiController.fetch('admin/get_all_users/',  {page, orderBy, serch: search})
            .then(res => {
                if(res) {
                    this.setState({items: res.userList});
                }
            })
    }

    componentDidMount() {
        this.load(this.state)
    }

    onClick(e) {
        e.preventDefault();

        const id = e.currentTarget.id;
        const item = this.props.items.find(
            obj => Number(obj.id) === Number(id)
        );
        this.setState({selectedItem:item})
    }

    render() {
        const { selectedItem } = this.state;
        return (
            <Grid stackable columns={2} padded='vertically'>
                    <Grid.Column>
                        <Menu vertical>
                            <Menu.Item>
                                <Menu.Header>
                                    <Center>
                                        <h1>User List</h1>
                                    </Center>
                                </Menu.Header>
                                <Menu.Menu>
                                    <Center>
                                        <Button size='mini'>by name</Button>
                                        <Button size='mini'>by email</Button>
                                    </Center>
                                </Menu.Menu>
                            </Menu.Item>
                            <Menu.Item>
                                <Input
                                    icon='search'
                                    placeholder='Search...'/>
                            </Menu.Item>
                            <Menu.Item>
                                <List>
                                    {this.state.items.map(c => (
                                        <List.Item
                                            className="overflow"
                                            active={selectedItem && c.id === selectedItem.id}
                                            id={c.id} key={c} onClick={this.onClick}>{c.fullName}</List.Item>
                                    ))}
                                </List>
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column>
                        {this.state.selectedItem && < ReplyForm data={this.state.selectedItem }/>}
                    </Grid.Column>
            </Grid>
        )
    }
}



export default ListUser;