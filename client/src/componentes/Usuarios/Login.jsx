import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, registerOnOff} from '../../Controllers/Actions/loginActions'

import { Navigate } from "react-router-dom";
import googleLogo from '../../recursos/googleLogo.png'
import facelogo from '../../recursos/faceLogo.png'

import "../../CssAdicional/Home.css"
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export const LandingPage = () => {

  const dispatch = useDispatch()
  const [inputSend, setInputSend] = useState({
    userName: "",
    password: ""
  })
  const token = useSelector((state) => state.loginReducer.token)

  const errorLog = useSelector((state) => state.loginReducer.error)

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(signIn(inputSend))
  }
  function handleRegister(e){
    e.preventDefault()
    dispatch(registerOnOff())
  }
  function handleGoogleLogin(e){
    e.preventDefault()
    window.open('https://studyrooms-deploy.herokuapp.com/users/google/login','_self')
  }
  return (
    token ? <Navigate to="/home" replace={true} /> :
    <div className=" d-flex flex-column justify-content-center   align-items-center  bg-light ">
      <h2>LogIn</h2>
          <form onSubmit={(e) => handleSubmit(e)} className="text-center ">
          {errorLog && <p className="alert alert-danger">{errorLog}</p>}
            <input type="Text" placeholder="Usuario..." required value={inputSend.userName} onChange={(e) => {
              setInputSend({
                ...inputSend,
                userName: e.target.value
              })
            }} className="d-block  m-1 border-0 form-control"/>
            <input type="Password" placeholder="Contraseña..." required value={inputSend.password} onChange={(e) =>
              setInputSend({
                ...inputSend,
                password: e.target.value
              })}className="d-block m-1 rounded border-0 form-control" />
            <button type="submit" className="btn btn-primary m-2">Ingresar</button>
            <button type="button" onClick={ (e) => handleRegister(e) } className="btn btn-primary m-2">Registrarse</button>

            <div className="d-flex justify-content-center ">
              <button className=" border-0 btLoginRedes btn btn-secondary d-block m-2" onClick={handleGoogleLogin}><img src={googleLogo} className="logoGoogle" alt="googleLogo"/> Google</button>
            </div>


          </form>
          </div>

  );
}

export default LandingPage;