import {Button, Input, List} from 'semantic-ui-react'
import React from "react";
import {MenuTemplate} from '../Templates';


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
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            onSearchChange(search);
        }, 300)


    };
    return (
        <MenuTemplate
            style={{overflow: 'auto', maxHeight: 650}}
            header={<h1>User List</h1>}
            topMenu={[
                <Button
                    key={1}
                    size='mini'
                    name='fullName'
                    onClick={handleSortClick}
                >
                    by name
                </Button>,
                <Button
                    key={2}
                    size='mini'
                    name='email'
                    onClick={handleSortClick}
                >
                    by email
                </Button>
            ]}
            search={
                <Input
                    onChange={handleSearchChange}
                    icon='search'
                    placeholder='Search...'/>
            }
            items={
                items
                    .sort((a, b) => {
                        const diff = a[orderBy] - b[orderBy];
                        return diff === 0 ? a.id - b.id : diff;
                    })
                    .map(c => (
                        <List.Item
                            className="overflow"
                            active={c.id === selectedItemId}
                            id={c.id} key={c.id} onClick={handleItemClick}>{c.fullName || c.email}
                        </List.Item>
                    ))
            }
        />
    );
};