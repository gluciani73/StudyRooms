import NavBarNoLogIn from "../NavBar/NavBar-nologin"
import Landing from '../../recursos/landing.gif'
import Login from "../Usuarios/Login";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { registerOnOff } from '../../Controllers/Actions/loginActions'
import Register from '../Usuarios/UserForm'

const LandingPage = () => {
  const dispatch = useDispatch()
  const register = useSelector((state) => state.loginReducer.regisOnOff)

  useEffect(()=>{
    dispatch(registerOnOff())
  },[dispatch])
  return (
  <div>
 
    <NavBarNoLogIn/>
 
    <div className="d-flex">
      
      <div className="w-50 d-flex justify-content-center align-items-center col-6">
        <img  src={Landing} alt="img"  />        
      </div>
  
      <div className=" w-50 d-flex justify-content-center align-items-center">
        { register ? <Login/> : <Register/> }

        <Link to="/home">
        <div className="position-absolute bottom-0 end-0">Skip Login</div>
        </Link>
      </div>

    </div>

    
  </div>  
  
  );
}
 
export default LandingPage;