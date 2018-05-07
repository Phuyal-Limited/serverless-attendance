import React, {Component} from "react";
import NavBar from '../navbar/adminloggedinnavbar';

import Tables from './admintables'


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