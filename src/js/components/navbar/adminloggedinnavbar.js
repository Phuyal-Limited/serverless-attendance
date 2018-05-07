import React, {Component} from "react";
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';

import { Redirect, withRouter} from 'react-router-dom'
import '../../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css';
import '../../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../../HomeTemplate/css/grayscale.min.css';

import {COMPANY_API_URL} from "../../../config";
import '../../../css/custom.css';
import axios from "axios/index";

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state= {
            logout: false,
            notifications: []
        };
        this.logout=this.logout.bind(this);
        this.adminnotificationClick=this.adminnotificationClick.bind(this);
    }
    logout(){
        localStorage.clear()
        this.setState({
            logout:true
        });

    }
    componentWillMount(){
        axios.get(COMPANY_API_URL, {
            headers:{
                token:localStorage.getItem('companyIdToken')
            },
            params:{
                param1: "checkForNotification",
                param2: localStorage.getItem("adminname")
            }
        })
            .then(response =>{
                localStorage.setItem('adminnotification', response.data)
                let data=JSON.parse(response.data)

                this.setState({
                    notifications:data
                })

            })

    }
    adminnotificationClick(){
        if(this.props.location.pathname==="/adminnotifications"){
            window.location.reload()
        }
        else {
            this.props.history.push('/adminnotifications');
        }
    }
    render() {
        //alert(localStorage.getItem('fornotifications'))
        //let data=JSON.parse(localStorage.getItem("fornotifications"));
        let data=this.state.notifications;
        let boundCLick = this.logout.bind();

        let adminnotificationclick=this.adminnotificationClick.bind(this);


        if(this.state.logout){

            return(
                <Redirect to='/'/>
            );

        }
        else {
            return (
                <div className="nav">
                    <nav
                        className="navbar navbar-expand-lg navbar-light fixed-top"
                        id="mainNav"
                    >
                        <div className="container">
                            <a className="navbar-brand js-scroll-trigger" href="http://phuyal.co.uk/">
                                Phuyal Limited
                            </a>
                            <button
                                className="navbar-toggler navbar-toggler-right"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarResponsive"
                                aria-controls="navbarResponsive"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                Menu
                                <i className="fa fa-bars" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarResponsive">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a className="nav-link js-scroll-trigger" onClick={boundCLick} href="">
                                            Logout
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link js-scroll-trigger" href="#profile/company">
                                            Profile
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link js-scroll-trigger" href="#registeremployee">
                                            Add
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link js-scroll-trigger" href="#dashboard/company">
                                            Dashboard
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link js-scroll-trigger" href="#calendar">
                                            Calendar
                                        </a>
                                    </li>
                                    <li className="notificationnew">
                                            <img alt="bell" onClick={adminnotificationclick} src="https://s3.amazonaws.com/codecademy-content/projects/2/feedster/bell.svg" style={{color:data.length===0?"":"#f00", width: "30px"}}/>
                                            <span style={{display:data.length===0?"none":"inline", color:"#f00"}}>
                                                    {data.length}
                                                </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            );

        }
    }
}
export default withRouter(NavBar);