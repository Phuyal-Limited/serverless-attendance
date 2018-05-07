import React from "react";
import axios from "axios/index";
import {apigClientFactory} from '../../node_modules/apigatewaysdk/apigClient'
let API='https://2kbqjukcrc.execute-api.eu-west-2.amazonaws.com/newd';
class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            info:''
        }
    }
    calltoapi(){
        var apigClient = apigClientFactory.newClient();
        var params = {
            //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
            param0: 'Manoj',
            param1: 'Acharya'
        };
        var body = {
            //This is where you define the body of the request
        };
        var additionalParams = {
            //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
            header:{
                Authorization:"eyJraWQiOiJ2Y3VcL1wvamxvM1dVTXNHakp6TDRENnFOc2NVTVFcL2NnQ1FjVFZIXC9OR0RmST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkMzMxZDZlMS00NjlkLTQwYmYtYWFjOC04ZDExOWE3ZDJiZWEiLCJhdWQiOiI2MzV1ZnB0dWF2N29uMDRnanN1amdrMjBrYSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjhjOGI2YzY5LTM5N2UtMTFlOC05MWFlLTE1Yjg4YjI4MTQyOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTIzMDA3NjMyLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9oYkxBalB2T2QiLCJuYW1lIjoiQXNobGVzaGEgSW50ZXJuYXRpb25hbCIsImNvZ25pdG86dXNlcm5hbWUiOiJhc2hsZXNoYSIsImV4cCI6MTUyMzAxMTIzMiwiaWF0IjoxNTIzMDA3NjMyLCJlbWFpbCI6ImFjaGFyeWFkZW1vY3JhdDU3QGdtYWlsLmNvbSJ9.CBYK6AqpJtBx3cqoY5ldiDEAPf4C_dpHpdYqx49G1mIbxIKPeR90rGpMgpXVOtdOhkQNjiBc1fKo_qbg6mGwjbffyA5PL0DWcjorsbMqGAZLyzpAhAkxZ9oKUUpHFWtW-1ddgtsF0F6Lrqep3J6Xe5_wEMSKdvWE1WOl8xxf-bwLn9-Zifq7WtVkRT94XTFNPYqB9KhMlLjSGMQW5us2GAjfMNkhTzqdhPZdGl3m9xigYwwWyRN-YEVrAHLhQZ88EYKqA1P3aelzzkbrqx8Aju_3i3G3UPd9pZVErf-78oGVEOVDD49HrspETEJXv0jSHDoIZHo1vGVtsjczskgRTQ"
            }
        };
        apigClient.get(params, body, additionalParams)
            .then(function(result){
                alert(result)
                //This is where you would put a success callback
            }).catch( function(result){
                alert(result.toString())
            //This is where you would put an error callback
        });

    }
    render(){
        this.calltoapi()
        return(
            <h1>{this.state.info}</h1>
        );
    }
}
export default Test;