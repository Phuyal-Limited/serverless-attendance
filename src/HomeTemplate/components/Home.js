import React from "react";
import '../vendor/bootstrap/css/bootstrap.min.css';
import '../vendor/font-awesome/css/font-awesome.min.css';
import '../css/grayscale.min.css';
import logo from '../../logo.png'
import daily from '../img/screenshots/company_dashboard_daily.png'
import monthly from '../img/screenshots/company_dashboard_monthly.png'
import calender from '../img/screenshots/calendar.png'
import Navbar from '../../js/components/navbar/homepagenavbar';
import '../../css/custombootstrap.css';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <header className="masthead">
                    <div className="intro-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mx-auto">
                                    <div className="main-page-header">
                                        <img src={logo} alt="logo"/>
                                        <h1 className="brand-heading">Attendance Records System</h1>
                                        <p className="intro-text">
                                            Attendance tracking and human resource management system based on serverless and face recognition technology
                                        </p>
                                    </div>
                                    <i className="fa fa-angle-double-down animated" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section id="about" className="content-section text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto">


                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="download"
                    className="download-section content-section text-center"
                >
                    <div className="container">
                        <div className="col-lg-8 mx-auto">
                            <h2>ABOUT</h2>
                            <p>
                                A serverless system that seeks the help of Image Analyzing AI service provided by AWS to track and record day to day employee attendance details of any kind of organization by Facial Recognition methods. It provides a simple user interface to monitor each and every record at anytime. In addition, the system incorporates holiday package, leave management and other handy integrations.
                            </p>


                        </div>
                        <hr/>
                        <hr/>
                        <hr/>
                        <hr/>
                        <hr/>
                        <hr/>
                        <hr/>
                        <hr/>
                        <hr/>
                        <hr/>
                        <hr/>
                        <hr/>
                        <div className="container">
                            <div className="col-lg-8 mx-auto">
                                <h2>FEATURES</h2>
                                <h4>Daily Records</h4>
                                <div>
                                    <img src={daily} alt="daily"/>
                                </div>
                                <h4>Monthly Records</h4>
                                <div>
                                    <img src={monthly} alt="monthly"/>
                                </div>
                                <h4>Calendar</h4>
                                <div>
                                    <img src={calender} alt="daily"/>
                                </div>


                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="content-section text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                <h2>Contact Us</h2>
                                <p>
                                    Feel free to contact us

                                </p>
                                <ul className="list-inline banner-social-buttons">
                                    <li className="list-inline-item">
                                        <a
                                            href="https://facebook.com/stntmaniiac"
                                            className="btn btn-default btn-lg"
                                        >
                                            <i className="fa fa-facebook fa-fw" />
                                            <span className="network-name">Facebook</span>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            href="https://twitter.com/stntmaniiac"
                                            className="btn btn-default btn-lg"
                                        >
                                            <i className="fa fa-twitter fa-fw" />
                                            <span className="network-name">Twitter</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <div id="map" />

                <footer>
                    <div className="container text-center">
                        <p>Copyright © attendance.phuyal.co.uk 2018</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default HomePage;
