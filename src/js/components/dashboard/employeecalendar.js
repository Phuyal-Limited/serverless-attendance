import React, {Component} from 'react';
import moment from 'moment';
import '../../../css/main.css';
import NavBar from '../navbar/loggedinnavbar'

import '../../../css/style.css';

import  '../../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css'
import '../../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../../HomeTemplate/css/grayscale.min.css';
import '../../../css/custombootstrap.css'
import '../../../css/newforcalendar.css'

import axios from "axios/index";
import {EMPLOYEE_API_URL} from "../../../config";

class CalendarEmployee extends Component{
    constructor(props){
        super(props);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var m = mm.toString();
        var d = dd.toString();
        if (mm < 10) {
            m = "0" + mm.toString();
        }
        if (dd < 10) {
            d = "0" + dd.toString();
        }
        var yyyy = today.getFullYear();
        var dateForEvent = yyyy.toString() + '-' + m.toString() + '-' + d.toString();
        this.state={
            selectedMonth: moment(),
            selectedDay:moment().startOf("day"),
            selectedMonthEvents: [],

            info:'',

            addEvent:false,
            showEvents:false,

            eventdescription:'',
            eventtype:'holiday',
            addEventDate:dateForEvent,

            eventUpdateType:'',
            confirmation: false,

            beforeEditEventType:'',
            beforeEditDescription: '',
            beforeEditDate: ''
        };
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        //this.handleAddEvent=this.handleAddEvent.bind(this)
        //this.handleEditEvent=this.handleEditEvent.bind(this)
        //this.handleCancel=this.handleCancel.bind(this)
        //this.handleEdit=this.handleEdit.bind(this)
        //this.handleDelete=this.handleDelete.bind(this)
        //this.handleToggle=this.handleToggle.bind(this)
    }
    getEventsFromApi(){
        axios.get(EMPLOYEE_API_URL, {
            headers:{
                token:localStorage.getItem("idToken")
            },
            params: {
                param1: "GetEvents",
                param2: localStorage.getItem("employeename")
            }
        })
            .then(response => {
                if (response.data === "Nothing From AWS Lambda Here") {

                    this.setState({
                        displayText: "Wrong credentials"
                    });
                }
                else if (response.data === "Couldnot load data") {
                    this.setState({
                        displayText: "Error in fetching data"
                    });
                }
                else {
                    console.log(response.data)
                    var rfinal = "{" + response.data + "}";
                    var m = rfinal.replace(/'/g, '"');
                    let final = JSON.parse(m);
                    this.setState({
                        selectedMonthEvents: final
                    });
                }
            })
            .catch(error => {
                localStorage.clear();
                alert('Session Expired! log in again...');
                this.props.history.push('/login/employee');
            });
    }
    componentDidMount(){

        this.getEventsFromApi()

    }
    getThisMonth(m) {
        if (m === 1) {
            return ("January");
        }
        else if (m === 2) {
            return ("February");
        }
        else if (m === 3) {
            return ("March");
        }
        else if (m === 4) {
            return ("April");
        }
        else if (m === 5) {
            return ("May");
        }
        else if (m === 6) {
            return ("June");
        }
        else if (m === 7) {
            return ("July");
        }
        else if (m === 8) {
            return ("August");
        }
        else if (m === 9) {
            return ("September");
        }
        else if (m === 10) {
            return ("October");
        }
        else if (m === 11) {
            return ("November");
        }
        else if (m === 12) {
            return ("December");
        }
    }
    getThisMonthInNumber(m){
        if (m === "January") {
            return (1);
        }
        else if (m === "February") {
            return (2);
        }
        else if (m === "March") {
            return (3);
        }
        else if (m === "April") {
            return (4);
        }
        else if (m === "May") {
            return (5);
        }
        else if (m === "June") {
            return (6);
        }
        else if (m === "July") {
            return (7);
        }
        else if (m === "August") {
            return (8);
        }
        else if (m === "September") {
            return (9);
        }
        else if (m === "October") {
            return (10);
        }
        else if (m === "November") {
            return (11);
        }
        else if (m === "December") {
            return (12);
        }
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    /*handleAddEvent(event){
        event.preventDefault();
        if(this.state.eventdescription===''){
            this.setState({
                info:"Please Specify a event description"
            })
        }
        else{

            var fields = this.state.addEventDate.split('-');
            var year = fields[0];
            let month = parseInt(fields[1], 10);
            var day = parseInt(fields[2], 10);

            var monthStr = this.getThisMonth(month);
            var date=day+" "+ monthStr + " " +year;

            this.setState({
                info: "Please Wait.."
            });

            axios.get(API_URL, {
                params: {
                    addNewIntern: "AddEvent",
                    y: date,
                    u: localStorage.getItem("adminname"),
                    p: this.state.eventtype.toLowerCase(),
                    t: this.state.eventdescription
                }
            })
                .then(response => {
                    if (response.data === "Successfully Added Event") {
                        this.getEventsFromApi()
                        this.setState({
                            info: "Added Successfully",
                            eventdescription:''

                        });
                        setTimeout(() => {
                            this.setState({
                                info:'',
                                addEvent:false
                            })
                        }, 2000);

                    }
                    else{
                        this.setState({
                            info:"Couldnot add"
                        })
                    }

                })
                .catch(error => {
                    alert("error")
                    this.setState({
                        displayText: "Request failed"
                    });
                });

        }
    }*/
    /*handleEditEvent(event){
        event.preventDefault();
        if(this.state.eventdescription===''){
            this.setState({
                info:"Please Specify a event description"
            })
        }
        else{

            var fields = this.state.addEventDate.split('-');
            var year = fields[0];
            let month = parseInt(fields[1], 10);
            var day = parseInt(fields[2], 10);
            var daystring=day.toString()

            var monthStr = this.getThisMonth(month);
            var date=daystring+" "+ monthStr + " " +year;

            this.setState({
                info: "Please Wait.."
            });

            axios.get(API_URL, {
                params: {
                    addNewIntern: "EditEvent",
                    y: date.toString()+","+this.state.beforeEditDate,
                    u: localStorage.getItem("adminname"),
                    p: this.state.eventtype.toLowerCase()+","+this.state.beforeEditEventType.toLowerCase(),
                    t: this.state.eventdescription+"stntmaniiac_seperating_two_descriptions"+this.state.beforeEditDescription
                }
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data === "Successfully Edited Event") {
                        this.getEventsFromApi()
                        this.setState({
                            info: "Edited Successfully",
                            eventdescription:'',
                            beforeEditDescription:'',
                            beforeEditEventType:'',
                            beforeEditDate:''

                        });
                        setTimeout(() => {
                            this.setState({
                                info:'',
                                addEvent:false
                            })
                        }, 2000);

                    }
                    else{
                        this.setState({
                            info:"Couldnot Edit"
                        })
                    }

                })
                .catch(error => {
                    this.setState({
                        info: "Request failed"
                    });
                });

        }
    }*/
    /*handleEdit(date, eventtype, description, event){
        event.preventDefault()
        let newDate=date.split(" ");
        let monthinnumber=this.getThisMonthInNumber(newDate[1]);
        let strmonth=monthinnumber.toString()
        let strday=newDate[0].toString()
        if (monthinnumber<10){
            strmonth="0"+monthinnumber.toString()
        }
        if(parseInt(newDate[0], 10)<10){
            strday="0"+newDate[0].toString()
        }
        let d=newDate[2]+"-"+strmonth+"-"+strday

        this.setState({
            addEvent: true,
            eventUpdateType:'Edit',
            eventdescription:description,
            eventtype:eventtype,
            addEventDate:d,
            beforeEditEventType:eventtype,
            beforeEditDescription: description,
            beforeEditDate: date
        })

    }*/
    /*handleDelete(date, eventtype, description, event){
        event.preventDefault();
        this.setState({
            confirmation:false
        })
        axios.get(API_URL, {
            params: {
                addNewIntern: "DeleteEvent",
                y: date,
                u: localStorage.getItem("adminname"),
                p: eventtype,
                t: description
            }
        })
            .then(response => {
                if (response.data === "Successfully Deleted Event") {
                    this.getEventsFromApi()
                    setTimeout(() => {
                        this.setState({
                            info:'',
                            addEvent:false
                        })
                    }, 2000);

                }
                else{
                    this.setState({
                        info:"Couldnot add"
                    })
                }

            })
            .catch(error => {
                alert("error")
                this.setState({
                    displayText: "Request failed"
                });
            });


    }*/
    /*handleCancel(){
        this.setState({
            addEvent:false,
            eventdescription:'',
            eventtype:'Holiday'
        })
    }
    handleToggle(){
        if(this.state.confirmation){
            this.setState({
                confirmation:false
            })
        }
        else{
            this.setState({
                confirmation:true
            })
        }

    }*/
    previous() {
        const currentMonthView = this.state.selectedMonth;

        this.setState({
            selectedMonth: currentMonthView.subtract(1, "month")

        });
    }
    next() {
        const currentMonthView = this.state.selectedMonth;
        this.setState({
            selectedMonth: currentMonthView.add(1, "month")

        });
    }
    select(day) {
        let months=day.date.month()+1
        let days=day.date.date()
        let y=day.date.year().toString()
        let m=months.toString()
        let d=days.toString()
        if (months < 10) {
            m = "0" + months.toString();
        }
        if (days < 10) {
            d = "0" + days.toString();
        }
        let addEventdate=y+"-"+m+'-'+d
        this.setState({
            selectedMonth: day.date,
            selectedDay: day.date.clone(),
            addEvent: true,
            addEventDate:addEventdate,
            eventUpdateType: 'Add'
        });
    }
    renderMonthLabel() {
        const currentMonthView = this.state.selectedMonth;
        return (
            <span className="box month-label">
        {currentMonthView.format("MMMM YYYY")}
      </span>
        );
    }
    renderWeeks() {
        const currentMonthView = this.state.selectedMonth;
        const currentSelectedDay = this.state.selectedDay;
        let holidayEvents=[];
        let otherEvents=[];
        if(this.state.selectedMonthEvents.length===0){

        }
        else{
            for(var i=0;i<this.state.selectedMonthEvents['date'].length;i++){
                var month=this.state.selectedMonthEvents['date'][i].split(" ");
                var type=this.state.selectedMonthEvents['eventtype'][i];
                if(type==="holiday"){
                    holidayEvents.push(month[0]+" "+month[1]+" "+month[2])
                }
                else{
                    otherEvents.push(month[0]+" "+month[1]+" "+month[2])
                }

            }

        }


        let weeks = [];
        let done = false;
        let previousCurrentNextView = currentMonthView
            .clone()
            .startOf("month")
            .subtract(1, "d")
            .day("Sunday");
        let count = 0;
        let monthIndex = previousCurrentNextView.month();

        while (!done) {
            weeks.push(
                <Week
                    key={count}
                    previousCurrentNextView={previousCurrentNextView.clone()}
                    currentMonthView={currentMonthView}
                    holidayEvents={holidayEvents}
                    otherEvents={otherEvents}
                    selected={currentSelectedDay}
                    select={day => this.select(day)}
                />
            );
            previousCurrentNextView.add(1, "w");
            done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
            monthIndex = previousCurrentNextView.month();
        }
        return weeks;
    }
    renderCalendar(){
        return(
            <div className="main-div">
                <div className="second-div">
                    <div className="row title-header">
                        <i className="box arrow fa fa-angle-left" onClick={this.previous}/>
                        <div className="box header-text">
                            {this.renderMonthLabel()}
                        </div>
                        <i className="box arrow fa fa-angle-right" onClick={this.next}/>
                    </div>
                    <DayNames/>
                    <div className="third-div">
                        <div className="days-container">
                            {this.renderWeeks()}
                        </div>
                    </div>
                </div>
            </div>

        );

    }
    /*renderAddEvent(){
        return(
            <div>
                <h3>{this.state.eventUpdateType} Event</h3>
                <form onSubmit={this.state.eventUpdateType==="Add" ? this.handleAddEvent : this.handleEditEvent} className="form-custom">
                    <input
                        type="date"
                        name="addEventDate"
                        id="addEventDate"
                        value={this.state.addEventDate}
                        onChange={(event) => this.handleChange(event)}
                        placeholder="Event Date"
                    /><br/>
                    <select
                        id="eventtype"
                        name="eventtype"
                        value={this.state.eventtype}
                        onChange={(event) => this.handleChange(event)}
                    >
                        <option value="holiday">holiday</option>
                        <option value="celebration">celebration</option>
                        <option value="other">other</option>
                    </select><br/>
                    <input
                        name="eventdescription"
                        type="text"
                        placeholder="Event Description"
                        value={this.state.eventdescription}
                        onChange={(event) => this.handleChange(event)}/><br/>

                    <li className="list-inline-item" style={{margin: 10, padding: 10, paddingLeft: 20, borderRadius: 10, width: 350}}>
                        <button
                            type="submit"

                            className="btn btn-default btn-lg"
                        >
                            <i className="fa fa-level-up fa-fw" />
                            <span className="network-name">{this.state.eventUpdateType} Event</span>
                        </button>
                    </li><br/>
                    <li className="list-inline-item" style={{margin: 10, padding: 10, paddingLeft: 20, borderRadius: 10, width: 350}}>
                        <button onClick={this.handleCancel}
                                className="btn btn-default btn-lg"
                        >
                            <i className="fa fa-crosshairs" />
                            <span className="network-name"> Cancel </span>
                        </button>
                    </li><br/>


                </form>
                <h1 className="message">{this.state.info}</h1>
            </div>
        );
    }*/
    renderThisMonthsEvents(){
        let events=[]

        //alert(this.getThisMonth(this.state.selectedMonth.month()+1));
        if(this.state.selectedMonthEvents.length===0){
            //returns loading icon
            return(
                <div className="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            );
        }
        else if(this.state.selectedMonthEvents['date'].length===0){
            return(
                <div>
                    <p style={{fontSize: "25px"}}>No events in this month</p>
                </div>
            )
        }
        else{

            for(var i=0;i<this.state.selectedMonthEvents['date'].length;i++){
                let datelist=this.state.selectedMonthEvents['date'][i].split(' ')
                let year=datelist[2]
                let month=datelist[1]
                let days=parseInt(datelist[0], 10)
                let d=days.toString()
                if(days<10){
                    d="0"+days.toString()
                }
                let da=d.toString()+" "+datelist[1]+" "+datelist[2]
                let selectedyear=this.state.selectedMonth.year()
                let selectedmonth=this.getThisMonth(this.state.selectedMonth.month()+1)


                if(parseInt(year, 10)===selectedyear && month===selectedmonth) {
                    let eventtype = this.state.selectedMonthEvents['eventtype'][i]
                    let des=this.state.selectedMonthEvents['description'][i]
                    //let editClick = this.handleEdit.bind(this, this.state.selectedMonthEvents['date'][i], eventtype, des);
                    //let deleteClick = this.handleDelete.bind(this, this.state.selectedMonthEvents['date'][i], eventtype, des);
                    if (eventtype === "holiday") {
                        events.push(
                            <tr key={i} style={{fontSize:"20px"}}>
                                <td>{da}</td>
                                <td  style={{color: "#f00"}}>{eventtype}</td>
                                <td>{des}</td>
                            </tr>
                        )
                    }
                    else {
                        events.push(
                            <tr key={i} style={{fontSize:"20px"}}>
                                <td>
                                    {da}
                                </td>
                                <td>{eventtype}</td>
                                <td>{des}</td>
                            </tr>

                        )
                    }
                }
            }
            return(events)



        }

    }
    render(){
        return(
            <div>
                <NavBar data={"employee"}/>
                <section id="about" className="masthead text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                            {this.renderCalendar()}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Selected Month's Events</h3>
                                    </div>
                                    <div className="panel-body fixed-height panel-white">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <table className="table">
                                                    <thead>
                                                    <tr style={{ fontSize:"20px"}}>
                                                        <th>Date</th>
                                                        <th>EventType</th>
                                                        <th>About</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.renderThisMonthsEvents()}
                                                    </tbody>

                                                </table>

                                            </div>
                                        </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                 </section>
            </div>
    );

    }
}

class DayNames extends React.Component {
    render() {
        return (
            <div className="row days-header">
                <span className="box day-name">Sun</span>
                <span className="box day-name">Mon</span>
                <span className="box day-name">Tue</span>
                <span className="box day-name">Wed</span>
                <span className="box day-name">Thu</span>
                <span className="box day-name">Fri</span>
                <span className="box day-name">Sat</span>

            </div>
        );
    }
}
class Week extends React.Component {
    render() {
        let days = [];
        let date = this.props.previousCurrentNextView;
        let currentMonthView = this.props.currentMonthView;
        let selected = this.props.selected;
        let select = this.props.select;
        let holidayEvents = this.props.holidayEvents;
        let otherEvents=this.props.otherEvents;

        for (var i = 0; i < 7; i++) {

            let day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === currentMonthView.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            };

            if(i===6){
                days.push(<Day key={i} day={day} selected={selected} select={select} isSat="true" holidayEvents={holidayEvents} otherEvents={otherEvents}/>);
            }
            else{
                days.push(<Day key={i} day={day} selected={selected} select={select} isSat="false" holidayEvents={holidayEvents} otherEvents={otherEvents}/>);
            }
            date = date.clone();
            date.add(1, "d");
        }
        return (
            <div className="row week">
                {days}
            </div>
        );
    }
}
class Day extends React.Component {
    getThisMonth(m) {
        if (m === 1) {
            return ("January");
        }
        else if (m === 2) {
            return ("February");
        }
        else if (m === 3) {
            return ("March");
        }
        else if (m === 4) {
            return ("April");
        }
        else if (m === 5) {
            return ("May");
        }
        else if (m === 6) {
            return ("June");
        }
        else if (m === 7) {
            return ("July");
        }
        else if (m === 8) {
            return ("August");
        }
        else if (m === 9) {
            return ("September");
        }
        else if (m === 10) {
            return ("October");
        }
        else if (m === 11) {
            return ("November");
        }
        else if (m === 12) {
            return ("December");
        }
    }
    render() {

        let day = this.props.day;
        let selected = this.props.selected;
        //let select = this.props.select;
        let isSat=this.props.isSat;
        let holidayEvents=this.props.holidayEvents;
        let otherEvents=this.props.otherEvents;

        var dayHasHolidayEvents = false;
        var dayHasOtherEvents=false;
        for (var i = 0; i < holidayEvents.length; i++) {
            if (holidayEvents[i]===day.date.date().toString()+" "+this.getThisMonth(day.date.month()+1)+ " "+day.date.year().toString()) {
                dayHasHolidayEvents = true;
            }
        }
        for (var j = 0; j < otherEvents.length; j++) {
            if (otherEvents[j]===day.date.date().toString()+" "+this.getThisMonth(day.date.month()+1)+ " "+day.date.year().toString()) {
                dayHasOtherEvents = true;
            }
        }
        if (isSat==="true"|| dayHasHolidayEvents){
            return (
                <div
                    className={
                        "day" +
                        (day.isToday ? " today" : "") +
                        (day.isCurrentMonth ? "" : " different-month") +
                        (day.date.isSame(selected) ? " selected" : "") +
                        (day.hasEvents ? " has-events" : "")
                    }
                    style={{color:"#f00"}}
                >
                    <div className="day-number">{day.number}</div>
                </div>
            );

        }
        else if(dayHasOtherEvents){
            return (
                <div
                    className={
                        "day" +
                        (day.isToday ? " today" : "") +
                        (day.isCurrentMonth ? "" : " different-month") +
                        (day.date.isSame(selected) ? " selected" : "") +
                        (day.hasEvents ? " has-events" : "")
                    }
                    style={{color:"#209f1e"}}
                >
                    <div className="day-number">{day.number}</div>
                </div>
            );
        }
        else{
            return (
                <div
                    className={
                        "day" +
                        (day.isToday ? " today" : "") +
                        (day.isCurrentMonth ? "" : " different-month") +
                        (day.date.isSame(selected) ? " selected" : "") +
                        (day.hasEvents ? " has-events" : "")
                    }
                >
                    <div className="day-number">{day.number}</div>
                </div>
            );

        }

    }
}

export default CalendarEmployee;