import axios from "axios/index";
import React, {Component} from "react";
import NavBar from '../navbar/homepagenavbar';
import {CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";

//import {NavLink, withRouter} from 'react-router-dom';
import '../../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css';
import '../../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../../HomeTemplate/css/grayscale.min.css';

let API_URL = 'https://c4q8oqddyj.execute-api.eu-west-2.amazonaws.com/prod/internattendance';
class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            code:'',
            password:'',
            repassword:'',
            id:{}
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleRequestCode=this.handleRequestCode.bind(this);
        this.handleSubmitPassword=this.handleSubmitPassword.bind(this);
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
                    adminids: response.data.toString()
                });
                console.log(this.state.adminids)
                p=this.state.adminids.split(",");
                const adminPool={
                    UserPoolId: p[0].replace(/\s+/, ""),
                    ClientId: p[1]
                };
                this.setState({
                    id:adminPool
                })

            })
            .catch(error => {
                console.log(error.toString())
            });

    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    handleRequestCode(){
        this.getids()
        this.setState({
            info:"Please wait..."
        })
        const p = new Promise((res, rej)=> {
            setTimeout(() => {
                try{
                    const adminUserPool = new CognitoUserPool(this.state.id)
                    var userData = {
                        Username: this.state.username,
                        Pool: adminUserPool
                    };
                    var cognitoUser = new CognitoUser(userData);
                    cognitoUser.forgotPassword({
                        onSuccess: function (result) {
                            alert("Password change successful")
                            console.log('call result: ' + result);
                        },
                        onFailure: function(err) {
                            console.log(err)
                            //alert(err.toString());
                        },
                        inputVerificationCode() {
                           /* var verificationCode = prompt('Please input verification code ' ,'');
                            var newPassword = prompt('Enter new password ' ,'');
                            var reNewPassword=prompt('Reenter the password','');
                            if(newPassword!==reNewPassword){
                                alert('Password didnot match')
                            }
                            else{
                                cognitoUser.confirmPassword(verificationCode, newPassword, this);
                            }*/
                           this.setState({

                           })

                        }
                    });
                }
                catch(err){
                    this.setState({
                        info:"Slow Connection. Try Again."
                    })
                }

            }, 10000);

        }).catch(error => {
            alert('Error')
        });

        return p;

    }
    handleSubmitPassword(){
        
    }
    renderNewPassword(){
        let changepassword=this.handleSubmitPassword.bind()
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
                                            type="code"
                                            name="code"
                                            value={this.state.code}
                                            onChange={(event) => this.handleChange(event)}
                                            placeholder="Verification Code"
                                            required="required"/><br/>
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
                                                onClick={changepassword}
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
    render(){
        let passBoundClick=this.handleRequestCode.bind()
        return(
            <div>
                <NavBar/>
                <header className="masthead">
                    <div className="intro-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mx-auto" style={{marginTop: 150}}>
                                    <h3>Forgot Password? Enter your username.</h3>
                                    <div className="form-custom">
                                        <input
                                            type="username"
                                            name="username"
                                            value={this.state.username}
                                            onChange={(event) => this.handleChange(event)}
                                            placeholder="Username"
                                            required="required"/><br/>

                                        <li className="list-inline-item" >
                                            <button
                                                onClick={passBoundClick}
                                                className="btn btn-default btn-lg"
                                            >
                                                <i className="fa fa-level-up fa-fw" />
                                                <span className="network-name">Send verification code</span>
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

        )
    }
}
export default ForgotPassword;