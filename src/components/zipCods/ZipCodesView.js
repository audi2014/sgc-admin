import React from "react";
import {Grid, Header, Table, Input, Icon, Button} from "semantic-ui-react";
import Center from "react-center";
import mapZipCodesToTable from "./MapZipCodsToTable";


export default ({
                    codes,
                    onChange
                }
) => {
    //ОСТОРОЖНО МАГИЯ!
    //тут будем хранить ссылки на инпуты
    // { dayOfWeek:ссылка на инпут элемент(реактовский)}
    this.inputs = {};
    const zipCodes = mapZipCodesToTable(codes);

    const handleAddClick = e => {

        //e.currentTarget - элемент Button
        //e.currentTarget.name - Button.name  = dayOfWeek по которому тыцкули
        const dayOfWeek = +e.currentTarget.name;

        //берем сслыку на инпут по dayOfWeek из Баттона
        //inputRef.value - получаем значение по ссылке из инпута
        const code = this.inputs[dayOfWeek].inputRef.value;
        //очищаем инпут
        this.inputs[dayOfWeek].inputRef.value = ''

        //делаем глубокую копию данных сервера
        const codesCopy = JSON.parse(JSON.stringify(codes));
        let obj = codesCopy.find(obj => +obj.dayOfWeek === dayOfWeek);
        if (code) {
            if(obj) {
                if(obj.zipCodes.find(s=>s===code)) {
                    alert("code already set")
                } else {
                    obj.zipCodes.push(code);
                }
            } else {
                codesCopy.push({dayOfWeek, zipCodes:[code] })
            }
            onChange(codesCopy);
        }
    };

    const handleDelete = (e) => {
        const dayOfWeek = +e.currentTarget.dataset['day'];
        const code = e.currentTarget.dataset['code'];
        const codesCopy = JSON.parse(JSON.stringify(codes));
        let obj = codesCopy.find(obj => +obj.dayOfWeek === dayOfWeek);
        if (code && obj) {
            obj.zipCodes = obj.zipCodes.filter(str => str !== code);

            onChange(codesCopy);
        }
    };
    return (
        <Grid textAlign='center'>
            <Grid.Column style={{width: 1200}}>
                <Header as='h2' textAlign='center'>
                    Zip Cods
                </Header>
                <Center>
                    <Table striped unstackable columns={7}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Mo</Table.HeaderCell>
                                <Table.HeaderCell>Tu</Table.HeaderCell>
                                <Table.HeaderCell>We</Table.HeaderCell>
                                <Table.HeaderCell>Th</Table.HeaderCell>
                                <Table.HeaderCell>Fr</Table.HeaderCell>
                                <Table.HeaderCell>Sa</Table.HeaderCell>
                                <Table.HeaderCell>Su</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {zipCodes
                                .map((daysCodes, i) => (
                                    <Table.Row key={i}>{daysCodes.map((code, j) => <Table.Cell
                                            data-code={code}
                                            data-day={j}
                                            onClick={handleDelete}
                                            key={j}
                                        >
                                            {code ? <Icon name='trash'/> : null}
                                            {code}
                                        </Table.Cell>
                                    )}
                                    </Table.Row>
                                ))}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                {
                                    new Array(7).fill(null).map((v, dayOfWeek) => {
                                        return <Table.HeaderCell

                                            key={dayOfWeek}
                                        >
                                            <Input

                                                ref={ref => {this.inputs[dayOfWeek] = ref}}
                                                name={dayOfWeek}
                                                style={{width: 70}}
                                                size='small'/>
                                            <Button
                                                onClick={handleAddClick}
                                                color='green'
                                                content='Add'
                                                name={dayOfWeek}
                                            />
                                        </Table.HeaderCell>
                                    })
                                }
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Center>
            </Grid.Column>
        </Grid>

    );
}