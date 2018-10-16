import React from "react";
import ApiController from "../../badcode/ApiController";
import PaidGiftList from './PaidGiftList';
import PaidGiftDetails from './PaidGiftDetails';
import {PageTemplate} from '../Templates';


const filterGifts = (type, search, items) => {
    items = items.filter((function (item) {
        return item.code.includes(search) || item.detailsJson.includes(search)
    }));

    if (type === 'deleted') return items.filter(item => item.isArchived === '1');
    else if (type === 'new') return items.filter(item => item.isArchived === '0' && item.isProcessed === '0');
    else if (type === 'processed') return items.filter(item => item.isArchived === '0' && item.isProcessed === '1');
    else return items;
};

class ListPaidGifts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGifts: null,
            gifts: [],
            search: '',
            filter: '',
            adminComment: String(props.adminComment || ''),
            isArchived: Boolean(Number(props.isArchived)),
            isProcessed: Boolean(Number(props.isProcessed)),
        };

    }

    getGiftPayments = () => {
        return ApiController.fetch('admin/get_gift_payments/')
            .then(res => {
                if (res) {
                    console.log(res);
                    this.setState({gifts: res['giftPayments']});
                }
            })
    };
    updateGiftPayments = ({id, isProcessed, isArchived, adminComment}) => {
        return ApiController.fetch('admin/set_gift_payment_admin_data/', {id, isProcessed, isArchived, adminComment})
            .then(res => {
                if (res) {
                    this.setState({isProcessed: res.isProcessed, isArchived: res.isArchived, adminComment: res.adminComment});
                }
            })
    };

    handleUpdateGiftPayments = data => {
        this.updateGiftPayments(data);
    };

    handleSearchChange = (search) => {
        this.setState({search: search})
    };
    handleFilterChange = (key) => {
        this.setState({filter: key});
    };
    handleItemSelect = (id) => {
        const gift = this.state.gifts.find(
            obj => Number(obj.id) === Number(id)
        );
        this.setState({selectedGifts: gift})
    };

    componentDidMount() {
        this.getGiftPayments(this.state)
    }

    render() {
        const {selectedGifts, gifts, search, filter} = this.state;

        const filtered = filterGifts(filter, search, gifts);


        return (
            <PageTemplate
                listMenu={
                    <PaidGiftList
                        gifts={filtered}
                        onSearchChange={this.handleSearchChange}
                        onSortChange={this.handleFilterChange}
                        selectedGiftId={selectedGifts ? selectedGifts.id : null}
                        onItemSelect={this.handleItemSelect}
                    />
                }
                detailsItems={
                    selectedGifts
                    ? [<PaidGiftDetails
                        key={1}
                        updateGiftPayments={this.handleUpdateGiftPayments}
                        data={selectedGifts}
                        />]
                        : []
                }
            />
        )
    }
}

export default ListPaidGifts;
