import axios from "axios/index";
import {EMPLOYEE_API_URL} from "../config";

export function notificationscheck() {
    axios.get(EMPLOYEE_API_URL, {
            headers:{
                token:localStorage.getItem('idToken')
            },
            params:{
                param1: "checkForNotification",
                param2: localStorage.getItem("employeename")
            }
        })
            .then(response =>{
                //console.log(response.data)
                let data=JSON.parse(response.data)
                localStorage.setItem('notification', JSON.stringify(data[0]))
                localStorage.setItem('requeststatus', JSON.stringify(data[1]))
            })

}