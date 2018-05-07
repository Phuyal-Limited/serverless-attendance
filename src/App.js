import React, { Component } from 'react';

import './App.css';
<<<<<<< HEAD
import RegisterCompany from "./js/components/register/registercompany";

import AdminLogin  from "./js/components/login/adminlogin";
import EmployeeLogin  from "./js/components/login/employeelogin";
=======
import RegisterCompany from "./js/register/registercompany";

import AdminLogin  from "./js/login/adminlogin";
import EmployeeLogin  from "./js/login/employeelogin";
>>>>>>> 4a45f49ac39b1d9e973138e649b205059ee1eada

import { HashRouter as Router, Route } from 'react-router-dom';

import HomePage from './HomeTemplate/components/Home'
<<<<<<< HEAD
import PasswordReset from './js/components/login/passwordreset';
=======
import PasswordReset from './js/login/passwordreset';
>>>>>>> 4a45f49ac39b1d9e973138e649b205059ee1eada
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
