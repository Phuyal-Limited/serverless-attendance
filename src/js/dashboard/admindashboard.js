import React, {Component} from "react";
import NavBar from '../navbar/loggedinnavbar';

import Tables from './Tables'


class AdminDashboard extends Component {

    render(){
        return(
            <div>
                <NavBar/>
                <Tables/>
            </div>
        );
    }
}

export default AdminDashboard;