import React, {Component} from "react";
import axios from "axios/index";
import NavBar from '../navbar/adminloggedinnavbar'
import {COMPANY_API_URL} from "../../../config";
import {withRouter} from 'react-router-dom';
import '../../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css';
import '../../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../../HomeTemplate/css/grayscale.min.css';

import '../../../css/custom.css';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: localStorage.getItem('adminnotification'),
            comments: {},
            info: {}
        }
        ;
        this.getNotificationsFromNav = this.getNotificationsFromNav.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleDecline = this.handleDecline.bind(this);

    }

    getNotificationsFromNav(data) {
        this.setState({
            notifications: data
        })
    }

    handleChange(event, i) {
        let s = this.state.comments;
        s[i] = event.target.value;
        this.setState({
            comments: s
        })
    }

    handleApprove(id, i) {
        //console.log(id)
        //console.log(this.state.comments[i])
        if (!this.state.comments[i]) {
            let s = this.state.info;
            s[i] = "Fill the comments";
            this.setState({
                info: s
            })
        }
        else {
            let s = this.state.info;
            s[i] = "Please wait...";
            this.setState({
                info: s
            });
            axios.get(COMPANY_API_URL, {
                headers: {
                    token: localStorage.getItem("companyIdToken")
                },
                params: {
                    param1: "ApproveRequest",
                    param2: localStorage.getItem("adminname"),
                    param3: id,
                    param4: this.state.comments[i]
                }
            })
                .then(response => {
                    //console.log(response.data)
                    let s = this.state.info;
                    s[i] = "Request Approved";
                    this.setState({
                        info: s,
                        comments:{}
                    })
                    setTimeout(()=>{
                        this.setState({
                            info:{}
                        })
                    }, 1000);
                    setTimeout(()=>{
                        this.setState({
                            comments:{}
                        })
                    }, 1000);
                    setTimeout(() => {
                        let prenotifications = localStorage.getItem('adminnotification');
                        if (prenotifications !== "[]") {
                            let data = JSON.parse(prenotifications);
                            data.splice(i, 1)
                            let str = JSON.stringify(data)
                            localStorage.setItem("adminnotification", str)
                            this.setState({
                                notifications: str,
                                info:{}
                            })
                            window.location.reload()
                        }
                        else {
                            this.setState({
                                notifications: '[]',
                                info:{}
                            })
                        }
                    }, 1000);


                })
                .catch(error => {
                    localStorage.clear()
                    alert("Your Session Expired! Log in again.")
                    this.props.history.push('/login/employee');

                });
        }

    }

    handleDecline(id, i) {
        if (!this.state.comments[i]) {
            let s = this.state.info;
            s[i] = "Fill the comments";
            this.setState({
                info: s
            })
        }
        else {
            let s = this.state.info;
            s[i] = "Please Wait...";
            this.setState({
                info: s
            })
            axios.get(COMPANY_API_URL, {
                headers: {
                    token: localStorage.getItem("companyIdToken")
                },
                params: {
                    param1: "DeclineRequest",
                    param2: localStorage.getItem("adminname"),
                    param3: id,
                    param4: this.state.comments[i]
                }
            })
                .then(response => {
                    console.log(response.data)
                    let s = this.state.info;
                    s[i] = "Request Declined";
                    this.setState({
                        info: s,
                        comments:{}
                    })
                    setTimeout(()=>{
                        this.setState({
                            info:{},
                            comments:{}
                        })
                    }, 2000);
                    setTimeout(() => {
                        let prenotifications = localStorage.getItem('adminnotification');
                        if (prenotifications !== "[]") {
                            let data = JSON.parse(prenotifications);
                            data.splice(i, 1)
                            let str = JSON.stringify(data)
                            localStorage.setItem("adminnotification", str)
                            this.setState({
                                notifications: str,
                                info:{}
                            })
                        }
                        else {
                            this.setState({
                                notifications: '[]',
                                info:{}
                            })
                        }
                    }, 1000);


                })
                .catch(error => {
                    localStorage.clear()
                    alert("Your Session Expired! Log in again.")
                    this.props.history.push('/login/employee');

                });
        }
    }
    render()
    {
        let list = []

        let info = "All Notifications";
        let data1 = this.state.notifications;

        if (data1 !== "[]") {
            let data = JSON.parse(data1);
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                let id = data[i]['leaveid']
                let index = i;
                list.push(
                    <div className="row">
                        <div className="col-md-7 centered">
                            <div className="request-panel">
                                <table className="table">
                                    <tr>
                                        <td>
                                            Employee Username
                                        </td>
                                        <td>
                                            {data[i]['employeeusername']}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Leave Start Date
                                        </td>
                                        <td>
                                            {data[i]['date']}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Leave End Date
                                        </td>
                                        <td>
                                            {data[i]['enddate']}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Leave Type
                                        </td>
                                        <td>
                                            {data[i]['leavetype']}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Leave Description
                                        </td>
                                        <td>
                                            {data[i]['leavedescription']}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Comments
                                        </td>
                                        <td>
                                            <textarea
                                                className="form-control"
                                                rows="2"
                                                name="comments"
                                                onChange={(event) => this.handleChange(event, index)}
                                                value={this.state.comments[index]}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Info</td>
                                        <td>{this.state.info[index]}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <li className={
                                                "list-inline-item" +
                                                (this.state.info[index] === "Request Approved" ? " notificationhidden" : "")
                                            }
                                                onClick={() => this.handleApprove(id, index)}>
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
                                                (this.state.info[index] === "Request Approved" ? " notificationhidden" : "")
                                            }
                                                onClick={() => this.handleDecline(id, index)}>
                                                <button
                                                    type="submit"
                                                    className="btn btn-default btn-lg"
                                                >
                                                    <i className="fa fa-times fa-fw" style={{color: "#f00"}}/>
                                                    <span className="network-name"
                                                          style={{color: "#f00"}}>Decline</span>
                                                </button>
                                            </li>
                                        </td>
                                    </tr>
                                </table>


                            </div>
                            <hr/>
                        </div>

                    </div>
                )
            }
        }
        else {
            info = "No Notifications"
        }
        return (
            <div>
                <NavBar/>
                <header className="masthead">
                    <div className="intro-body">
                        <div className="container">
                            <h3>{info}</h3>
                            <div>
                                {list}
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }

}
export default withRouter(Notification);