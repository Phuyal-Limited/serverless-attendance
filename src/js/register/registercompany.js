import React, {Component} from "react";
import NavBar from '../navbar/homepagenavbar'
import axios from "axios/index";
import {CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import {withRouter} from 'react-router-dom';

import '../../css/style.css';

let API_URL = 'https://c4q8oqddyj.execute-api.eu-west-2.amazonaws.com/prod/internattendance';
class RegisterCompany extends Component{
    constructor(props){
        super(props);
        this.state = {
            fullname: '',
            username: '',
            email: '',
            password: '',
            repassword: '',
            info: '',
            adminids: '',
            id: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    signUpUser({fullname, username, email, password}){
        console.log("SIGN UP USER...");
        this.getids()
        // instantiate a promise so we can work with this async easily
        const p = new Promise((res, rej)=>{
            setTimeout(() => {
                // create an array of attributes that we want
                const attributeList = [];
                // create the attribute objects in plain JS for each parameter we want to save publically (aka NOT the password)
                const dataEmail = {
                    Name : 'email',
                    Value : email
                };

                const dataName = {
                    Name : 'name',
                    Value : fullname
                };

                // take each attribute object and turn it into a CognitoUserAttribute object
                const attributeEmail = new CognitoUserAttribute(dataEmail);

                //const attributeUsername = new CognitoUserAttribute(dataUsername)
                const attributeName = new CognitoUserAttribute(dataName);

                // add each CognitoUserAttribute to the attributeList array
                attributeList.push(attributeEmail, attributeName);
                const adminUserPool = new CognitoUserPool(this.state.id);
                console.log("about to USER...")
                adminUserPool.signUp(username, password, attributeList, null, function(err, result){
                    if (err) {
                        console.log("an error occurred");
                        console.log(err);

                        rej(err)
                    }
                    console.log("Sgo on")
                    res({email})
                })
            }, 3000);
        });
        return p
    }
    handleSubmit(event) {
        event.preventDefault();
        var passwordValidationMessage=this.validatePassword(this.state.password);
        if(this.state.username===''||this.state.email===''||this.state.password===''||this.state.repassword===''){
            this.setState({
                info: "Fill the Form Correctly"
            });
            setTimeout(() => {
                this.setState({
                    info: ''
                });
            }, 5000);
        }
        else if(!passwordValidationMessage[0] || !passwordValidationMessage[1] || !passwordValidationMessage[2] || !passwordValidationMessage[3]){
            this.setState({
                info:"Password should be at least 8 characters, must contain a lowercase, a uppercase and a number"
            });
            setTimeout(() => {
                this.setState({
                    info: ''
                });
            }, 5000);
        }
        else if(this.state.password!==this.state.repassword){
            this.setState({
                info: "Password didnot match"
            });
            setTimeout(() => {
                this.setState({
                    info: ''
                });
            }, 5000);
        }
        else {
            this.setState({
                info: "Registering..Please Wait"
            });
            this.signUpUser(this.state)
                .then(({email})=>{

                    console.log("done signing up")
                    this.setState({
                        info: "Successfully registered...Verify your email and Login"
                    });
                    setTimeout(() => {
                        this.props.history.push('/login/company');
                    }, 5000);

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
    render() {
        return (
            <div>
                <NavBar/>
                <header className="masthead">
                    <div className="intro-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mx-auto" style={{marginTop: 150}}>
                                    <h3>Register Your Company</h3>
                                    <form onSubmit={this.handleSubmit} className="form-custom">
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={this.state.fullname}
                                            onChange={(event) => this.handleChange(event)}
                                            placeholder="Full Name"
                                            required="required"/><br/>
                                        <input
                                            type="text"
                                            name="username"
                                            value={this.state.username}
                                            onChange={(event) => this.handleChange(event)}
                                            placeholder="Username"
                                            required="required"/><br/>
                                        <input
                                            type="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={(event) => this.handleChange(event)}
                                            placeholder="Email"
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
                                                type="submit"
                                                className="btn btn-default btn-lg"
                                            >
                                                <i className="fa fa-level-up fa-fw" />
                                                <span className="network-name">Register</span>
                                            </button>
                                        </li>
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
export default withRouter(RegisterCompany);