import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {createUserAction} from '../../Controllers/Actions/userAction'
import "../../CssAdicional/Home.css"
import { signIn, registerOnOff} from '../../Controllers/Actions/loginActions'

export default function CreateUser(){
    const dispatch =useDispatch();
    const allUsers = useSelector((state)=> state.userReducer.users)

    function validate(data){
        var errors = {};
        if(!(/^[a-zA-Z]+$/.test(data.userName)) || data.userName.length < 3 ) errors.userName = "Ingrese un nombre valido"
        return errors;
    }

    // useEffect(()=>{
    //     dispatch(getUserAction())
    // },[dispatch])

    const [formError, setFormError] = useState({})

    const [newUser, setNewUser] = useState({
    userName:"",
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    avatar:""
    
   });

   function handleChange(e){
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
        setFormError(validate({
            ...newUser,
            [e.target.name]: e.target.value
        }))
    }
    function handleRegister(e){
        e.preventDefault()
        dispatch(registerOnOff())
      }
    function handleSubmit(e){
        e.preventDefault();
      
            e.preventDefault();
            dispatch(createUserAction(newUser))
            setNewUser({
                userName:"",
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                avatar:""
            })
            alert("Usuario creado correctamente")
        }
console.log(newUser)
        return (
            <div className='col p-0 m-0 d-flex justify-content-center align-items-center'>
                
                <form onSubmit={(e)=> handleSubmit(e)} className="justify-content-center align-items-center text-center">
                <h1>Registrate</h1>
                    <div className=''>
                        <input className='d-block  m-1 border-0 form-control'  type="text" value={newUser.userName} id='userName' name='userName' placeholder='User Name' autoComplete='off'  onChange={(e)=>handleChange(e)} required/>
                    {formError.userName && <span><strong>{formError.userName}</strong></span>}
                   </div>

                    <div>
                        <input className='d-block  m-1 border-0 form-control' type="text" value={newUser.firstName} id='firstName' name='firstName' placeholder='User Name' autoComplete='off'  onChange={(e)=>handleChange(e)} required/>
                    </div>
        
                    <div>
                        <input className='d-block  m-1 border-0 form-control' type="text" value={newUser.lastName} placeholder='Last Name' id='lastName' name='lastName'onChange={(e)=>handleChange(e)} required/>
                    </div>
        
                    <div>
                        <input className='d-block  m-1 border-0 form-control' type="email" value={newUser.email} placeholder='email@example.com'name='email' id='email' autoComplete='off' onChange={(e)=>handleChange(e)} required/>
                    </div>
        
                    <div>
                        <input className='d-block  m-1 border-0 form-control' type="password"  value={newUser.password} name='password' id='password' placeholder='Password'  onChange={(e)=>handleChange(e)} required/>
                    </div>
        
                    <div>
                        <input className='d-block  m-1 border-0 form-control' type="text"  value={newUser.avatar} name='avatar' id='foto' placeholder='foto' onChange={(e)=>handleChange(e)} required/>
                    </div>
        
        
                    <input type="submit" value='Register' />
                    <button type="button" onClick={ (e) => handleRegister(e) } className="btn btn-primary m-2">Login</button>


        
               </form>
            </div>  );

}