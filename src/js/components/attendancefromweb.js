import axios from "axios/index";
import React, {Component} from "react";
import Webcam from 'react-webcam';
import '../../css/style.css';
import '../../HomeTemplate/vendor/bootstrap/css/bootstrap.min.css';
import '../../HomeTemplate/vendor/font-awesome/css/font-awesome.min.css';
import '../../HomeTemplate/css/grayscale.min.css';
import '../../css/custombootstrap.css';
import AttendFromWebNavBar from './navbar/attendfromwebnavbar'

let ATTENDANCE_API_URL="https://acqdzcwzj4.execute-api.eu-west-2.amazonaws.com/dev/check_attendance";

class Attendance extends Component{
    constructor(props){
        super(props);
        this.state={
            imgSrcForAPI:'',
            baseEncode:'',
            username:'',
            info:'',
            action:''
        };
        this.handleChange=this.handleChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.cancel=this.cancel.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    setRef = (webcam) => {
        this.webcam = webcam;
    }
    getThisMonth(m) {
        if (m === 1) {
            return ("January");
        }
        else if (m === 2) {
            return ("February");
        }
        else if (m === 3) {
            return ("March");
        }
        else if (m === 4) {
            return ("April");
        }
        else if (m === 5) {
            return ("May");
        }
        else if (m === 6) {
            return ("June");
        }
        else if (m === 7) {
            return ("July");
        }
        else if (m === 8) {
            return ("August");
        }
        else if (m === 9) {
            return ("September");
        }
        else if (m === 10) {
            return ("October");
        }
        else if (m === 11) {
            return ("November");
        }
        else if (m === 12) {
            return ("December");
        }
    }
    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        var img=imageSrc.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        this.setState({
            imgSrcForAPI: img,
            baseEncode: imageSrc,
        });
    };
    onSubmit(event){
        event.preventDefault();
        console.log(this.state.imgSrcForAPI);
        this.setState({
            info:"Please Wait..."
        })

        let today = new Date();
        let dd = parseInt(today.getDate(), 10);
        let mm = today.getMonth() + 1;
        let monthinStr=this.getThisMonth(mm);
        let yyyy = today.getFullYear().toString();
        var dateForToday = dd.toString() + ' ' + monthinStr + ' ' + yyyy;
        axios.post(ATTENDANCE_API_URL, {
            "name": this.state.username.toLowerCase(),
            "imgstr": this.state.imgSrcForAPI,
            "company": "ashlesha",
            "date": dateForToday

        })
            .then(response => {
                if(response.data==="No Face"){
                    this.setState({
                        info: "No Face Detected."
                    })
                }
                else if(response.data==="[]"){
                    this.setState({
                        info:"Something Is Wrong"
                    })
                }
                else {
                    console.log(response.data)
                    let data = JSON.parse(response.data)
                    let sim = parseInt(data[0].split('%')[0], 10);
                    if(sim<=80){
                        this.setState({
                            info: "Threshold Similarity Not Reached"
                        })
                    }
                    else {
                        let info = "Similarity:  " + data[0]
                        this.setState({
                            info: info,
                            action:"Action:" + data[1]
                        })
                    }

                }
                setTimeout(() => {
                    this.setState({
                        imgSrcForAPI:'',
                        baseEncode:'',
                        username:'',
                        info:'',
                        action:''
                    })
                }, 10000);

            })
            .catch(error => {
                this.setState({
                    info: "There's an error in the request"
                });
            });
    };
    cancel(){
        this.setState({
            imgSrcForAPI:'',
            baseEncode:'',
            username:'',
            info:'',
            action:''
        })
    }
    render() {
        if(this.state.baseEncode===''){
            return(
                <div>
                    <AttendFromWebNavBar/>
                    <header className="masthead" style={{marginBottom:50}}>
                        <div className="intro-body">
                            <div className="container">
                                <h1>Attendance Console</h1>
                                <div className="col-md-12">
                                    <Webcam
                                        audio={false}
                                        height={500}
                                        ref={this.setRef}
                                        screenshotFormat="image/jpeg"
                                        width={500}
                                        className="col-md-6"
                                    />
                                    <br/>
                                    <li className="list-inline-item">
                                        <button
                                            onClick={this.capture}
                                            className="btn btn-default btn-lg"
                                        >
                                            <i className="fa fa-level-up fa-fw"/>
                                            <span className="network-name">Capture Photo</span>
                                        </button>
                                    </li>
                                </div>

                            </div>
                        </div>
                    </header>
                </div>
            );
        }
        else {
            return (
                <div>
                    <AttendFromWebNavBar/>
                    <header className="masthead">
                        <div className="intro-body">
                            <div className="container">
                                <h1>Attendance Console</h1>
                                <div className="col-md-12">
                                    <img src={this.state.baseEncode} style={{ height:"auto", paddingBottom:20}} alt=""/>
                                    <form onSubmit={this.onSubmit} className="form-custom">
                                        <input
                                            name="username"
                                            type="text"
                                            placeholder="Employee username"
                                            value={this.state.username}
                                            onChange={(event) => this.handleChange(event)}

                                        />
                                        <div className="row">
                                            <li className="list-inline-item col-md-2">
                                                <button
                                                    type="submit"
                                                    className="btn btn-default btn-lg"
                                                >
                                                    <i className="fa fa-level-up fa-fw"/>
                                                    <span className="network-name">Submit</span>
                                                </button>
                                            </li>
                                            <li className="list-inline-item col-md-2">
                                                <button
                                                    onClick={this.cancel}
                                                    className="btn btn-default btn-lg"
                                                >
                                                    <i className="fa fa-level-up fa-fw"/>
                                                    <span className="network-name">Cancel</span>
                                                </button>
                                            </li>
                                        </div>
                                        <h1 className="message">{this.state.info}</h1>
                                        <h1 className="message">{this.state.action}</h1>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </header>
                </div>
            );
        }
    }
}
export default Attendance;