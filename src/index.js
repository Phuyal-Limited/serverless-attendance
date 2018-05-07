import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EmployeeDashboard from './js/components/dashboard/employeedashboard';
import AdminDashboard from './js/components/dashboard/admindashboard';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import RegisterCompany from "./js/components/register/registercompany";
import EmployeeLogin from "./js/components/login/employeelogin";

import AdminLogin from "./js/components/login/adminlogin";
import ForgotPassword from "./js/components/login/forgotpassword";

import PasswordReset from "./js/components/login/passwordreset";
import HomePage from "./HomeTemplate/components/Home";
import RegisterEmployee from './js/components/register/registeremployee'

import EmployeeProfile from './js/components/profile/employeeprofile'
import CompanyProfile from './js/components/profile/companyprofile'
import Calendar from './js/components/dashboard/admincalendar'
import CalendarEmployee from './js/components/dashboard/employeecalendar'
//import Notification from './js/components/notifications/notificationview'
//import AdminNotification from './js/components/notifications/adminnotifications'
import AdminNotification from './js/components/notifications/newpage'
import Notification from './js/components/notifications/employeenewpage'
import AddRequest from './js/components/addrequest';

import {createStore} from 'redux';
import {Provider} from 'react-redux'
import allReducers from './js/reducers';

const store=createStore(allReducers);




const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render = {(props) => (
        localStorage.getItem('admin') === "true"
            ? <Component {...props}/>
            : <Redirect to='/login/company'/>
    )}/>
);
const PrivateRouteEmployee = ({component: Component, ...rest}) => (

    <Route {...rest} render ={(props) => (
        localStorage.getItem('employee') === "true" || localStorage.getItem('admin') === "true"
            ? <Component {...props}/>
            : <Redirect to='/login/employee'/>
    )}/>


);
ReactDOM.render(
    <Provider store ={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path="/login/employee" component={EmployeeLogin}/>

                    <Route exact path="/login/company" component={AdminLogin}/>
                    <Route exact path="/forgotpassword" component={ForgotPassword}/>
                    <Route exact path="/register/company" component={RegisterCompany}/>
                    <Route exact path="/passwordreset" component={PasswordReset}/>

                    <PrivateRouteEmployee exact path='/calendaremployee' component={CalendarEmployee}/>
                    <PrivateRouteEmployee exact path='/notifications' component={Notification}/>
                    <PrivateRouteEmployee exact path='/addrequest' component={AddRequest}/>
                    <PrivateRouteEmployee exact path="/profile/employee" component={EmployeeProfile}/>
                    <PrivateRouteEmployee exact path='/dashboard/employee' component={EmployeeDashboard}/>

                    <PrivateRoute exact path='/calendar' component={Calendar}/>
                    <PrivateRoute exact path="/profile/company" component={CompanyProfile}/>
                    <PrivateRoute exact path='/dashboard/company' component={AdminDashboard}/>
                    <PrivateRoute exact path='/registeremployee' component={RegisterEmployee}/>
                    <PrivateRoute exact path='/adminnotifications' component={AdminNotification}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
