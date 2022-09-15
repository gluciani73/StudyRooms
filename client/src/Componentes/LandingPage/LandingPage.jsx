import NavBar from "../NavBar"
import Landing from '../recursos/landing.jpg'

const LandingPage = () => {
  return (
  <div>
    <NavBar/>
    <img  src={Landing} alt="img" />
    
  </div>  
  
  );
}
 
export default LandingPage;