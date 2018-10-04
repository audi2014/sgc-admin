import {Menu, Button, Input, List, Form, Grid} from 'semantic-ui-react'
import React from "react";
import Center from 'react-center';


export default ({items, selectedItemId, onItemSelect}) => {
    const handleItemClick = (e) => {
        onItemSelect(e.currentTarget.id);
    }
    return (
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
                    {items.map(c => (
                        <List.Item

                            className="overflow"
                            active={c.id === selectedItemId}
                            id={c.id} key={c.id} onClick={handleItemClick}>{c.fullName}</List.Item>
                    ))}
                </List>
            </Menu.Item>
        </Menu>
    );
}