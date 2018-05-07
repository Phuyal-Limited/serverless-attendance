import 'amazon-cognito-js'

let AWS = require('aws-sdk');
const REGION = "eu-west-2"


const configdata = {
    region: REGION
}

export const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(configdata);




