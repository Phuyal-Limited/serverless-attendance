import React, {Component} from "react";
import axios from "axios/index";

import NavBar from '../navbar/homepagenavbar';
import {CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";
import {withRouter} from 'react-router-dom';

import '../../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css';
import '../../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../../HomeTemplate/css/grayscale.min.css';
import '../../../css/custombootstrap.css';

let API_URL = 'https://c4q8oqddyj.execute-api.eu-west-2.amazonaws.com/prod/internattendance';

class PasswordReset extends Component {
    constructor(props){
        super(props);
        this.state= {
            username: localStorage.getItem("employeename"),
            password: '',
            repassword: '',
            info: '',
            employeeids: '',
            id: {}
        };
        this.handlePasswordSubmit=this.handlePasswordSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this)
    }
    getids(){
        var p=[];
        axios.get(API_URL, {
            params: {
                addNewIntern: "SendCredentials"
            }
        })
            .then(response => {
                this.setState({
                    employeeids: response.data.toString()
                });
                //console.log(this.state.employeeids)
                p=this.state.employeeids.split(",");
                const employeePool={
                    UserPoolId: p[2].replace(/\s+/, ""),
                    ClientId: p[3]
                };
                this.setState({
                    id: employeePool
                })

            })
            .catch(error => {
                console.log(error.toString())
            });

    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    handlePasswordSubmit(event){
        if(this.state.password === this.state.repassword) {
            this.setState({
                info: "Processing..Please Wait!!",
            });
            this.getids()
            const p = new Promise((res, rej)=> {

                setTimeout(() => {
                    const employeeUserPool = new CognitoUserPool(this.getids());
                    var userData = {
                        Username: this.state.username,
                        Pool: employeeUserPool
                    };
                    var cognitoUser = new CognitoUser(userData);

                    cognitoUser.completeNewPasswordChallenge(this.state.repassword, null, {
                        onSuccess: function (result) {
                            console.log('In the onSuccess.');
                            this.setState({
                                info: "Success"
                            });
                        },
                        authSuccess: function (result) {
                            //Password has been updated.
                            console.log('In the AuthSuccess.');
                            this.setState({
                                info: "AuthSuccess"
                            });
                        },
                        onFailure: function (err) {
                            console.log('In the Error ' + err);
                            this.setState({
                                info: "Error"
                            });
                        }
                    });
                }, 3000);
            });
            return p;

        }
        else{
            this.setState({
                info: "Password didnot match"
            })
        }
    }
    render() {
        let passBoundClick=this.handlePasswordSubmit.bind();
        return(
            <div>
                <NavBar/>
                <header className="masthead">
                    <div className="intro-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mx-auto" style={{marginTop: 150}}>
                                    <h3>Change Password</h3>
                                    <div className="form-custom">
                                        <input
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={(event) => this.handleChange(event)}
                                            placeholder="Password"
                                            required="required"/><br/>
                                        <input
                                            type="password"
                                            name="repassword"
                                            value={this.state.repassword}
                                            onChange={(event) => this.handleChange(event)}
                                            placeholder="Confirm Password"
                                            required="required"/><br/>
                                        <li className="list-inline-item" >
                                            <button
                                                onClick={passBoundClick}
                                                className="btn btn-default btn-lg"
                                            >
                                                <i className="fa fa-level-up fa-fw" />
                                                <span className="network-name">Change Password</span>
                                            </button>
                                        </li>
                                    </div>
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
export default withRouter(PasswordReset);