import NavBarNoLogIn from "../NavBar/NavBar-nologin"
import Landing from '../../recursos/landing.jpg'
import Login from "../Usuarios/Login";

const LandingPage = () => {
  return (
  <div>
 
    <NavBarNoLogIn/>
 
    <div className="d-flex">
      
      <div>
        <img  src={Landing} height="30%" width="30%" alt="img" />        
      </div>
  
      <div>
        <Login/>
      </div>

    </div>

    
  </div>  
  
  );
}
 
export default LandingPage;