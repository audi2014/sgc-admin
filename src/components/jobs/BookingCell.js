import React from "react";
import {List} from "semantic-ui-react";
const skipAnon = (str) => {
    return str.startsWith('@anon') ? '' : str;
};
export default ({data, active, children, ...rest}) => <List.Item
    draggable="true"
    className="overflow"
    active={active}
    {...rest}
>
    <List.Icon name={'address book outline'}  size='large' verticalAlign='middle'/>
    <List.Content>
        <List.Header>{skipAnon(data.fullName)} {data.phone}</List.Header>
        <List.Description>
            {data.meetingDate}&nbsp;
            {data.address}&nbsp;
            {skipAnon(data.email)}&nbsp;
            {children}
        </List.Description>
    </List.Content>

</List.Item>;
