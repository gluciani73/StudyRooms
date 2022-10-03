import React from "react";
import { Link } from "react-router-dom";
import logo from "../../recursos/logo2.png"
import "bootstrap-icons/font/bootstrap-icons.css"


const Footer = ()=>{
    return(
        <div>
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
                            <Link to='https://www.facebook.com/profile.php?id=100086408741924'><i className="bi bi-facebook icons "></i></Link>
                            <Link to='https://www.instagram.com/education_com/'><i className="bi bi-instagram icons"></i></Link>
                            <Link to='https://twitter.com/KnowledgeBoxCen'></Link><i className="bi bi-twitter icons"></i>
                            </li>
                        </ul>
                    </nav>
                </div>
            </footer>
        </div>
    )
}

export default Footer