import { Icon, Pagination} from 'semantic-ui-react'
import React from "react";
import ApiController from '../../badcode/ApiController';
import UserList from './UserList';
import EditForm from './EditUser';
import UserDetails from './UserDetails';
import {PageTemplate} from '../Templates';


class ListUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            items: [],
            page: 0,
            totalPages: 1,
            orderBy: 'fullName',
            search: '',
        };


        this.handleItemSelect = this.handleItemSelect.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    load = ({page, orderBy, search}) => {
        return ApiController.fetch('admin/get_all_users/', {page, orderBy, serch: search})
            .then(res => {
                if (res) {
                    this.setState({items: res["userList"], totalPages: res["pages"] + 1});
                }
            })
    };

    updateUser = (user) => {

        this.setState({selectedItem: user});
        return ApiController.fetch('admin/edit_user/', {user})
            .then(res => {
                if (res && res.user) {
                    const newItems = this.state.items
                        .filter(u => Number(u.id) !== Number(res.user.id));
                    newItems.push(res.user);
                    this.setState({items: newItems});
                }
            })
    };

    componentDidMount() {
        this.load(this.state)
    }

    handleEditUser = (user) => {
        this.updateUser(user);
    };
    handleSearchChange = (search) => {
        this.load({...this.state, search}).then(res => {
            this.setState({search});
        })
        // const item = this.state.items.filter(
        //     obj =>
        //         obj.fullName.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        //         obj.email.toLowerCase().indexOf(search.toLowerCase()) >= 0
        // );
        // this.setState({items: item})
    };
    handleSortChange = (key) => {
        this.load({...this.state, orderBy: key}).then(res => {
            this.setState({orderBy: key});
        })
    };
    handlePageChange = (e, data) => {
        const artursPage = data.activePage - 1;

        this.load({...this.state, page: artursPage}).then(res => {
            this.setState({page: artursPage})
        })
    };

    handleItemSelect(id) {
        const item = this.state.items.find(
            obj => Number(obj.id) === Number(id)
        );
        this.setState({selectedItem: item})
    }

    render() {
        const {selectedItem, items, orderBy, totalPages} = this.state;
        return (
            <PageTemplate
                listMenu={ [
                    <UserList
                        key={1}
                        items={items}
                              onSortChange={this.handleSortChange}
                              onSearchChange={this.handleSearchChange}
                              orderBy={orderBy}
                              selectedItemId={selectedItem ? selectedItem.id : null}
                              onItemSelect={this.handleItemSelect}/>,

                    ]
                }
                pagination={ <Pagination defaultActivePage={1}
                                         onPageChange={this.handlePageChange}
                                         size='mini'
                                         ellipsisItem={{content: <Icon name='ellipsis horizontal'/>, icon: true}}
                                         firstItem={{content: <Icon name='angle double left'/>, icon: true}}
                                         lastItem={{content: <Icon name='angle double right'/>, icon: true}}
                                         prevItem={{content: <Icon name='angle left'/>, icon: true}}
                                         nextItem={{content: <Icon name='angle right'/>, icon: true}}
                                         totalPages={totalPages}/>}
                detailsItems={
                        selectedItem
                                ? [
                                    <UserDetails key={1} data={selectedItem}/>,
                                    <EditForm
                                        key={2}
                                        data={selectedItem}
                                        onEditUser={this.handleEditUser}
                                    />
                            ]
                            : []
                }
    />
    )
    }
}


export default ListUser;