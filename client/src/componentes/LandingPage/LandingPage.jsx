import NavBarNoLogIn from "../NavBar/NavBar-nologin"
import Login from "../Usuarios/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { registerOnOff, refreshUserInfo } from '../../Controllers/Actions/loginActions'
import Register from '../Usuarios/UserForm'
import jwt_decode from 'jwt-decode'
import styles from "./navLanding.module.css"
import Footer from "../Footer/Footer";
import Account from '../Usuarios/AccountRecover'

const LandingPage = () => {
  const dispatch = useDispatch()
  const register = useSelector((state) => state.loginReducer.regisOnOff)
  const tokenData = localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"))
  const recovery = useSelector( (state) => state.loginReducer.recovery )
  const acountOrPass = useSelector ( (state) => state.loginReducer.acountOrPass)

  useEffect(() => {
    dispatch(registerOnOff());
    dispatch(refreshUserInfo(tokenData, localStorage.getItem("token")))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div className={styles.container} >

      <NavBarNoLogIn />

      <div className={styles.body} >

        {!recovery ?
          <div className="  w-auto h-50 d-flex m-5 ">
            {register ? <Login /> : <Register />}
          </div> :
          <div className="  w-auto h-50 d-flex m-5 ">
            <Account/>
          </div>
        }

      </div>
      <Footer />

    </div>

  );
}

export default LandingPage;