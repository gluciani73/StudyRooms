import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styles from './navLanding.module.css'

import "../../CssAdicional/Home.css"
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


export const RecoverConfirmation = () => {
    const token = useSelector((state) => state.loginReducer.token)
    const navigate = useNavigate()

    return (
        <div className={styles.container} >

        <div className={styles.body} >
            <div className="  w-auto h-50 d-flex m-5 ">
            {token ? <Navigate to="/home" replace={true} /> :
                <div className="text-center justify-content-center text-dark bg-dark p-5">
                    <h3 style={{color:"white"}}>una contraseña temporal ha sido enviada a tu mail</h3>
                        <button className="btn btn-dark mt-2" onClick={(e)=>{e.preventDefault(); navigate("/")}}>ir al login</button>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default RecoverConfirmation;