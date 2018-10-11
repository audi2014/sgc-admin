import {Menu, Button, Input, List} from 'semantic-ui-react'
import React from "react";
import {MenuTemplate} from '../Templates';


export default ({services, onServiceSelect, selectedServiceId, onServiceCreate}) =>{

    const handleServiceClick = (e) => {
        onServiceSelect(e.currentTarget.id);
    };
    const handleServiceCreate = (e) => {
        onServiceCreate()
    };
    return (
        <MenuTemplate
            header={<h1>Service List</h1>}
            items={services
                .sort((a, b) => {
                    if (a.isTemporal - b.isTemporal === 0) {
                        return a.name.localeCompare(b.name);
                    } else {
                        return b.isTemporal - a.isTemporal;
                    }
                })
                .map(c => (
                    <List.Item
                        style={{
                            textDecoration: c.deleted === "1" ? "line-through" : undefined
                        }}
                        className="overflow"
                        id={c.id}
                        key={c.id}
                        active={c.id === selectedServiceId}
                        onClick={handleServiceClick}
                    >
                        {c.name + " $" + c.price / 100}
                    </List.Item>
                ))}
            fotter={
                <Button onClick={handleServiceCreate} inverted color="green">
                    Create service
                </Button>
            }
        />
    );
}