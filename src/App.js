import React, { Component } from 'react';

import './App.css';
import RegisterCompany from "./js/components/register/registercompany";

import AdminLogin  from "./js/components/login/adminlogin";
import EmployeeLogin  from "./js/components/login/employeelogin";

import { HashRouter as Router, Route } from 'react-router-dom';

import HomePage from './HomeTemplate/components/Home'
import PasswordReset from './js/components/login/passwordreset';
class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route exact path='/' component={HomePage}/>
                <Route exact path="/login/employee" component={EmployeeLogin}/>
                <Route exact path="/login/company" component={AdminLogin}/>
                <Route exact path="/register/company" component={RegisterCompany}/>
                <Route exact path="/passwordreset" component={PasswordReset}/>
            </div>
        </Router>
    );
  }
}

/*<div className="sidebyside">
          <Login/>
          <RegisterCompany/>
          <RegisterEmployee/>
      </div>*/
export default App;
