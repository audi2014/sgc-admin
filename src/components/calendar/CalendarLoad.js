import React from "react";
import ApiController from "../../badcode/ApiController";
import {jsDateToServerDate} from "../../badcode/Constants";
import CalendarView from "./CalendarView";
import {getMonthStartEnd} from "../../badcode/Constants";


class CalendarLoad extends React.Component {
    constructor(props) {
        super(props);
        let currentDate = new Date();
        this.state = {
            ...getMonthStartEnd(new Date()),
            items: null,
            availableHours: [],
            date: currentDate,
            selectedDay: null,
            selectedBookings: [],
            selectedUserArray: [],
            selectedBooking: []

        };
    }

    getOrders = ({startDate, endDate, page, search}) => {
        ApiController.fetch('admin/get_available_hours/', {
            startDate: startDate,
            endDate: endDate,
        })
            .then(res => {
                if (res) {
                    this.setState({
                        availableHours: res['availableHours'],
                    })
                }
            });

        this.props.load(
            {
                startDate: startDate,
                endDate: endDate,
                serch: search || ''
            }
        )
            .then(bookingList => {
                this.setState({items: bookingList});
            })
    };

    loadUsersOfBookingArray = (bookingArray) => {
        //получаем массив ид пользователей из массива букингов
        const userIds = bookingArray.map(c => c.userId);
        //убирам дубликаты из массива ид пользователей
        const unicUserIds = userIds.filter(function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        });
        //получаем массив загрузок подставив в загрузчик ид из массива
        const selectedUsersLoadings = unicUserIds.map(userId => ApiController.fetch(
            'admin/get_user/',
            {
                user: {
                    id: userId
                }
            }
            )
        );
        //ждем выполнения ВСЕХ загрузок ( Promise.all )
        Promise.all(selectedUsersLoadings).then(arrayOfRes => {
            //фильтруем ответы сервера
            //и получаем массив пользователей
            return arrayOfRes.filter(Boolean)
                .map(res => res.user)

        }).then(arrayOfUsers => {
            //Послк всех страданий получаем долгожданный массив пользователей
            //пушим в стейт
            this.setState({selectedUserArray: arrayOfUsers})

        });
    };

    setAvailableHours = (availableHoursObj) => {
        return ApiController.fetch('admin/set_available_hours/', {availableHours: availableHoursObj})
            .then(res => {
                if (res) {
                    this.handleUpdateAvailableHours(availableHoursObj)
                }
            })
    };
    handleUpdateAvailableHours = (availableHoursObj) => {
        const newAvailableHours = this.state
            .availableHours.filter(s =>
                s.date !== availableHoursObj.date
            );
        newAvailableHours.push(availableHoursObj);
        this.setState({availableHours: newAvailableHours})
    };

    handleEditAvailableHours = (hours) => {
        this.setAvailableHours(hours);
    };

    componentDidMount() {
        this.getOrders(this.state);
    }

    handleItemSelect = (date) => {
        const dateStr = jsDateToServerDate(date);
        const day = this.state.availableHours.find(
            obj => obj.date === dateStr
        );
        const selectedBookings = this.state.items.filter(
            obj => obj.meetingDate === dateStr
        );

        this.loadUsersOfBookingArray(selectedBookings);

        this.setState({selectedDay: day, selectedBookings});
    };
    setBookingAdminData = ({id, ...rest}) => {

        return ApiController.fetch('admin/set_booking_admin_data/', {
            bookingId: id,
            ...rest
        })
            .then(res => {
                if (res) {

                    const selectedItem = {...this.state.selectedItem};

                    selectedItem.isArchived = rest.isArchived;
                    selectedItem.isProcessed = rest.isProcessed;
                    selectedItem.adminComment = rest.adminComment;

                    this.setState({
                        items: [...this.state.items],
                        selectedItem,
                    })
                }
            })
    };

    render() {
        return <CalendarView
            {...this.state}
            onGetOrders={this.getOrders}
            onItemSelect={this.handleItemSelect}
            onEditAvailableHours={this.handleEditAvailableHours}
        />
    }
}

export default CalendarLoad;