import React from "react";
import Filters from "./Filters";
import NavBar from "../NavBar/NavBar";
// import "../../CssAdicional/Home.css"
import ObtenerPreguntas from "../Preguntas/ObtenerPreguntas" 


const Home = () => {

  return (<div>
    <NavBar/>
    <div className="row">
    <div className="col-4 col-lg-2">
    <Filters/>
    </div>
    <div className="col"> <ObtenerPreguntas/> </div>
    </div>

  </div>  );
}
 
export default Home;