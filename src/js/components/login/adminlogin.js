import axios from "axios/index";
import React, {Component} from "react";


import {AuthenticationDetails, CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";

import {NavLink, withRouter} from 'react-router-dom';
import '../../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css';
import '../../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../../HomeTemplate/css/grayscale.min.css';

import NavBar from '../navbar/homepagenavbar';


let API_URL = 'https://c4q8oqddyj.execute-api.eu-west-2.amazonaws.com/prod/internattendance';

class AdminLogin extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            info: '',
            data:{},
            adminids:'',
            id:{}
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
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
                //console.log(this.state.adminids)
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
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    signInUser({username, password}){
        this.getids()
        const p = new Promise((res, rej)=> {
            setTimeout(() => {
                var authenticationData = {
                    Username: username,
                    Password: password,
                };

                var authenticationDetails = new AuthenticationDetails(authenticationData);

                try{
                    const adminUserPool = new CognitoUserPool(this.state.id)
                    var userData = {
                        Username: username,
                        Pool: adminUserPool
                    };
                    var cognitoUser = new CognitoUser(userData);
                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: function (result) {
                            //console.log('access token + ' + result.getAccessToken().getJwtToken());
                            /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
                            //console.log('idToken + ' + result.idToken.jwtToken);
                            //console.log('refresh token - '+result.getRefreshToken().getToken())
                            //console.log(result);
                            localStorage.setItem("companyAccessToken", result.getAccessToken().getJwtToken());
                            localStorage.setItem("companyIdToken", result.idToken.jwtToken);

                            res({result})
                        },

                        onFailure: function (err) {

                            console.log(err);
                            rej(err)
                        },

                    });
                }
                catch(err){
                    this.setState({
                        info:"Slow Connection. Try Again."
                    })
                }

            }, 5000);

        }).catch(error => {
            alert('Error')
        });

        return p;
    }
    handleSubmit(event){
        event.preventDefault();

        this.setState({
            info: "Logging in..Please Wait!!"
        });
        this.signInUser({
            username: this.state.username,
            password: this.state.password
        })
            .then(({result})=>{

                localStorage.setItem("admin", "true");
                localStorage.setItem("adminname", this.state.username)
                console.log("done signing in")
                this.setState({
                    info: "Successfully Signed In..Please Wait"
                });
                setTimeout(() => {
                    this.props.history.push('/dashboard/company');
                }, 2000);

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
        let submit=this.handleSubmit.bind();

        return (
            <div>
                <NavBar/>
                <header className="masthead">
                    <div className="intro-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mx-auto" style={{marginTop: 150}}>
                                    <div className="form-custom">
                                        <h3>Company Login</h3>
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
                                        <li className="list-inline-item">
                                            <button
                                                onClick={submit}
                                                className="btn btn-default btn-lg"
                                            >
                                                <i className="fa fa-level-up fa-fw" />
                                                <span className="network-name">Company Login</span>
                                            </button>
                                        </li>
                                        <h1 className="message">{this.state.info}</h1>
                                        <NavLink to='/login/employee'>Sign In with Employee Credentials</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
export default withRouter(AdminLogin);