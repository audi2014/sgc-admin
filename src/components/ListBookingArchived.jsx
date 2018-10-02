import pickmeup from "pickmeup";
import APIController from "../badcode/ApiController";
import ListBooking from "./ListBooking";

class ListBookingArchived extends ListBooking {
    constructor(props) {
        super(props);
        this.state.startDate = new Date(2007, 0, 1).toISOString().slice(0, 10);
        this.state.endDate = new Date(2027, 0, 1).toISOString().slice(0, 10);
    }

    componentDidMount() {
        var dateRange = this.refs.dateRange;
        pickmeup(dateRange, {
            date: [new Date(2007, 0, 1), new Date(2027, 0, 1)],
            format: 'm/d/Y',
            mode: 'range',
            position: 'bottom',
            hide_on_select: false
        });
        dateRange.addEventListener('pickmeup-change', function (e) {
            var start = e.detail.date[0].toISOString().slice(0, 10);
            var end = e.detail.date[1].toISOString().slice(0, 10);

            this.state.startDate = start;
            this.state.endDate = end;
            this.loadData();
        }.bind(this));
        super.componentDidMount();
    }

    loadData() {

        var startDate = new Date().toISOString().slice(0, 10);
        var endDate = new Date().toISOString().slice(0, 10);
        var serch = "";
        if (this.state.startDate) startDate = this.state.startDate;
        if (this.state.endDate) endDate = this.state.endDate;

        this.setState({ready: false});
        APIController.getBookingList(
            this.state.page,
            startDate,
            endDate,
            serch,
            this.onDataLoaded,
            true
        );
    }
}

export default ListBookingArchived;