import NavBarNoLogIn from "../NavBar/NavBar-nologin"
import Landing from '../../recursos/landing.jpg'
import Login from "../Usuarios/Login";

const LandingPage = () => {
  return (
  <div>
 
    <NavBarNoLogIn/>
 
    <div className="d-flex">
      
      <div className="w-50">
        <img  src={Landing} height="80%" width="100%" alt="img" />        
      </div>
  
      <div className=" w-50 d-flex justify-content-center align-items-center">
        <Login/>
      </div>

    </div>

    
  </div>  
  
  );
}
 
export default LandingPage;