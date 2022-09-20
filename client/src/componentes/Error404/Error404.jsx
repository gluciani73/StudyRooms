import React from "react";
import E404 from '../../recursos/E404.gif'
import NavBar from "../NavBar/NavBar";

const Error404 = ()=>{
    return (
        <div >
           <div className="container">
            <NavBar/>
            <div className="col">
            <div className="row align-items-center">
            <img src={E404} alt="not found" height="400px"/>
            </div>
            <div className="row align-items-center fluid">
            <p className="Text-center"> Error 404 not found</p>
            </div>
            </div>
            </div>
        </div>
    )
}
export default Error404