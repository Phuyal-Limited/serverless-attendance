import React from "react";
import axios from "axios/index";

import '../../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css';
import '../../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../../HomeTemplate/css/grayscale.min.css';
import '../../../css/custom.css';

import '../../../css/loader.css'
import {withRouter} from 'react-router-dom'

import {EMPLOYEE_API_URL} from "../../../config";
//let API_URL = 'https://c4q8oqddyj.execute-api.eu-west-2.amazonaws.com/prod/internattendance';



class EmployeeTable extends React.Component{
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
        var dateForSearch = yyyy.toString() + '-' + m.toString() + '-' + d.toString();
        var monthForSearch = yyyy.toString() + '-' + m.toString();
        this.state={
            search: dateForSearch,
            searchmonth: monthForSearch,
            info:[],
            monthlyinfo:[],
            dateDisplayField:'',
            monthDisplayField:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.monthlyRequestToApi = this.monthlyRequestToApi.bind(this);
    }

    //Function to change integer month value to string month value.
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
    getDaysInMonth(ma) {
        var a = 30;
        var li=ma.split(' ');
        var y = li[1] % 4;
        var m = this.getThisMonthInNumber(li[0]);
        if (m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 12) {
            a = 31;
        }
        else if (y === 0 && m === 2) {
            a = 29;
        }
        else if (y !== 0 && m === 2) {
            a = 28;
        }
        else {
            a = 30;
        }
        return a;
    }
    handleChange(event) {
        this.setState({
            //sets the value in the input field after change to this.state.search
            [event.target.name]: event.target.value,

            //clears the info state to show the loading icon
            info: []
        });
        //To make call to API with new date.
        //alert(event.target.value)

        if(event.target.value===""){
            this.setState({
                dateDisplayField:"Select a date"
            })
        }
        else{
            var date = event.target.value.split('-');
            var day = parseInt(date[2], 10);
            var final = date[0] + '-' + date[1] + '-' + day.toString();
            this.handleSubmit(final);
        }
    }
    handleMonthChange(event) {
        this.setState({
            //sets the value in the input field after change to this.state.selectedmonth
            [event.target.name]: event.target.value,

            //clears the monthlyinfo state to show the loading icon
            monthlyinfo: []
        });

        if(event.target.value===""){
            this.setState({
                monthDisplayField:"Select a Month"
            })
        }
        else{
            //To make call to API with new month.
            this.monthlyRequestToApi(event.target.value);
        }

    }
    requestToApi(date) {
        this.setState({
            dateDisplayField: "..."
        });
        axios.get(EMPLOYEE_API_URL, {
            headers:{
                token:localStorage.getItem('idToken')
            },
            params: {
                param1: "employeeOverall",
                param2: date,
                param3: localStorage.getItem("employeename")
            }
        })
            .then(response => {
                //console.log(response)
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
                    var rfinal = "{" + response.data + "}";
                    var m = rfinal.replace(/'/g, '"');
                    let final = JSON.parse(m);
                    this.setState({
                        info: final,
                        dateDisplayField: "OverAll Record of "+localStorage.getItem("employeename")+" for "+date
                    });
                    //this.props.changeCounter(parseInt(final['count']), final['leaveid'], final['startdate'], final['leavestatus'], final['enddate'], final['leavetype'], final['leavedescription'], final['employeeusername']);
                }
            })
            .catch(error => {
                localStorage.clear();
                alert('Session Expired! log in again...');
                this.props.history.push('/login/employee');
            });
    }
    monthlyRequestToApi(date){
        let fields = date.split('-');
        let year = fields[0];
        let month = parseInt(fields[1], 10);
        let monthStr = this.getThisMonth(month);
        let d = monthStr + " " + year;
        this.setState({
            monthDisplayField: "..."
        });
        var employeename=localStorage.getItem("employeename");

        if(employeename===""){
            alert("Login First")
        }
        else{
            axios.get(EMPLOYEE_API_URL, {
                headers:{
                    token:localStorage.getItem('idToken')
                },
                params: {
                    param1: "employeeMonthly",
                    param2: d,
                    param3: employeename
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
                        var rfinal = "{" + response.data + "}";
                        var m = rfinal.replace(/'/g, '"');
                        let final = JSON.parse(m);
                        this.setState({
                            monthlyinfo: final,
                            monthDisplayField: "Monthly Record of "+employeename+" for "+d
                        });
                    }
                })
                .catch(error => {
                    localStorage.clear();
                    alert('Session Expired! log in again...');
                    this.props.history.push('/login/employee');
                });

        }

    }

    //Function that renders initially when the Table component is created.
    componentDidMount(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        var mon=this.getThisMonth(mm);
        var date=dd.toString()+" "+ mon.toString() + " " +yyyy.toString();
        var toMonth=yyyy.toString()+"-"+mm.toString();
        this.requestToApi(date);
        this.monthlyRequestToApi(toMonth);


    }

    handleSubmit(a){
        var fields = a.split('-');
        var year = fields[0];
        var month = parseInt(fields[1], 10);
        var day = fields[2];
        var monthStr = this.getThisMonth(month);
        var date=day+" "+ monthStr + " " +year;
        this.requestToApi(date)
    }

    render(){
        let changeInSearchField = this.handleChange.bind();
        let monthlyClick = this.handleMonthChange.bind();

        var overallForDate=[];
        var monthlyRecordForEmployee=[];

        if(this.state.info.length===0){
            if(this.state.dateDisplayField==="Select a date"){

            }
            else {
                overallForDate.push(
                    <tr key={0} className="centree">
                        <td>
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
                        </td>
                    </tr>
                )
            }
        }
        else{
            overallForDate.push(
                <div>
                    <h5>Daily For {this.state.info['Date'][0]}</h5>
                    <p>Status: {this.state.info['Status'][0]}</p>
                    <p>Entry Time: {this.state.info['Entry'][0]}</p>
                    <p>Exit Time: {this.state.info['Exit'][0]}</p>
                    <h5>Monthly For {this.state.info['Month'][0]}</h5>
                    <p>Working Days: {this.state.info['Working'][0]}</p>
                    <p>Present Days: {this.state.info['Present'][0]}</p>
                    <p>Absent Days: {this.state.info['Absent'][0]}</p>
                </div>
            );
        }
        if(this.state.monthlyinfo.length===0){
            if(this.state.monthDisplayField==="Select a Month"){

            }
            else{
                monthlyRecordForEmployee.push(
                    <tr key={0} className="centree">
                        <td>
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
                        </td>
                    </tr>
                );
            }
        }
        else{

            for(var i=0; i<this.state.monthlyinfo['date'].length; i++){
                var thisdate=this.state.monthlyinfo['date'][i];
                var dayin=thisdate.split(" ");
                var dayinNumber=dayin[0]
                monthlyRecordForEmployee.push(
                    <tr key={dayinNumber}>
                            <td>{dayinNumber}</td>
                            <td>{this.state.monthlyinfo['date'][i]}</td>
                            <td style={{color:"#00FF00"}}>{this.state.monthlyinfo['status'][i]}</td>
                            <td>{this.state.monthlyinfo['entry'][i]}</td>
                            <td>{this.state.monthlyinfo['exit'][i]}</td>
                    </tr>

                )

            }

        }

        return (
            <section id="about" className="masthead text-center">
                <div className="intro-body text-center">
                    <div className="container">
                        <div className="mx-auto">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="col-md-5 manoj">
                                        <p>Search by Date</p>
                                        <input
                                            className="form-control padded"
                                            type="date"
                                            name="search"
                                            id="search"
                                            value={this.state.search}
                                            onChange={changeInSearchField}
                                            placeholder="Search"
                                        />
                                    </div>
                                    <div className="panel panel-primary">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Overall Records</h3>
                                        </div>
                                        <div className="panel-body fixed-height">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {overallForDate}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>{this.state.dateDisplayField}</p>

                                </div>
                                <div className="col-md-6">
                                    <div className="col-md-5 manoj">
                                        <p>Search by Month</p>
                                        <input
                                            className="form-control"
                                            type="month"
                                            name="searchmonth"
                                            id="searchmonth"
                                            value={this.state.searchmonth}
                                            onChange={monthlyClick}
                                            placeholder="SearchMonth"
                                        />
                                    </div>
                                    <div className="panel panel-monthly">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Monthly Records</h3>
                                        </div>
                                        <div className="panel-body fixed-height">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <table className="table">
                                                        <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Date</th>
                                                            <th>Status</th>
                                                            <th>Entry Time</th>
                                                            <th>Exit Time</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {monthlyRecordForEmployee}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>{this.state.monthDisplayField}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

/*
function mapStateToProps(state){
    return {
        employee:state.employee
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({

    })
}

export default connect(mapStateToProps, matchDispatchToProps)(EmployeeTable);*/
export default withRouter(EmployeeTable);