import React, {Component} from "react";

import axios from "axios/index";
import NavBar from '../navbar/loggedinnavbar'
import {EMPLOYEE_API_URL} from "../../../config";
import {withRouter} from 'react-router-dom';
import '../../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css';
import '../../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../../HomeTemplate/css/grayscale.min.css';

import '../../../css/custom.css';

class Notification extends Component{
    constructor(props){
        super(props);
        this.state={
            notifications: localStorage.getItem('notification'),
            requeststatus:localStorage.getItem('requeststatus'),
            details:false,
            employeeusername:'',
            leaveid:'',
            leavedescription:'',
            startdate:'',
            enddate:'',
            managerusername:'',
            leavetype:'',
            active:null,
            comments:'',
            info:'',
            daysno:''
        };
        this.handleClick=this.handleClick.bind(this);
        this.handleApprove=this.handleApprove.bind(this);
        this.handleDecline=this.handleDecline.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    handleClick(i, e){
        let data=JSON.parse(this.state.notifications)
        this.setState({
            details:true,
            employeeusername:data[i]['employeeusername'],
            leaveid:data[i]['leaveid'],
            leavedescription:data[i]['leavedescription'],
            startdate:data[i]['date'],
            enddate:data[i]['enddate'],
            managerusername:data[i]['managerusername'],
            leavetype:data[i]['leavetype'],
            daysno:data[i]['daysnumber'],
            active: i
        })

    }
    handleApprove() {
        if (!this.state.comments) {
            this.setState({
                info: "Fill in the comments"
            })
        }
        else {
            this.setState({
                info: "Please wait..."
            })
            axios.get(EMPLOYEE_API_URL, {
                headers: {
                    token: localStorage.getItem("idToken")
                },
                params: {
                    param1: "ApproveRequest",
                    param2: localStorage.getItem("employeename"),
                    param3: this.state.leaveid,
                    param4: this.state.comments
                }
            })
                .then(response => {
                    this.setState({
                        info: "Request Approved"
                    })

                    setTimeout(() => {
                        let prenotifications = localStorage.getItem('notification');
                        if (prenotifications !== "[]") {
                            let data = JSON.parse(prenotifications);
                            data.splice(this.state.active, 1)
                            let str = JSON.stringify(data)
                            localStorage.setItem("notification", str)
                            this.setState({
                                notifications: str,
                                info:'',
                                comments:''
                            });
                            window.location.reload()
                        }
                        else {
                            this.setState({
                                notifications: '[]',
                                info:''
                            })
                        }
                    }, 3000);


                })
                .catch(error => {
                    localStorage.clear()
                    alert("Your Session Expired! Log in again.")
                    this.props.history.push('/login/employee');

                });
        }

    }
    handleDecline() {
        if (!this.state.comments) {
            this.setState({
                info: "Fill in the comments"
            })
        }
        else {
            this.setState({
                info: "Please wait..."
            })
            axios.get(EMPLOYEE_API_URL, {
                headers: {
                    token: localStorage.getItem("idToken")
                },
                params: {
                    param1: "DeclineRequest",
                    param2: localStorage.getItem("employeename"),
                    param3: this.state.leaveid,
                    param4: this.state.comments
                }
            })
                .then(response => {
                    this.setState({
                        info: "Request Declined"
                    })

                    setTimeout(() => {
                        let prenotifications = localStorage.getItem('notification');
                        if (prenotifications !== "[]") {
                            let data = JSON.parse(prenotifications);
                            data.splice(this.state.active, 1)
                            let str = JSON.stringify(data)
                            localStorage.setItem("notification", str)
                            this.setState({
                                notifications: str,
                                info:'',
                                comments:''
                            })
                            window.location.reload()
                        }
                        else {
                            this.setState({
                                notifications: '[]',
                                info:''
                            })
                        }
                    }, 3000);


                })
                .catch(error => {
                    localStorage.clear()
                    alert("Your Session Expired! Log in again.")
                    this.props.history.push('/login/employee');

                });
        }

    }
    render(){
        let notifications=this.state.notifications;
        let tablerows=[]

        if (notifications !== "[]") {
            let data = JSON.parse(notifications);
            for (var i = 0; i < data.length; i++) {
                let indx=i;
                let notificationclick= this.handleClick.bind(this, indx);
                if(i===this.state.active){
                    tablerows.push(
                    <tr key={i} onClick={notificationclick} className="notificationtable selectedrow">
                        <td>{i+1}</td>
                        <td>{data[i]['employeeusername']}</td>
                        <td>{data[i]['date']}</td>
                        <td>{data[i]['daysnumber']}</td>
                        <td>{data[i]['leavetype']}</td>
                    </tr>
                )
                }
                else {
                    tablerows.push(
                        <tr key={i} onClick={notificationclick} className="notificationtable">
                            <td>{i + 1}</td>
                            <td>{data[i]['employeeusername']}</td>
                            <td>{data[i]['date']}</td>
                            <td>{data[i]['daysnumber']}</td>
                            <td>{data[i]['leavetype']}</td>
                        </tr>
                    )
                }
            }
        }
        else{
            tablerows.push(
                <tr key={0}><td style={{textAlign:"center"}}>No Notifications</td></tr>
            )

        }

        if(this.state.details) {
            return (
                <div>
                    <NavBar data={"employee"}/>
                    <section id="about" className="masthead text-center">
                        <div className="intro-body text-center">
                            <div className="container">
                                <div className="mx-auto">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="panel panel-monthly">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title">All Notifications</h3>
                                                </div>
                                                <div className="panel-body fixed-height">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <table className="table notificationtable">
                                                                <thead>
                                                                <tr>
                                                                    <th>Id</th>
                                                                    <th>Employee</th>
                                                                    <th>Start Date</th>
                                                                    <th>DaysNo</th>
                                                                    <th>LeaveType</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {tablerows}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="request-panel">
                                                <table className="table">
                                                    <tr>
                                                        <td>Employee Username</td>
                                                        <td>{this.state.employeeusername}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Leave Start Date</td>
                                                        <td>{this.state.startdate}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Leave End Date</td>
                                                        <td>{this.state.enddate}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Days</td>
                                                        <td>{this.state.daysno}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Leave Type</td>
                                                        <td>{this.state.leavetype}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Leave Description</td>
                                                        <td>{this.state.leavedescription}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Comments</td>
                                                        <td><textarea
                                                            className="form-control"
                                                            rows="2"
                                                            name="comments"
                                                            onChange={(event) => this.handleChange(event)}
                                                            value={this.state.comments}
                                                        /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Info</td>
                                                        <td>{this.state.info}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <li className={
                                                                "list-inline-item" +
                                                                (this.state.info === "Request Approved" ? " notificationhidden" : "")
                                                            }
                                                                onClick={this.handleApprove}>
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-default btn-lg"
                                                                >
                                                                    <i className="fa fa-check fa-fw"/>
                                                                    <span className="network-name">Approve</span>
                                                                </button>
                                                            </li>
                                                        </td>
                                                        <td>
                                                            <li className={
                                                                "list-inline-item" +
                                                                (this.state.info === "Request Approved" ? " notificationhidden" : "")
                                                            }
                                                                onClick={this.handleDecline}>
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-default btn-lg"
                                                                >
                                                                    <i className="fa fa-times fa-fw"
                                                                       style={{color: "#f00"}}/>
                                                                    <span className="network-name"
                                                                          style={{color: "#f00"}}>Decline</span>
                                                                </button>
                                                            </li>
                                                        </td>
                                                    </tr>
                                                </table>
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
        else{
            return (
                <div>
                    <NavBar data={"employee"}/>
                    <section id="about" className="masthead text-center">
                        <div className="intro-body text-center">
                            <div className="container">
                                <div className="mx-auto">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="panel panel-monthly">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title">All Notifications</h3>
                                                </div>
                                                <div className="panel-body fixed-height">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <table className="table notificationtable">
                                                                <thead>
                                                                <tr>
                                                                    <th>Id</th>
                                                                    <th>Employee</th>
                                                                    <th>Start Date</th>
                                                                    <th>DaysNo</th>
                                                                    <th>LeaveType</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {tablerows}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
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

}
export default withRouter(Notification)