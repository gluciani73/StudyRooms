import NavBarNoLogIn from "../NavBar/NavBar-nologin"
import Landing from '../../recursos/landing.gif'
import Login from "../Usuarios/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { registerOnOff, refreshUserInfo } from '../../Controllers/Actions/loginActions'
import Register from '../Usuarios/UserForm'
import jwt_decode from 'jwt-decode'
import styles from "./navLanding.module.css"
import Footer from "../Footer/Footer";

const LandingPage = () => {
  const dispatch = useDispatch()
  const register = useSelector((state) => state.loginReducer.regisOnOff)
  const tokenData = localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"))

  useEffect(()=>{
    dispatch(registerOnOff());
    dispatch(refreshUserInfo(tokenData, localStorage.getItem("token")))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch])

  return (
  <div className={styles.container} >
 
    <NavBarNoLogIn/>
 
    <div className={styles.body} >
      
  
      <div className="  w-auto h-50 d-flex m-5 ">
        { register ? <Login/> : <Register/> }

        {/* <Link to="/home">
        <div className="position-absolute bottom-0 end-0">Skip Login</div>
        </Link> */}
      </div>

    </div>
        <Footer/>
    
  </div>  
  
  );
}
 
export default LandingPage;