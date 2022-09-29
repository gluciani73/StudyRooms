import React from "react";
import { Link } from "react-router-dom";
import logo from "../../recursos/logo.png"


const Footer = ()=>{
    return(
        <div>
            <footer className="text-dark py-4  bg-white">
                <div className="container">
                    <nav className="nav">
                        <div className="col-12 col-md-3 d-flex align-items-center justify-content-center" to="/">
                            <img src={logo} alt="logo" className="mx-2" width="250" />
                        </div>
                        <ul className="col-12  col-md-3 list-unstyled  align-items-center">
                            <li className="font-weight-bold mb-2 d-flex justify-content-center" >Sutudy Rooms</li>
                            <li className="text-center ">En este sitio web podremos crear, responder y puntuar preguntas sobre  temas de interes general</li>
                        </ul>
                        <ul className="col-12 col-md-3 list-unstyled">
                            <li className="font-weight-bold mb-2  d-flex justify-content-center" >Enalces</li>
                           <li>
                            <Link to="/About" className="text-reset  d-flex justify-content-center">About Us</Link>
                           </li>
                        </ul>
                        <ul className="col-12 col-md-3 list-unstyled"> 
                            <li className=" font-weight-bold mb-2  d-flex justify-content-center" >Siguenos</li>
                            <li className="d-flex justify-content-between">
                            <i className="bi bi-facebook"></i>
                            <i className="bi bi-instagram"></i>
                            <i className="bi bi-twitter"></i>
                            </li>
                        </ul>
                    </nav>
                </div>
            </footer>
        </div>
    )
}

export default Footer