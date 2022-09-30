import React, { useState } from 'react'
import { changePassword } from '../../Controllers/Actions/userAction'
import {useDispatch} from "react-redux"
import { useSelector } from "react-redux";


const EditPassword = ()=>{
    const userInfo = useSelector((state)=> state.loginReducer.userInfo);
    const userId = userInfo.id
    const dispatch =useDispatch();
    const errorLog = useSelector((state) => state.userReducer.error)
    const changePassword = useSelector((state) => state.userReducer.changePassword)


    console.log("error en contraseña",errorLog);
    function validate(data){
        var errors = {};
        if (!/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%"-._;,+*?&]{8,}[^'\s]+$)/.test(data.newPassowrd)) errors.password ="La contaseña debe contener al menos una mayuscula un numero y un simbolo y no puede contener espacios"
        if(data.newPassowrd !== data.ConfirmPassword)errors.ConfirmPassword = "Las contraseñas no coinciden"
        return errors;
    }
    
    const [formError, setFormError] = useState({})
    const [newPassowrd, setNewPassowrd] = useState({
        password:"",
        newPassword:"",
        ConfirmPassword:""
    
    });

    function handleChange(e){
        setNewPassowrd({
            ...newPassowrd,
            [e.target.name]: e.target.value
        });
        setFormError(validate({
            ...newPassowrd,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
       dispatch(changePassword(newPassowrd, userId))
            setNewPassowrd({
                password:"",
                newPassword:"",
                ConfirmPassword:""
            })

        }

    return (
        <div className='col p-0 m-0 d-flex justify-content-center align-items-center'>
            <form onSubmit={(e)=> handleSubmit(e)} className="justify-content-center align-items-center text-center">
                <h1>Editar Contraseña</h1>


                    <div>
                        {errorLog && <p className="alert alert-danger">{errorLog}</p>}
                        {changePassword && <p className="alert alert-success">{changePassword}</p>}
                        <label htmlFor="password">Password</label>                     
                        <input className='d-block  m-1 border-0 form-control' type="password"  value={newPassowrd.password} name='password' id='password' placeholder='Password'  onChange={(e)=>handleChange(e)} required/>
                       
                    </div>


                    <div>
                        <label htmlFor="newPassword"> New Password</label>                
                        <input className='d-block  m-1 border-0 form-control' value={newPassowrd.newPassword} type="text"  placeholder='New Password' id='newPassword' name='newPassword' onChange={(e)=>handleChange(e)} required/>
                        {formError.newPassword && <p className="alert alert-danger">{formError.newPassword}</p>}
                    </div>

                    
                    <div>
                        <label htmlFor="ConfirmPassword">Confirm Password</label>                
                        <input className='d-block  m-1 border-0 form-control' value={newPassowrd.ConfirmnewPassword} type="text"  placeholder='Confirm Password' id='ConfirmPassword' name='ConfirmPassword' onChange={(e)=>handleChange(e)} required/>
                        {formError.ConfirmPassword && <p className="alert alert-danger">{formError.ConfirmPassword}</p>}
                    </div>

                    <button type='submit' value='update'>Save</button>

               </form>
        </div>
    )
}
export default EditPassword