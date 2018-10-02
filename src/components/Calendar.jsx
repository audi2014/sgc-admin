import React, {Component} from 'react';
import APIController from "../badcode/ApiController";
import {MONTH_NAMES} from "../badcode/Constants";
import DetailsBookingHorizontal from './DetailsBookingHorizontal';


class Calendar extends React.Component {
    constructor(props) {
        super(props);
        var currentDate = new Date();
        currentDate.setDate(1);
        currentDate.setHours(1);
        currentDate.setMinutes(1);
        currentDate.setSeconds(1);


        var bookingListArr = [];
        for (var i = 0; i < 32; i++) {
            bookingListArr.push([]);
        }

        this.state = {
            editZipCodes: false,
            selectedDate: false,
            bookingList: bookingListArr,
            ready: false,
            readyCalendar: false,
            availableHours: [],
            currentLoaderPage: 0,
            totalLoaderPages: 0,
            date: currentDate
        };
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onAvailableHoursChange = this.onAvailableHoursChange.bind(this);
        this.handleAvailableHoursCheckedChange = this.handleAvailableHoursCheckedChange.bind(this);
        this.handleAvailableHoursChange = this.handleAvailableHoursChange.bind(this);


        this.loadBookingList = this.loadBookingList.bind(this);
        this.onBookingListLoaded = this.onBookingListLoaded.bind(this);

        this.loadCalendar = this.loadCalendar.bind(this);
        this.onCalendarReady = this.onCalendarReady.bind(this);
        this.onCalendarLoaded = this.onCalendarLoaded.bind(this);

        this.onDateClick = this.onDateClick.bind(this);
        this.showEditAvailableZipCodes = this.showEditAvailableZipCodes.bind(this);
        this.cancelEditAvailableZipCodes = this.cancelEditAvailableZipCodes.bind(this);
        this.saveAvailableZipCodes = this.saveAvailableZipCodes.bind(this);
        this.getHead = this.getHead.bind(this);

    }

    componentDidMount() {
        this.loadCalendar();
    }

    onCalendarReady() {
        this.setState({
            readyCalendar: true
        });
    }

    getMonthStartEnd(date) {
        var y = date.getFullYear();
        var m = date.getMonth();
        var ds = new Date(y, m, 1).getDate();
        var de = new Date(y, m + 1, 0).getDate();
        m += 1;
        var startDate = y + '-' + (m < 10 ? '0' + m : m) + '-' + (ds < 10 ? '0' + ds : ds);
        var endDate = y + '-' + (m < 10 ? '0' + m : m) + '-' + (de < 10 ? '0' + de : de);
        return {startDate: startDate, endDate: endDate};
    }

    //START
    //1 -> 2
    loadCalendar() {
        var bookingListArr = [];
        for (var i = 0; i < 32; i++) {
            bookingListArr.push([]);
        }

        this.setState({
            editZipCodes: false,
            selectedDate: false,
            availableHours: [],
            availableZipCodes: [],
            bookingList: bookingListArr,
            ready: false,
            readyCalendar: false,
            currentLoaderPage: 0,
            totalLoaderPages: 0
        });

        var twoDates = this.getMonthStartEnd(this.state.date);
        APIController.getCalendar(
            twoDates.startDate,
            twoDates.endDate,
            this.onCalendarLoaded
        );
        APIController.getAviableZipCodes(
            this.state.date.getFullYear(),
            this.state.date.getMonth(),
            function (v) {
                this.setState({availableZipCodes: v})
            }.bind(this)
        );
    }

    //2
    //1 -> 2 -> 3
    onCalendarLoaded(availableHours) {

        for (var i = 0; i < availableHours.length; i++) {
            var date = parseInt(availableHours[i].date.split('-')[2], 10);
            this.state.availableHours[date] = availableHours[i];
        }
        this.onCalendarReady();
        this.loadBookingList();
    }

    //3
    //2 -> 3 -> 4
    //4 -> 3 -> 4
    loadBookingList() {

        var twoDates = this.getMonthStartEnd(this.state.date);
        // console.log(startDate+" - "+endDate);

        var serch = "";
        APIController.getBookingList(
            this.state.currentLoaderPage,
            twoDates.startDate,
            twoDates.endDate,
            serch,
            this.onBookingListLoaded
        );
    }

    //4
    //4 -> 3
    //or
    //4 ->finish
    onBookingListLoaded(arrayOfItems, pages) {
        this.state.currentLoaderPage += 1;
        for (var i = 0; i < arrayOfItems.length; i++) {
            if (arrayOfItems[i].isArchived != 0) continue;
            var date = parseInt(arrayOfItems[i].meetingDate.split('-')[2], 10);
            this.state.bookingList[date].push(arrayOfItems[i]);
        }
        // this.state.bookingList = arrayOfItems.concat(this.state.bookingList);
        this.state.totalLoaderPages = pages;
        // console.log("onDataLoaded [pages:"+this.state.currentLoaderPage+" / "+pages + "]");

        if (this.state.currentLoaderPage > pages) {
            this.setState({ready: true});
        }
        else {
            this.loadBookingList();
        }
    }

    handleAvailableHoursCheckedChange(e) {
        e.preventDefault();
        var date = parseInt(e.target.id);
        var key = String(e.target.name);
        var value = e.target.checked ? 50 : 0;
        this.onAvailableHoursChange(date, key, value);

    }

    handleAvailableHoursChange(e) {
        e.preventDefault();
        var date = parseInt(e.target.id);
        var key = String(e.target.name);
        var value = parseInt(e.target.value);
        this.onAvailableHoursChange(date, key, value);

    }

    onAvailableHoursChange(date, key, value) {
        var prevAvailableHours = this.state.availableHours[date] ? this.state.availableHours[date] : {
            'date': this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + date,
            'type': '0',
            'description': "",
            'availableHours1': 50,
            'availableHours2': 50,
        };
        prevAvailableHours[key] = value;
        this.state.availableHours[date] = prevAvailableHours;
        this.setState({
            readyCalendar: false
        });
        APIController.setAvailableHours(
            prevAvailableHours,
            this.onCalendarReady
        );
    }

    handleNext(e) {
        if (this.state.date.getMonth() != 11) {
            this.state.date.setMonth(this.state.date.getMonth() + 1)
        }
        else {
            this.state.date.setMonth(0);
            this.state.date.setFullYear(this.state.date.getFullYear() + 1);
        }
        this.loadCalendar();
    }

    handlePrev(e) {
        var nowDate = new Date();

        if (nowDate.getFullYear() <= this.state.date.getFullYear()) {

            if (nowDate.getFullYear() != this.state.date.getFullYear() || nowDate.getMonth() < this.state.date.getMonth()) {
                if (this.state.date.getMonth() != 0) {
                    this.state.date.setMonth(this.state.date.getMonth() - 1)
                }
                else {
                    this.state.date.setMonth(11);
                    this.state.date.setFullYear(this.state.date.getFullYear() - 1);
                }
                this.loadCalendar();
            }

        }
    }

    onDateClick(e) {
        if (e.target.id && this.state.bookingList[e.target.id] !== undefined) {
            if (this.state.selectedDate == e.target.id) {
                this.setState({selectedDate: false});
            }
            else {
                this.setState({selectedDate: e.target.id});
            }
        }
    }

    getBookingListPanel(app, bookingList, id) {
        if (bookingList[id] === undefined) return null;
        var rows = [];
        for (var i = 0; i < bookingList[id].length; i++) {
            rows.push(<DetailsBookingHorizontal app={app} data={bookingList[id][i]}/>);
        }
        return rows;
    }

    isLivePayment(booking) {
        try {
            var paymentInfo = JSON.parse(booking.paymentInfo);
            if (paymentInfo.livemode === true) return true;
            else return false;
        } catch (e) {
            return false;
        }
    }

    getBody(date /*year, month*/) {
        /*
		month--; // in 01 == jan
		var date = new Date(year, month, 1, 1, 1, 1, 1);
		*/
        var dateNow = new Date();
        dateNow.setHours(0);
        var startD = date.getUTCDay();
        var startM = date.getMonth();

        if (date.getUTCDay() - date.getDay() == 0) {
            startD -= 1;
            if (startD < 0) startD = 6; // 0 == Mo
        }

        var rows = [];
        for (var w = 0; w < 6; w++) {
            if (date.getMonth() > startM) break;
            var cels = [];
            for (var d = 0; d < 7; d++) {
                var countBooking = this.state.bookingList[date.getDate()].length;

                //calc usedHours of day
                var usedHours1 = 0;
                var usedHours2 = 0;
                if (countBooking > 0) {
                    for (var i = 0; i < countBooking; i++) {
                        var booking = this.state.bookingList[date.getDate()][i];
                        //if(this.isLivePayment(booking)) {
                        for (var j = 0; j < booking.orderList.length; j++) {
                            if (parseInt(booking.orderList[j].service.isTemporal, 10) === 1) {
                                var h = parseInt(booking.orderList[j].service.name.substring(0, 1));
                                var c = parseInt(booking.orderList[j].count);
                                if (booking.interval && booking.interval.start) {
                                    if (parseInt(booking.interval.start) < 11) {
                                        usedHours1 += (h * c);
                                    } else {
                                        usedHours2 += (h * c);
                                    }
                                }
                            }
                        }
                        //}
                    }
                }
                if ((w == 0 && d < startD) || startM != date.getMonth()) {
                    //hide prev month
                    cels.push(<td className="calendar-disable" key={w + "-" + d}></td>);
                }
                // else if(d>4)  {
                else if (d > 5) {
                    //hide Sa [depricated: and Su]
                    cels.push(<td className="calendar-disable" key={w + "-" + d}>&nbsp;{date.getDate()}</td>);
                    date.setDate(date.getDate() + 1);
                }
                else if (dateNow >= date) {
                    var classname = "calendar-past";
                    if (date.getDate() == this.state.selectedDate) {
                        classname = "calendar-select";
                    }
                    //hide past dates
                    cels.push(
                        <td
                            id={date.getDate()} onClick={this.onDateClick}
                            className={classname} key={w + "-" + d}>
                            &nbsp;<b>{date.getDate()}</b>&nbsp;{countBooking > 0 ? "(" + countBooking + ")" : ""}
                        </td>
                    );
                    date.setDate(date.getDate() + 1);

                }
                else {
                    //available hours
                    var availableHours1 = 50;
                    var availableHours2 = 50;
                    var availableHoursObj = this.state.availableHours[date.getDate()]
                    if (availableHoursObj) {

                        availableHours1 = availableHoursObj.availableHours1 === null
                            ? availableHours1
                            : parseInt(availableHoursObj.availableHours1);
                        availableHours2 = availableHoursObj.availableHours2 === null
                            ? availableHours2
                            : parseInt(availableHoursObj.availableHours2);
                    }


                    var classname = "calendar-active";
                    classname += " calendar-count-" + countBooking;
                    if (!availableHours1 || !availableHours2) {
                        classname += " calendarBusy" + Number(!availableHours1) + Number(!availableHours2)
                    }
                    ;
                    if (date.getDate() == this.state.selectedDate) {
                        classname = "calendar-select";
                    }
                    cels.push(
                        <td
                            id={date.getDate()} onClick={this.onDateClick}
                            className={classname} key={w + "-" + d}>
                            <span>&nbsp;<b>{date.getDate()}</b>&nbsp;{countBooking > 0 ? "(" + countBooking + ")" : ""}</span><br/>
                            <p>
                                <b>8:00</b> {usedHours1}&nbsp;h of:
                                <b><input
                                    onClick={function (e) {
                                        console.log(e);
                                        e.stopPropagation();
                                    }}
                                    onChange={this.handleAvailableHoursChange}
                                    id={date.getDate()}
                                    name='availableHours1'
                                    style={{borderColor: 'rgba(125, 173, 68, 0.24)', background: 'transparent'}}
                                    value={availableHours1} type="number" min="0" max="100"
                                />
                                </b>

                                <input
                                    id={date.getDate()}
                                    name="availableHours1"
                                    onChange={this.handleAvailableHoursCheckedChange}
                                    type="checkbox"
                                    checked={availableHours1 > 0}/>

                            </p>
                            <p>
                                <b>11:00</b> {usedHours2}&nbsp;h of:
                                <b><input
                                    onClick={function (e) {
                                        console.log(e);
                                        e.stopPropagation();
                                    }}
                                    onChange={this.handleAvailableHoursChange}
                                    id={date.getDate()}
                                    name='availableHours2'
                                    style={{borderColor: 'rgba(125, 173, 68, 0.24)', background: 'transparent'}}
                                    value={availableHours2} type="number" min="0" max="100"
                                />
                                </b>

                                <input
                                    id={date.getDate()}
                                    name="availableHours2"
                                    onChange={this.handleAvailableHoursCheckedChange}
                                    type="checkbox"
                                    checked={availableHours2 > 0}/>
                            </p>
                        </td>
                    );
                    date.setDate(date.getDate() + 1);

                }
            }
            rows.push(<tr key={w}>{cels}</tr>)
        }
        return rows;
    }

    showEditAvailableZipCodes(e) {
        this.setState({editZipCodes: +e.target.id});
    }

    cancelEditAvailableZipCodes(e) {
        this.setState({editZipCodes: false});
    }

    saveAvailableZipCodes(e) {
        this.setState({editZipCodes: false});
        const y = this.state.date.getFullYear();
        const m = this.state.date.getMonth();
        const dayOfWeek = e.target.id;
        var zipCodes = String(e.target.elements.zipcodes.value).trim();
        if (zipCodes) {
            zipCodes = zipCodes.split(',')
                .map(function (v) {
                    return String(v).trim().toLowerCase()
                });
        } else {
            zipCodes = [];
        }

        const newAvailableZipCodes = this.state.availableZipCodes
            .filter(function (row) {
                return row.dayOfWeek != dayOfWeek
            });
        newAvailableZipCodes.push({
            year: y,
            month: m,
            dayOfWeek: dayOfWeek,
            zipCodes: zipCodes
        });
        APIController.setAviableZipCodes(
            y,
            m,
            newAvailableZipCodes,
            function (v) {
                this.setState({availableZipCodes: v})
            }.bind(this)
        );
    }

    getHead() {

        const availableZipCodes = this.state.availableZipCodes;
        const editZipCodes = this.state.editZipCodes;
        const showEditAvailableZipCodes = this.showEditAvailableZipCodes;
        const cancelEditAvailableZipCodes = this.cancelEditAvailableZipCodes;
        const saveAvailableZipCodes = this.saveAvailableZipCodes;

        const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        return days.map(function (dayName, dayOfWeek) {
            var codes = '';
            var zipCodes = [];
            (availableZipCodes || []).forEach(function (row) {
                if (row.dayOfWeek == dayOfWeek && Array.isArray(row.zipCodes)) {
                    zipCodes = row.zipCodes;
                    codes = row.zipCodes
                        .map(function (code) {
                            return String(code)
                        })
                        .join(',');
                }
            });
            if (editZipCodes === +dayOfWeek) {
                //edit view
                return (<th key={dayOfWeek}>
                    <form id={dayOfWeek} onSubmit={saveAvailableZipCodes}>
                        {dayName}&nbsp;
                        <textarea name="zipcodes" className="form-control">{codes}</textarea>&nbsp;
                        <button id={dayOfWeek} name={dayName} onClick={cancelEditAvailableZipCodes}>Cancel</button>
                        &nbsp;
                        <input value={"Save"} type="submit"/>
                    </form>

                </th>)
            } else {
                return (
                    <th key={dayOfWeek}>
                        {dayName}&nbsp;
                        <div>
                            {zipCodes && zipCodes.length
                                ? <select value="title" style={{'width': '100%'}}>
                                    <option value="title">codes:</option>
                                    {zipCodes.map(function (code, key) {
                                            return (<option key={key}>{code}</option>);
                                        }
                                    )}
                                </select>
                                : null
                            }
                        </div>
                        &nbsp;
                        <button id={dayOfWeek} name={dayName} onClick={showEditAvailableZipCodes}>Edit</button>

                    </th>
                );
            }
        })
    }

    render() {

        return (
            <div>
                <div className="flex-center">
                    <h2>&nbsp;{MONTH_NAMES[this.state.date.getMonth()] + ", " + this.state.date.getFullYear()}&nbsp;
                        {
                            (this.state.readyCalendar && this.state.ready) ?
                                null : <img ref="iconLoading"
                                            src="http://global.fncstatic.com/static/v/all/img/loader-trans-2.gif"/>

                        }
                    </h2>
                </div>

                <table className="table table-bordered">
                    <thead>
                    <tr style={{backgroundColor: "#b5b5b5"}}>
                        {this.getHead()}
                    </tr>
                    </thead>

                    <tbody>
                    {this.getBody(new Date(this.state.date.getTime()))}
                    </tbody>

                    <tfoot>
                    <tr style={{backgroundColor: "#b5b5b5"}}>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                        <th>Su</th>
                    </tr>
                    </tfoot>
                </table>
                <div className="row">
                    <button className="pull-left btn btn-default"><a href="#" onClick={this.handlePrev}>Previous</a>
                    </button>
                    <button className="pull-right btn btn-default"><a href="#" onClick={this.handleNext}>Next</a>
                    </button>
                </div>
                <br/>
                <div className="row">
                    {this.getBookingListPanel(this.props.app, this.state.bookingList, this.state.selectedDate)}
                </div>
            </div>
        );
    }
}

export default Calendar;