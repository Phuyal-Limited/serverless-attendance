import 'amazon-cognito-js'
<<<<<<< HEAD

let AWS = require('aws-sdk');
const REGION = "eu-west-2"

=======
//import axios from "axios/index";

let AWS = require('aws-sdk');
//let API_URL = 'https://c4q8oqddyj.execute-api.eu-west-2.amazonaws.com/prod/internattendance';
const REGION = "eu-west-2"

/*export function getCredentials(whichPool){
    let id='';
    axios.get(API_URL, {
        params: {
            addNewIntern: "SendCredentials"
        }
    })
        .then(response => {
            id = response.data;
            console.log(id)

        })
        .catch(error => {
            console.log(error.toString())
        });
    var p=id.split(",");
    if(whichPool==="admin"){
        const adminPool={
            UserPoolId: p[0],
            ClientId: p[1]
        };
        return (adminPool);
    }
    else{
        const employeePool={
            UserPoolId: p[2],
            ClientId: p[3]
        };
        return (employeePool);

    }
}*/
>>>>>>> 4a45f49ac39b1d9e973138e649b205059ee1eada

const configdata = {
    region: REGION
}

export const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(configdata);




