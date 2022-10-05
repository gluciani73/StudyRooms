import React from "react";
import { Link } from "react-router-dom";
import logo from "../../recursos/logo2.png"
import '../../componentes/LandingPage/navLanding.css'
import "bootstrap-icons/font/bootstrap-icons.css"


const Footer = () => {
    return (
        <footer className="bg-dark d-flex text-white justify-content-between fixed-bottom">
            <div className="col-2 justify-content-center d-flex text-center">
                <img src={logo} alt="logo" height="50px" />
            </div>
            <div className="col-8 justify-content-center text-center" >
                <ul className="list-unstyled">
                    <li>Study Rooms</li>
                    <li>En este sitio web podremos crear, responder y puntuar preguntas sobre  temas de interes general</li>
                </ul>
            </div>
            <div className="col-2 justify-content-center text-center">
                <label>Siguenos</label>
                <ul className="m-0 p-0 list-unstyled d-flex justify-content-between">
                    <li>
                        <a href='https://www.facebook.com/profile.php?id=100086408741924' target="blank"><i className="bi-facebook iconsCss  "></i></a>
                    </li>
                    <li>
                        <a href='https://www.instagram.com/education_com/' target="blank"><i className=" bi-instagram iconsCss"></i></a>
                    </li>
                    <li>
                        <a href='https://twitter.com/KnowledgeBoxCen' target="blank"><i className="bi-gear-fill iconsCss"></i></a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer