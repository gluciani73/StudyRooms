import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {createUserAction} from '../../Controllers/Actions/userAction'

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
            <div>
                <h1>UserForm</h1>
                
                <form onSubmit={(e)=> handleSubmit(e)}>
                    <div>
                        <label htmlFor="userName">Nombre de usuario</label>
                        <input type="text" value={newUser.userName} id='userName' name='userName' placeholder='User Name' autoComplete='off'  onChange={(e)=>handleChange(e)} required/>
                    {formError.userName && <span><strong>{formError.userName}</strong></span>}
                   </div>

                    <div>
                        <label htmlFor="firstName">ñnombre</label>
                        <input type="text" value={newUser.firstName} id='firstName' name='firstName' placeholder='User Name' autoComplete='off'  onChange={(e)=>handleChange(e)} required/>
                    </div>
        
        
                   
                    <div>
                        <label htmlFor="lastName">Segundo nombre</label>
                        <input type="text" value={newUser.lastName} placeholder='Last Name' id='lastName' name='lastName'onChange={(e)=>handleChange(e)} required/>
                    </div>
        
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={newUser.email} placeholder='email@example.com'name='email' id='email' autoComplete='off' onChange={(e)=>handleChange(e)} required/>
                    </div>
        
        
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password"  value={newUser.password} name='password' id='password' placeholder='Password'  onChange={(e)=>handleChange(e)} required/>
                    </div>
        
        
        
                    
                    <div>
                        <label htmlFor="foto">foto</label>
                        <input type="text"  value={newUser.avatar} name='avatar' id='foto' placeholder='foto' onChange={(e)=>handleChange(e)} required/>
                    </div>
        
        
                    <input type="submit" value='Register' />
        
               </form>
            </div>  );

}

    





 
