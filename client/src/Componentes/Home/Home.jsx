import React from "react";
import Filters from "./Filters";
import NavBar from "../NavBar/NavBar";
import "../../CssAdicional/Home.css"


const Home = () => {

  return (<div className="container">
    <NavBar/>
    <div className="row row-cols-2 row-cols-lg-3">
    <div className="col-4 col-lg-2">
    <Filters/>
    </div>
    <div className="QuestionContainer">Aqui irian los componentes de preguntas lore Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum possimus recusandae sequi mollitia nam corporis voluptas voluptatum porro, sint dicta molestiae voluptates delectus. Ipsam, sed aliquid. Quas eveniet voluptatem deserunt!</div>
    </div>

  </div>  );
}
 
export default Home;