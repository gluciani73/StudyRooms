import React from "react";
import { Link } from "react-router-dom";
import logo from "../../recursos/logo2.png"
import "bootstrap-icons/font/bootstrap-icons.css"


const Footer = ()=>{
    return(
        <div className="">
            <footer className="text-white py-4  bg-dark">
                <div className="container">
                    <nav className="nav d-flex justify-content-between">
                        <div className="col-12 col-md-3 d-flex align-items-center justify-content-center" to="/">
                            <img src={logo} alt="logo" className="mx-2" width="250" />
                        </div>
                        <ul className="col-12  col-md-3 list-unstyled align-items-center">
                            <li className="font-weight-bold mb-2 d-flex justify-content-center" >Sutudy Rooms</li>
                            <li className="text-center ">En este sitio web podremos crear, responder y puntuar preguntas sobre  temas de interes general</li>
                        </ul>
                       
                        <ul className="col-12 col-md-3 list-unstyled"> 
                            <li className=" font-weight-bold mb-2  d-flex justify-content-center" >Siguenos</li>
                            <li className="d-flex justify-content-between">
                            <a href='https://www.facebook.com/profile.php?id=100086408741924' target="blank"><i className="bi bi-facebook icons "></i></a>
                            <a href='https://www.instagram.com/education_com/' target="blank"><i className="bi bi-instagram icons"></i></a>
                            <a href='https://twitter.com/KnowledgeBoxCen' target="blank"><i className="bi bi-twitter icons"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </footer>
        </div>
    )
}

export default Footer