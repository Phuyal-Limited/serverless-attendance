import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios/index";
import NavBar from '../navbar/adminloggedinnavbar'
import {COMPANY_API_URL} from "../../../config";
import '../../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css';
import '../../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../../HomeTemplate/css/grayscale.min.css';
import '../../../css/custom.css';
import '../../../css/loader.css'

class CompanyProfile extends Component{
    constructor(props){
        super(props);
        this.state= {
            info: '',
            apiInfo: []
        }
    }
    componentDidMount(){
        axios.get(COMPANY_API_URL, {
            headers:{
                token: localStorage.getItem('companyIdToken')
            },
            params : {
                param1: "CompanyProfile",
                param2: localStorage.getItem("adminname")
            }
        })
            .then(response => {
                var rfinal = "{" + response.data + "}";
                var m = rfinal.replace(/'/g, '"');
                //var ma=m.replace(/\\/g, '"');
                console.log(rfinal)
                var final = JSON.parse(m);

                this.setState({
                    apiInfo:final
                });

            })
            .catch(error => {
                if(error['message']==="Network Error") {
                    localStorage.clear()
                    alert("Your session has expired! Log in again...")
                    this.props.history.push('/login/company')
                }
            });

    }
    render(){
        var employeedetails=[];
        if(this.state.apiInfo.length===0){
            employeedetails.push(
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
        else {
            var companyusername = this.state.apiInfo['companyusername'][0];
            var companyemail = this.state.apiInfo['companyemail'][0];
            var companyfullname = this.state.apiInfo['companyfullname'][0];
            for (var b = 0; b < this.state.apiInfo['employeeusername'].length; b++) {
                var usernname = this.state.apiInfo['employeeusername'][b];
                var email = this.state.apiInfo['employeeemail'][b];
                var fullname = this.state.apiInfo['employeefullname'][b];
                var position = this.state.apiInfo['employeeposition'][b];
                var department = this.state.apiInfo['employeedepartment'][b];
                employeedetails.push(
                    <tr key={b}>
                        <td>{b + 1}</td>
                        <td><a>{usernname}</a></td>
                        <td>{fullname}</td>
                        <td>{email}</td>
                        <td>{position}</td>
                        <td>{department}</td>
                    </tr>
                );
            }
        }
        return(
            <div>
                <NavBar/>
                <section id="about" className="masthead text-center">
                    <div className="intro-body text-center">
                        <div className="container">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="panel panel-primary">
                                            <div className="panel-heading">
                                                <h3 className="panel-title">Company Information</h3>
                                            </div>
                                            <div className="panel-body fixed-height">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label><b>Username</b></label>
                                                        <p>{companyusername}</p>
                                                        <label><b>Email</b></label>
                                                        <p>{companyemail}</p>
                                                        <label><b>Full name</b></label>
                                                        <p>{companyfullname}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="panel panel-primary">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Employees List</h3>
                                        </div>
                                        <div className="panel-body fixed-height">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <table className="table">
                                                        <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>UserName</th>
                                                            <th>FullName</th>
                                                            <th>Email</th>
                                                            <th>Position</th>
                                                            <th>Department</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {employeedetails}
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
                </section>
            </div>
        );
    }
}
export default withRouter(CompanyProfile)