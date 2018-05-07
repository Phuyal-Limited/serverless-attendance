import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios/index";
import NavBar from '../navbar/loggedinnavbar'
import {EMPLOYEE_API_URL} from "../../../config";
//let API_URL = 'https://c4q8oqddyj.execute-api.eu-west-2.amazonaws.com/prod/internattendance';

class EmployeeProfile extends Component{
    constructor(props){
        super(props);
        this.state={
            apiInfo:[]
        }
    }

    componentDidMount(){
        axios.get(EMPLOYEE_API_URL, {
            headers:{
                token: localStorage.getItem('idToken')
            },
            params : {
                param1: "EmployeeProfile",
                param2: localStorage.getItem("employeename")
            }
        })
            .then(response => {
                //console.log(response.data)
                var rfinal = "{" + response.data + "}";
                var m = rfinal.replace(/'/g, '"');
                var final = JSON.parse(m);

                this.setState({
                    apiInfo:final
                });


            })
            .catch(error => {

                alert(error.toString())

            });

    }

    render(){
        if(this.state.apiInfo.length===0){

        }
        else {
            var username = this.state.apiInfo['username'][0];

            var email = this.state.apiInfo['email'][0];
            var fullname = this.state.apiInfo['fullname'][0];
            var position = this.state.apiInfo['position'][0];
            var department = this.state.apiInfo['department'][0];
            var company = this.state.apiInfo['company'][0];
        }
        return(
            <div>
                <NavBar data={"employee"}/>
                <section id="about" className="masthead text-center">
                    <div className="intro-body text-center">
                        <div className="container">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="panel panel-primary">
                                            <div className="panel-heading">
                                                <h3 className="panel-title">Employee Information</h3>
                                            </div>
                                            <div className="panel-body fixed-height">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div style={{margin: 20}}>
                                                            <div className="row">
                                                                <label><b>Username:  </b></label>
                                                                <p> {username} </p>
                                                            </div>
                                                            <div className='row'>
                                                                <label><b>Company Username: </b></label>
                                                                <p>{company}</p>
                                                            </div>
                                                            <div className='row'>
                                                                <label><b>Email: </b></label>
                                                                <p>{email}</p>
                                                            </div>
                                                            <div className='row'>
                                                                <label><b>Full name: </b></label>
                                                                <p>{fullname}</p>
                                                            </div>
                                                            <div className='row'>
                                                                <label><b>Position: </b></label>
                                                                <p>{position}</p>
                                                            </div>
                                                            <div className='row'>
                                                                <label><b>Department: </b></label>
                                                                <p>{department}</p>
                                                            </div>
                                                        </div>
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
export default withRouter(EmployeeProfile)