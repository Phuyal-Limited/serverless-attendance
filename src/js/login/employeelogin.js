import React, {Component} from "react";
import axios from "axios/index";
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";
import {NavLink , withRouter} from 'react-router-dom';
import NavBar from '../navbar/homepagenavbar';

import  '../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css'
import '../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../HomeTemplate/css/grayscale.min.css';
import '../../css/custombootstrap.css';

let API_URL = 'https://c4q8oqddyj.execute-api.eu-west-2.amazonaws.com/prod/internattendance';

class EmployeeLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            info: '',
            data: {},
            resetPassword: false,
            newpassword: '',
            renewpassword: '',
            employeeids: '',
            id: {}
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handlePasswordSubmit=this.handlePasswordSubmit.bind(this);
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
                console.log(this.state.employeeids)
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
    validatePassword(str){
        var msg = [];
        var lowerCaseLetters = /[a-z]/g;
        if(str.match(lowerCaseLetters)) {
            msg[0]=true;
        } else {
            msg[0]=false;
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(str.match(upperCaseLetters)) {
            msg[1]=true;
        } else {
            msg[1]=false;
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if(str.match(numbers)) {
            msg[2]=true;
        } else {
            msg[2]=false;
        }

        // Validate length
        if(str.length >= 8) {
            msg[3]=true;
        } else {
            msg[3]=false;
        }
        return msg;
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    signInEmployeeUser({username, password}){

        this.getids()
        const p = new Promise((res, rej)=> {
            setTimeout(() => {
                var authenticationData = {
                    Username: username,
                    Password: password,
                };
                var authenticationDetails = new AuthenticationDetails(authenticationData);
                const employeeUserPool = new CognitoUserPool(this.state.id);
                var userData = {
                    Username: username,
                    Pool: employeeUserPool
                };
                var cognitoUser = new CognitoUser(userData);
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (result) {
                        console.log('access token + ' + result.getAccessToken().getJwtToken());
                        console.log('idToken + ' + result.idToken.jwtToken);
                        res({result})
                    },
                    onFailure: function (err) {
                        console.log("Got an error")
                        console.log(err);
                        rej(err)
                    },
                    newPasswordRequired: function(result) {
                        if(!localStorage.getItem("resetpassword")){
                            console.log(result);
                            res({result});
                        }
                        else{
                            cognitoUser.completeNewPasswordChallenge(localStorage.getItem("resetpassword"), null, {
                                onSuccess: function (result) {
                                    console.log('In the onSuccess. Password changed and user confirmed');
                                    localStorage.setItem("resetpassword","")
                                    localStorage.setItem("employeename", username)

                                    res({result})
                                },
                                authSuccess: function (result) {
                                    //Password has been updated.
                                    console.log('In the AuthSuccess.');
                                    localStorage.setItem("resetpassword","")

                                },
                                onFailure: function (err) {
                                    console.log('In the Error ' + err.toString());
                                    localStorage.setItem("resetpassword","")

                                }
                            });
                        }
                    }
                });
            }, 3000);
        });
        return p;
    }
    handlePasswordSubmit(event){
        this.setState({
            info: "Processing..Please Wait!!"
        });
        var passwordValidationMessage=this.validatePassword(this.state.newpassword);
        if(!passwordValidationMessage[0] || !passwordValidationMessage[1] || !passwordValidationMessage[2] || !passwordValidationMessage[3]){
            this.setState({
                info:"Password should be at least 8 characters, must contain a lowercase, a uppercase and a number"
            });
            setTimeout(() => {
                this.setState({
                    info: ''
                });
            }, 5000);
        }
        else if(this.state.newpassword !== this.state.renewpassword) {
            this.setState({
                info: "Password didnot match"
            })
        }
        else{
            localStorage.setItem("resetpassword", this.state.renewpassword)
            this.signInEmployeeUser({
                username: localStorage.getItem("employeename"),
                password: localStorage.getItem("employeepassword")
            }).then(({result})=>{
                axios.get(API_URL, {
                    params : {
                        addNewIntern: "PostConfirmation",
                        u: this.state.username
                    }
                })
                    .then(response => {
                        console.log(response.data)
                        localStorage.setItem("employee", "true");
                        localStorage.setItem("employeename", this.state.username);
                        localStorage.setItem("employeepassword", "");
                        localStorage.setItem("resetpassword", "")
                        this.props.history.push('/dashboard/employee');
                    })
                    .catch(error => {
                        this.setState({
                            //info: "There's an error in the reequest"
                            info: error.toString()
                        });
                    });

            })
                .catch((err)=>{
                    // if failure, display the error message and toggle the loading icon to disappear
                    console.log(err);
                    if(err['code']==="InvalidLambdaResponseException"){
                        this.setState({
                            info: "Email Already Used"
                        });
                    }
                    else{
                        this.setState({
                            info: err['message']
                        })
                    }

                })

        }
    }
    handleClick(){
        this.setState({
            info: "Logging in..Please Wait!!"
        });
        this.signInEmployeeUser({
            username: this.state.username,
            password: this.state.password
        })
            .then(({result})=>{
                localStorage.setItem("employee", "true");
                localStorage.setItem("employeename", this.state.username);
                localStorage.setItem("employeepassword", this.state.password)
                axios.get(API_URL, {
                    params: {
                        addNewIntern: "checkForNewPassword",
                        u: 'admin',
                        p: 'youshallnotpass',
                        t: localStorage.getItem("employeename")
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
                            if(response.data==="True"){
                                alert("you neeed to change password");
                                this.setState({
                                    info:'',
                                    resetPassword:true
                                })
                            }
                            else{
                                console.log("done signing in")
                                this.setState({
                                    info: "Successfully Signed In...Please wait!!"
                                });
                                setTimeout(() => {
                                    this.props.history.push('/dashboard/employee');

                                }, 2000);

                            }
                        }
                    })
                    .catch(error => {
                        this.setState({
                            displayText: "Request failed"
                        });
                    });


            })
            .catch((err)=>{
                // if failure, display the error message and toggle the loading icon to disappear
                console.log(err);
                if(err['code']==="InvalidLambdaResponseException"){
                    this.setState({
                        info: "Email Already Used"
                    });
                }
                else{
                    this.setState({
                        info: err['message']
                    })
                }

            })
    }
    render(){
        let boundClick = this.handleClick.bind();
        let passBoundClick=this.handlePasswordSubmit.bind();
        if(!this.state.resetPassword){
            return (
                <div>
                    <NavBar/>
                    <header className="masthead">
                        <div className="intro-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 mx-auto" style={{marginTop: 150}}>
                                        <div className="form-custom">
                                            <h3>Employee Login</h3>
                                            <input
                                                type="text"

                                                name="username"
                                                value={this.state.username}
                                                onChange={(event) => this.handleChange(event)}
                                                placeholder="Username"
                                                required="required"/><br/>
                                            <input
                                                type="password"
                                                name="password"

                                                value={this.state.password}
                                                onChange={(event) => this.handleChange(event)}
                                                placeholder="Password"
                                                required="required"/><br/>
                                            <li className="list-inline-item" >
                                                <button
                                                    onClick={boundClick}
                                                    className="btn btn-default btn-lg"
                                                >
                                                    <i className="fa fa-level-up fa-fw" />
                                                    <span className="network-name">Employee Login</span>
                                                </button>
                                            </li>

                                            <h1 className="message">{this.state.info}</h1>
                                            <NavLink to='/login/company'>Sign In with Company Credentials</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            );
        }
        else{
            return(
                <header className="masthead">
                    <div className="intro-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mx-auto" style={{marginTop: 150}}>
                                    <h3>Change Password</h3>
                                    <div className="form-custom">
                                        <input
                                            type="password"
                                            name="newpassword"
                                            value={this.state.newpassword}
                                            onChange={(event) => this.handleChange(event)}
                                            placeholder="Password"
                                            required="required"/><br/>
                                        <input
                                            type="password"
                                            name="renewpassword"
                                            value={this.state.renewpassword}
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
            );
        }
    }
}
export default withRouter(EmployeeLogin);