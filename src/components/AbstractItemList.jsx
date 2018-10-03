import React, {Component} from 'react';


class AbstractItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: true,
            sortBtnClass: "btn btn-default btn-sm",
            sortBtnClassActive: "btn btn-default btn-sm active",
            page: 0,
            pagesCount: 0,
            serchText: "",
            orderBy: false,
            items: [],
            itemsSorted: [],
            selectedId: this.props.selectedId
        };
        this.loadData = this.loadData.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.getItemText = this.getItemText.bind(this);
        this.onDataLoaded = this.onDataLoaded.bind(this);
        this.handleSerchTextChenged = this.handleSerchTextChenged.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleSerch = this.handleSerch.bind(this);
        this.handlePage = this.handlePage.bind(this);

    }

    componentDidMount() {
        this.loadData();
    }

//#VIRTUAL
    loadData() {
        throw new TypeError("AbstractItemList.loadData does not implemented");
    }

    onItemClick() {
        throw new TypeError("AbstractItemList.onItemClick does not implemented");
    }

    getPanelHead() {
        throw new TypeError("AbstractItemList.getPanelHead does not implemented");
    }

    getItemText(item) {
        throw new TypeError("AbstractItemList.getItemText does not implemented");
    }

//#UI
    onDataLoaded(arrayOfItems, pages) {
        if (typeof pages === 'undefined') {
            pages = false;
        }
        super.setState({
            pagesCount: pages,
            ready: true,
            items: arrayOfItems,
            itemsSorted: arrayOfItems
        });
    }

    handleSerchTextChenged(e) {
        this.state.serchText = this.refs.searchInput.value;
    }

    handleNext(e) {
        if (this.state.page < this.state.pagesCount) {
            this.state.page++;
            this.loadData();
        }
    }

    handlePrev(e) {
        if (this.state.page > 0) {
            this.state.page--;
            this.loadData();
        }
    }

    handlePage(e) {
        e.preventDefault();
        this.state.page = e.target.id;

        this.loadData();
    }

    handleSort(e) {
        if (e.target.id == this.state.orderBy) this.state.orderBy = false;
        else {
            this.state.orderBy = e.target.id;
        }
        this.state.page = 0;
        this.loadData();
    }

    handleSerch(e) {
        this.state.page = 0;
        this.loadData();
    }

    getSerchBar() {
        return (<div className="input-group">
            <input ref="searchInput" type="text" className="form-control input-lg" placeholder="search"
                   onChange={this.handleSerchTextChenged}/>

            <span className="input-group-btn">
							<button onClick={this.handleSerch} className="btn btn-primary btn-lg">
								<span className="glyphicon glyphicon-search"/>
							</button>
						</span>

        </div>);
    }

    getNavBar() {
        if (!this.state.pagesCount) return null;
        var rows = [];
        for (var i = 0; i <= this.state.pagesCount; i++) {
            if (this.state.page == i) {
                rows.push(
                    (<li key={i} className="page-item active">
                        <a href="#" className="page-link"> {i + 1}</a>
                    </li>)
                );
            }
            else {
                rows.push(
                    (<li id={i} key={i} className="page-item">
                        <a key={i + "_link"} href="#" id={i} onClick={this.handlePage} className="page-link">
                            <span id={i} key={i + "_text"} className="item-text">{i + 1}</span>
                        </a>
                    </li>)
                );
            }
        }
        return (
            <div className="panel-footer">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="previous"><a href="#" onClick={this.handlePrev}>Previous</a></li>
                        {rows}
                        <li className="next"><a href="#" onClick={this.handleNext}>Next</a></li>
                    </ul>
                </nav>
            </div>
        );
    }

    render() {
        var onItemClick = this.onItemClick;
        var getItemText = this.getItemText;
        var selectedId = this.state.selectedId;
        return (
            <div className="panel panel-primary">
                {this.getPanelHead()}
                <div className="panel-body">
                    {this.getSerchBar()}
                    {this.state.ready ? null :
                        <img ref="iconLoading" src="http://global.fncstatic.com/static/v/all/img/loader-trans-2.gif"/>}
                    <ul className="top-buffer list-group">
                        {
                            this.state.itemsSorted.map(
                                function (item, index) {
                                    var className = "list-group-item";
                                    var text = getItemText(item);
                                    if (!(text)) text = (<u>[empty data]</u>);
                                    if (item.id == selectedId) {
                                        className = "list-group-item active";
                                    }
                                    return (
                                        <button
                                            onClick={onItemClick}
                                            type="button"
                                            className={className}
                                            key={item.id}
                                            id={item.id}>
                                            {text}
                                        </button>
                                    );
                                }
                            )
                        }
                    </ul>
                </div>
                {this.getNavBar()}
            </div>
        );
    }
}

export default  AbstractItemList;