import { Grid} from 'semantic-ui-react'
import React from "react";
import ApiController from '../../badcode/ApiController';
import UserList from './UserList';
import UserDetails from './UserDetails';

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


        this.handleItemSelect = this.handleItemSelect.bind(this);
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

    handleItemSelect(id) {
        const item = this.state.items.find(
            obj => Number(obj.id) === Number(id)
        );
        this.setState({selectedItem:item})
    }

    render() {
        const { selectedItem, items } = this.state;
        return (
            <Grid stackable columns={2} padded='vertically'>
                <Grid.Column>
                    <UserList items={items}
                              selectedItemId={selectedItem ? selectedItem.id : null}
                              onItemSelect={this.handleItemSelect}/>
                </Grid.Column>
                <Grid.Column>
                    {this.state.selectedItem && <UserDetails data={this.state.selectedItem }/>}
                </Grid.Column>
            </Grid>
        )
    }
}



export default ListUser;