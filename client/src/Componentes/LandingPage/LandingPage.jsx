import NavBar from "../NavBar/NavBar"
import Landing from '../../recursos/landing.jpg'
import Login from "../Usuarios/Login";

const LandingPage = () => {
  return (
  <div>
 
    <NavBar/>
 
    <div class="d-flex">
      
      <div>
        <img  src={Landing} height="80%" width="100%" alt="img" />        
      </div>
  
      <div>
        <Login/>
      </div>

    </div>

    
  </div>  
  
  );
}
 
export default LandingPage;