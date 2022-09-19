import NavBarNoLogIn from "../NavBar/NavBar-nologin"
import Landing from '../../recursos/landing.gif'
import Login from "../Usuarios/Login";

const LandingPage = () => {
  return (
  <div>
 
    <NavBarNoLogIn/>
 
    <div className="d-flex">
      
      <div>
        <img  src={Landing} alt="img" />        
      </div>
  
      <div className=" w-50 d-flex justify-content-center align-items-center">
        <Login/>
      </div>

    </div>

    
  </div>  
  
  );
}
 
export default LandingPage;