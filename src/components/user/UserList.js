import {Menu, Button, Input, List} from 'semantic-ui-react'
import React from "react";
import Center from 'react-center';


export default ({items, selectedItemId, onItemSelect, onSortChange, orderBy, onSearchChange}) => {
    let timeout = null;
    const handleItemClick = (e) => {
        onItemSelect(e.currentTarget.id);
    };
    const handleSortClick = (e) => {
        onSortChange(e.currentTarget.name);
    };
    const handleSearchChange = (e) => {
        const search = e.currentTarget.value;
        if(timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(()=>{
            onSearchChange(search);
        },300)


    };
    return (
        <Menu vertical  size='large' style={{overflow: 'auto', maxHeight: 650, width: 385 }}>
            <Menu.Item>
                <Menu.Header>
                    <Center>
                        <h1>User List</h1>
                    </Center>
                </Menu.Header>
                <Menu.Menu>
                    <Center>
                        <Button size='mini' name='fullName' onClick={handleSortClick}>by name</Button>
                        <Button size='mini' name='email' onClick={handleSortClick}>by email</Button>
                    </Center>
                </Menu.Menu>
            </Menu.Item>
            <Menu.Item>
                <Input
                    onChange={handleSearchChange}
                    icon='search'
                    placeholder='Search...'/>
            </Menu.Item>
            <Menu.Item>
                <List>
                    {items
                        .sort((a,b) => {
                            const diff = a[orderBy] - b[orderBy];
                            return diff === 0 ?  a.id - b.id :diff;
                        })
                        .map(c => (
                        <List.Item
                            className="overflow"
                            active={c.id === selectedItemId}
                            id={c.id} key={c.id} onClick={handleItemClick}>{c.fullName || c.email}
                            </List.Item>
                    ))}
                </List>
            </Menu.Item>
        </Menu>
    );
}