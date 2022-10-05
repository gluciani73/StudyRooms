import React, { useState } from 'react'
import { changePassword } from '../../Controllers/Actions/userAction'
import {useDispatch} from "react-redux"
import { useSelector } from "react-redux";



const EditPassword = ()=>{

    const userInfo = useSelector((state)=> state.loginReducer.userInfo);
    const userId = userInfo.id
    const dispatch =useDispatch();
    const errorLog = useSelector((state) => state.userReducer.error)
    const changePassword1 = useSelector((state) => state.userReducer.changePassword)


   
    function validate(data){
        var errors = {};
        if (!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(data.newPassword) ){errors.newPassword ="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."}
        if(data.newPassword !== data.ConfirmPassword)errors.ConfirmPassword = "Las contraseñas no coinciden"
        if (data.newPassword === data.password)errors.newPassword ="La contraseña no puede ser igual a la anterior"
       
        return errors;
    }
    
    const [formError, setFormError] = useState("")
    const [newPassword, setNewPassword] = useState({
        password:"",
        newPassword:"",
        ConfirmPassword:"",
    });

    function handleChange(e){
        setNewPassword({
            ...newPassword,
            [e.target.name]: e.target.value
        });
        setFormError(validate({
            ...newPassword,
            [e.target.name]: e.target.value
        }))
    }
    

    function handleSubmit(e){
        e.preventDefault()
       
        if(formError.newPassword === undefined && newPassword.newPassword !== newPassword.password && newPassword.newPassword === newPassword.ConfirmPassword){
            dispatch(changePassword(newPassword, userId))
        }else{
            alert("error");
            
        }
        setNewPassword({
            password:"",
            newPassword:"",
            ConfirmPassword:"",
        })
      
    }

    return (
        <div className='col p-0 m-0 d-flex justify-content-center align-items-center'>
            <form onSubmit={(e)=> handleSubmit(e)} className="justify-content-center align-items-center text-center">
                <h1>Editar Contraseña</h1>


                    <div>                 
                        {changePassword1 && <p className="alert alert-success">{changePassword1}</p>}
                        <label htmlFor="password">Password</label>          
                        {errorLog && <p className="alert alert-danger">{errorLog}</p>}           
                        <input className='d-block mt-3  m-1 border-0 form-control' type="password" autoComplete='off'  value={newPassword.password} name='password' id='password' placeholder='Password'  onChange={(e)=>handleChange(e)} required/>
                       
                    </div>


                    <div>                     
                        <label htmlFor="newPassword"> New Password</label>    
                        {formError.newPassword && <p className="alert alert-danger">{formError.newPassword}</p>}            
                        <input className='d-block mt-3 m-1 border-0 form-control' value={newPassword.newPassword} type="password" autoComplete='off'  placeholder='New Password' id='newPassword' name='newPassword' onChange={(e)=>handleChange(e)} required/>
                    </div>

                    
                    <div>                     
                        <label htmlFor="ConfirmPassword">Confirm Password</label>  
                        {formError.ConfirmPassword && <p className="alert alert-danger">{formError.ConfirmPassword}</p>}              
                        <input className='d-block mt-3  m-1 border-0 form-control' value={newPassword.ConfirmPassword} type="password" autoComplete='off' placeholder='Confirm Password' id='ConfirmPassword' name='ConfirmPassword' onChange={(e)=>handleChange(e)} required/>
                    </div>

                    <button type='submit'>Save</button>

            </form>
        </div>
    )
}
export default EditPassword