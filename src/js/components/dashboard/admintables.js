import React from "react";
import axios from "axios/index";

import '../../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css';
import '../../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../../HomeTemplate/css/grayscale.min.css';
import '../../../css/custom.css';
import '../../../css/loader.css'
import {withRouter} from "react-router-dom";
import {COMPANY_API_URL} from "../../../config";



class Tables extends React.Component {
    //Initial Function.
    constructor(props) {
        super(props);

        //Get Current Date For Initial Render
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

        this.state = {

            //state for the Search By Date Field.
            search: dateForSearch,

            //state for the Search By Month Field.
            searchmonth: monthForSearch,

            //state for daily attendance data from API
            info: [],

            //state for monthly attendance data from API
            monthlyinfo: [],

            //changed when error occurs in API calls. Not in use.
            displayText: '',

            //state for display text beside the search fields.
            dateDisplayField: '',

            absentDateDisplayField:'',

            monthDisplayField: '',

            //state to change from daily view to monthly view.
            daily: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.monthlyRequestToApi = this.monthlyRequestToApi.bind(this);
    }

    //Function that handles changes in Search By Date input field
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

    //Function that handles changes in Search By Month input field
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

    //Function to call internattendance lambda function for daily attendance records.
    requestToApi(date) {
        this.setState({
            daily: true,
            dateDisplayField: "...",
            absentDateDisplayField:'...'
        });
        axios.get(COMPANY_API_URL, {
            headers:{
                token: localStorage.getItem("companyIdToken")
            },
            params: {
                param1: "AdminLogin",
                param2: date,
                param3: localStorage.getItem("adminname")
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
                    //var ma=m.replace(/\\/g, '"');
                    let final = JSON.parse(m);
                    localStorage.setItem('state', m);
                    this.setState({
                        info: final,
                        dateDisplayField: "Daily Record for " + date,
                        absentDateDisplayField: "Absentees for "+date
                    });
                }
            })
            .catch(error => {
                if(error['message']==="Network Error") {
                    localStorage.clear()
                    alert("Your session has expired! Log in again...")
                    this.props.history.push('/login/company')
                }
            });
    }

    //Function to call internattendance lambda function for monthly attendance records.
    monthlyRequestToApi(date) {
        var fields = date.split('-');
        var year = fields[0];
        let month = parseInt(fields[1], 10);
        var monthStr = this.getThisMonth(month);
        var d = monthStr + " " + year;
        this.setState({
            monthDisplayField: "..."
        });
        axios.get(COMPANY_API_URL, {
            headers:{
                token:localStorage.getItem('companyIdToken')
            },
            params: {
                param1: "Monthly",
                param2: d,
                param3: localStorage.getItem("adminname")
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
                    //var ma=m.replace(/\\/g, '"');
                    let final = JSON.parse(m);
                    localStorage.setItem('monthly', m);
                    this.setState({
                        monthlyinfo: final,
                        monthDisplayField: "Monthly Record for " + d
                    });
                }
            })
            .catch(error => {
                if(error['message']==="Network Error") {
                    localStorage.clear()
                    alert("Your session has expired! Log in again...")
                    this.props.history.push('/login/company')
                }
            });
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

    //Function that handles the click on particular item in the table.
    handleClick(n,p,en,ex,ta,event){
        //this.props.stateToDetails(n,p,en,ex,ta);
    }

    //Helper function to make API call for daily Attendance records.
    handleSubmit(a){
        var fields = a.split('-');
        var year = fields[0];
        let month = parseInt(fields[1], 10);
        var day = fields[2];
        var monthStr = this.getThisMonth(month);
        var date=day+" "+ monthStr + " " +year;
        this.requestToApi(date)
    }
    render() {
        let searchBoundClick = this.handleChange.bind();
        let monthlyClick = this.handleMonthChange.bind();
        //let boundClick = this.handleClick.bind(this, names, presents, entry, exit, "Daily");

        var daily=[];
        var monthly=[];
        var absentToday=[];
        if(this.state.info.length===0){
            if(this.state.dateDisplayField==="Select a date"){

            }
            else {
                daily.push(
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
            //make a list 'daily' of table rows with the daily data.
            for (var b = 0; b < this.state.info['names'].length; b++) {
                var names = this.state.info['names'][b];
                var presents = this.state.info['present'][b];
                var entry = this.state.info['entry_time'][b];
                var exit = this.state.info['exit_time'][b];
                let boundClick = this.handleClick.bind(this, names, presents, entry, exit, "Daily");
                //checks if employee is present, if yes, displays Present field with normal font colour.
                if(this.state.info['present'][b]==="Present"){
                    daily.push(
                        <tr key={b} onClick={boundClick}>
                            <td>{b + 1}</td>
                            <td><a>{this.state.info['names'][b]}</a></td>
                            <td style={{color: '#00FF00'}}>{this.state.info['present'][b]}</td>
                            <td>{this.state.info['entry_time'][b]}</td>
                            <td>{this.state.info['exit_time'][b]}</td>
                            <td>{this.state.info['entrystatus'][b]}</td>
                            <td>{this.state.info['workduration'][b]}</td>
                        </tr>
                    );
                }

                //else displays Present field with red font colour
                else {
                    daily.push(
                        <tr key={b} onClick={boundClick}>
                            <td>{b + 1}</td>
                            <td><a className="link">{this.state.info['names'][b]}</a></td>
                            <td style={{color: '#FF0000'}}>{this.state.info['present'][b]}</td>
                            <td>{this.state.info['entry_time'][b]}</td>
                            <td>{this.state.info['exit_time'][b]}</td>
                            <td>{this.state.info['entrystatus'][b]}</td>
                            <td>{this.state.info['workduration'][b]}</td>
                        </tr>
                    );
                    absentToday.push(
                        <tr key={b} onClick={boundClick}>
                            <td>{b + 1}</td>
                            <td><a className="link">{this.state.info['names'][b]}</a></td>
                            <td style={{color: '#FF0000'}}>{this.state.info['present'][b]}</td>
                        </tr>
                    );
                }
            }
        }
        if(this.state.monthlyinfo.length === 0){
            if(this.state.monthDisplayField==="Select a Month"){

            }
            else{
                monthly.push(
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
        else {
            var total_working_days=this.state.monthlyinfo['total'];


            //make a list 'monthly' of table rows with the monthly data.
            for (var j = 0; j < this.state.monthlyinfo['names'].length; j++) {
                var name = this.state.monthlyinfo['names'][j];
                var present = this.state.monthlyinfo['present'][j];
                var absent = this.state.monthlyinfo['absent'][j];
                let boundClick = this.handleClick.bind(this, name, present, absent, " ", "month");
                monthly.push(
                    <tr key={j} onClick={boundClick}>
                        <td>{j + 1}</td>
                        <td><a className="link">{this.state.monthlyinfo['names'][j]}</a></td>
                        <td>{total_working_days}</td>
                        <td>{this.state.monthlyinfo['payroll'][j]}</td>
                        <td>{this.state.monthlyinfo['present'][j]}</td>
                        <td>{this.state.monthlyinfo['absent'][j]}</td>
                    </tr>
                );
            }

        }

        return (
            <section id="about" className="masthead text-center">
                <div className="intro-body text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="clock">

                                </div>
                            </div>
                        </div>
                        <div className="mx-auto">
                            <div className="col-md-5 manoj">
                                <p>Search by Date</p>
                                <input
                                    className="form-control padded"
                                    type="date"
                                    name="search"
                                    id="search"
                                    value={this.state.search}
                                    onChange={searchBoundClick}
                                    placeholder="Search"
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="panel panel-primary">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Daily Records</h3>
                                        </div>
                                        <div className="panel-body fixed-height">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <table className="table">
                                                        <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>EmployeeName</th>
                                                            <th>Status</th>
                                                            <th>Entry</th>
                                                            <th>Exit</th>
                                                            <th>EntryStatus</th>
                                                            <th>Duration</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {daily}
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>{this.state.dateDisplayField}</p>

                                </div>
                                <div className="col-md-4">
                                    <div className="panel panel-monthly">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Absentees</h3>
                                        </div>
                                        <div className="panel-body fixed-height">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <table className="table">
                                                        <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>EmployeeName</th>
                                                            <th>Status</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {absentToday}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>{this.state.absentDateDisplayField}</p>
                                </div>
                            </div>
                            <div className="mx-auto">
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
                                                        <th>ID</th>
                                                        <th>EmployeeName</th>
                                                        <th>Total</th>
                                                        <th>Payroll Days</th>
                                                        <th>Present</th>
                                                        <th>Absent</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {monthly}
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
            </section>
        );
    }
}

export default withRouter(Tables);
