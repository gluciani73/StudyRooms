import { useParams, Navigate} from "react-router-dom";
import { useDispatch } from 'react-redux'
import { signInGoogle } from '../../Controllers/Actions/loginActions'

export const GoogleAuth = () => {

    const dispatch = useDispatch()

    const {token} = useParams()
    localStorage.setItem('token', token)
    dispatch(signInGoogle(token))
    
    return <Navigate to="/" />
}

export default GoogleAuth