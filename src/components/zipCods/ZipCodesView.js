import React from "react";
import {Grid, Header, Table, Input, Icon, Button} from "semantic-ui-react";
import Center from "react-center";
import mapZipCodesToTable from "./MapZipCodsToTable";
import {DAYS} from "../../badcode/Constants";


export default ({
                    codes,
                    onAdd,
                    onDelete,
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
        this.inputs[dayOfWeek].inputRef.value = '';

        onAdd({code, dayOfWeek});
    };

    const handleDelete = (e) => {
        const dayOfWeek = +e.currentTarget.dataset['day'];
        const code = e.currentTarget.dataset['code'];  
        onDelete({code, dayOfWeek});
    };
    return (
        <Grid textAlign='center'>
            <Grid.Column style={{width: 1200}}>
                <Header as='h2' textAlign='center'>
                    ZIP codes
                </Header>
                <Center>
                    <Table striped unstackable columns={7}>
                        <Table.Header>
                            <Table.Row>
                            {DAYS.map((s,index)=><Table.HeaderCell key={index}>{s}</Table.HeaderCell>)}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {zipCodes
                                .map((daysCodes, i) => (
                                    <Table.Row key={i}>{daysCodes.map((code, j) => <Table.Cell
                                                                                   
                                            key={j}
                                        >
                                            {code ? <Icon 
                                                data-code={code}
                                                data-day={j}     
                                                link 
                                                name='trash'
                                                onClick={handleDelete}
                                            /> : null}
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