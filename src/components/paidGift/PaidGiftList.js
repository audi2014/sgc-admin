import { Button, Input, List, Icon} from 'semantic-ui-react'
import React from "react";
import {MenuTemplate} from '../Templates';

export default ({gifts, selectedGiftId, onSearchChange, onSortChange, onItemSelect}) => {
    let timeout = null;
    const handleItemClick = (e) => {
        onItemSelect(e.currentTarget.id);
    };
    const handleSearchChange = (e) => {
        const search = e.currentTarget.value;
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            onSearchChange(search);
        }, 300);
    };
    const handleSortClick = (e) => {
        onSortChange(e.currentTarget.name);
    };

    return (
        <MenuTemplate
            style={{overflow: 'auto', maxHeight: 650}}
            header={
                <Input
                    onChange={handleSearchChange}
                    icon='search'
                    placeholder='Search...'/>
            }
            topMenu={
                [
                    <Button key={1} size='mini' name='all' onClick={handleSortClick}>all</Button>,
                    < Button key={2} size='mini' name='new' onClick={handleSortClick}> new</Button>,
                    <Button key={3} size='mini' name='processed' onClick={handleSortClick}>processed</Button>,
                    <Button key={4} size='mini' name='deleted' onClick={handleSortClick}>deleted</Button>
                ]
            }
            items={
                gifts
                    .map(c => (
                        <List.Item
                            className="overflow"
                            active={c.id === selectedGiftId}
                            id={c.id} key={c.id}
                            onClick={handleItemClick}
                        >
                            {
                                c.isArchived !== '0'
                                    ? <Icon name='trash alternate'/>
                                    : (c.isProcessed !== '0'
                                        ? <Icon name='thumbs up'/>
                                        : <Icon name='bolt'/>
                                    )
                            }
                            {c.id}) {c.name} {c.fullName} {c.phone}
                        </List.Item>
                    ))
            }
        />
    )
        ;
}