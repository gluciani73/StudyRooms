import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backLogin, recoveryChange, registerOnOff} from '../../Controllers/Actions/loginActions'
import { Navigate } from "react-router-dom";

import "../../CssAdicional/Home.css"
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


export const AccountRecover = () => {
    const token = useSelector((state) => state.loginReducer.token)
    const dispatch = useDispatch()
    const [emailRecover, setEmailRecover] = useState({
        email: ""
    })
    function handleBack(){
        dispatch(recoveryChange(false, false))
        dispatch(registerOnOff())


    }
    function handleBackLogin(e) {
        e.preventDefault()
        dispatch(backLogin(emailRecover))
        
    }
    return (
        token ? <Navigate to="/home" replace={true} /> :
            <div className="text-center justify-content-center text-dark bg-white p-5">
                <h3>Recuperar cuenta</h3>
                <form className="text-center justify-content-center" onSubmit={(e) => handleBackLogin(e)}>
                    <label className="d-block">Ingrese Email</label>
                    <input required type="email" placeholder="Email..." value={emailRecover.email} className="d-block m-3 form-control" onChange={e => setEmailRecover({ email: e.target.value })}></input>
                    <button className="btn btn-dark" type="submit">Recuperar</button>
                </form>
                <button className="btn btn-dark mt-2" onClick={e => handleBack()}>Volver</button>
            </div>
    );
}

export default AccountRecover;