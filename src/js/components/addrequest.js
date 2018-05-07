import React, {Component} from "react";
import axios from "axios/index";
import NavBar from './navbar/loggedinnavbar';
import {EMPLOYEE_API_URL} from '../../config';

class AddRequest extends Component{
    constructor(props){
        super(props);


        this.state={
            startdate:this.today(),
            enddate:this.today(),
            leavetype:'Sick Leave',
            leavedescription:'',
            info:''

        };
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    today(){
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
        return dateForSearch
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
    handleSubmit(event){
        event.preventDefault()
        this.setState({
            info:"Please Wait..."
        });
        var startfields = this.state.startdate.split('-');
        var startyear = startfields[0];
        var startmonth = parseInt(startfields[1], 10);
        var startday = parseInt(startfields[2], 10);
        var startmonthstr = this.getThisMonth(startmonth);
        var startdate=startday.toString()+" "+ startmonthstr + " " +startyear;

        var fields = this.state.enddate.split('-');
        var year = fields[0];
        var month = parseInt(fields[1], 10);
        var day = parseInt(fields[2], 10);
        var monthStr = this.getThisMonth(month);
        var enddate=day.toString()+" "+ monthStr + " " +year;
        console.log(localStorage.getItem("idToken"))
        axios.get(EMPLOYEE_API_URL,{
            headers:{
                token:localStorage.getItem("idToken")
            },
            params:{
                param1:"AddRequest",
                param2:localStorage.getItem("employeename"),
                param3: startdate,
                param4: enddate,
                param5:this.state.leavetype,
                param6:this.state.leavedescription
            }
        })
            .then(response=>{
                console.log(response.data)
                this.setState({
                    info:"Successfully Requested!"
                })
                setTimeout(()=>{
                    this.setState({
                        startdate:this.today(),
                        enddate:this.today(),
                        leavetype:'Sick Leave',
                        leavedescription:'',
                        info:''
                    })
                }, 3000)
            })
            .catch(error => {
                //localStorage.setItem("employee", "");
                //localStorage.setItem("admin", "");
                //localStorage.setItem("employeename", "");
                //localStorage.setItem("adminname", "");
                localStorage.clear();
                alert("Your Session Expired! Log in again.")
                this.props.history.push('/login/employee');

            });
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    render(){
        return(
            <div>
                <NavBar data={"employee"}/>
                <header className="masthead">
                    <div className="intro-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mx-auto" >
                                    <h3>Add Request</h3>
                                    <form onSubmit={this.handleSubmit} className="form-custom">
                                        <div>
                                            <label>Start Date</label><br/>
                                            <input
                                                type="date"
                                                name="startdate"
                                                id="startdate"
                                                value={this.state.startdate}
                                                onChange={(event) => this.handleChange(event)}
                                                placeholder="Start Date"
                                            /><br/>
                                        </div>
                                        <div>
                                            <label>End Date</label><br/>
                                            <input
                                                type="date"
                                                name="enddate"
                                                id="enddate"
                                                value={this.state.enddate}
                                                onChange={(event) => this.handleChange(event)}
                                                placeholder="Start Date"
                                            /><br/>
                                        </div>
                                        <div>
                                            <label>Leave Type</label><br/>
                                            <select
                                                id="leavetype"
                                                name="leavetype"
                                                value={this.state.leavetype}
                                                onChange={(event) => this.handleChange(event)}
                                            >
                                                <option value="Sick Leave">Sick Leave</option>
                                                <option value="Work From Home">Work From Home</option>
                                                <option value="Personal Leave">Personal Leave</option>
                                            </select><br/>
                                        </div>
                                        <div>
                                        <textarea
                                            name="leavedescription"
                                            type="text"
                                            placeholder="Leave Description"
                                            value={this.state.leavedescription}
                                            onChange={(event) => this.handleChange(event)}/><br/>
                                        </div>
                                        <li className="list-inline-item" >
                                            <button
                                                type="submit"
                                                className="btn btn-default btn-lg"
                                            >
                                                <i className="fa fa-level-up fa-fw" />
                                                <span className="network-name">Add Request</span>
                                            </button>
                                        </li>
                                        <li className="list-inline-item" style={{margin: 10, padding: 10, paddingLeft: 20, borderRadius: 10, width: 350}}>
                                            <a href="#dashboard/employee"
                                               className="btn btn-default btn-lg"
                                            >
                                                <i className="fa fa-crosshairs" />
                                                <span className="network-name"> Cancel </span>
                                            </a>
                                        </li><br/>
                                    </form>
                                    <h1 className="message">{this.state.info}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

        );
    }
}
export default AddRequest;