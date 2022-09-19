import React from "react";
import E404 from '../../recursos/E404.gif'
import NavBar from "../NavBar/NavBar";

const Error404 = ()=>{
    return (
        <div >
           <div className="container">
            <NavBar/>
            <img src={E404} alt="not found" />
            Error 404 not found
            </div>
        </div>
    )
}
export default Error404