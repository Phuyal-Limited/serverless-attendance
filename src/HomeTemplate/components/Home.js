import React from "react";
import '../vendor/bootstrap/css/bootstrap.min.css';
import '../vendor/font-awesome/css/font-awesome.min.css';
import '../css/grayscale.min.css';
import logo from '../../logo.png'
<<<<<<< HEAD
import Navbar from '../../js/components/navbar/homepagenavbar';
=======
import Navbar from '../../js/navbar/homepagenavbar';
>>>>>>> 4a45f49ac39b1d9e973138e649b205059ee1eada
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
                                            A free way to manage your HR operations
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
                            <h2>About PHUREMS</h2>
                            <p>
                                Phuyal Human Resource Management System is a cloud based human resource management system for any type of organization
                            </p>

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
