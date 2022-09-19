import NavBarNoLogIn from "../NavBar/NavBar-nologin"
import Landing from '../../recursos/landing.gif'
import Login from "../Usuarios/Login";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
  <div>
 
    <NavBarNoLogIn/>
 
    <div className="d-flex">
      
      <div className="w-50 d-flex justify-content-center align-items-center col-6">
        <img  src={Landing} alt="img"  />        
      </div>
  
      <div className=" w-50 d-flex justify-content-center align-items-center">
        <Login/>

        <Link to="/home">
        <div className="position-absolute bottom-0 end-0">Skip Login</div>
        </Link>
      </div>

    </div>

    
  </div>  
  
  );
}
 
export default LandingPage;