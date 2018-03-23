import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EmployeeDashboard from './js/dashboard/employeedashboard';
import AdminDashboard from './js/dashboard/admindashboard';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import RegisterCompany from "./js/register/registercompany";
import EmployeeLogin from "./js/login/employeelogin";

import AdminLogin from "./js/login/adminlogin";

import PasswordReset from "./js/login/passwordreset";
import HomePage from "./HomeTemplate/components/Home";
import RegisterEmployee from './js/register/registeremployee'

import EmployeeProfile from './js/profile/employeeprofile'
import CompanyProfile from './js/profile/companyprofile'




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
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route exact path="/login/employee" component={EmployeeLogin}/>
                <Route exact path="/login/company" component={AdminLogin}/>
                <Route exact path="/register/company" component={RegisterCompany}/>
                <Route exact path="/passwordreset" component={PasswordReset}/>

                <PrivateRouteEmployee exact path="/profile/employee" component={EmployeeProfile}/>
                <PrivateRoute exact path="/profile/company" component={CompanyProfile}/>
                <PrivateRoute exact path='/dashboard/company' component={AdminDashboard}/>
                <PrivateRoute exact path='/registeremployee' component={RegisterEmployee}/>
                <PrivateRouteEmployee exact path='/dashboard/employee' component={EmployeeDashboard}/>
            </Switch>
        </div>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
