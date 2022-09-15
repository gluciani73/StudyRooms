import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";

const UserForm = () => {

    const [error, setError]= useState({})
    const [done, setDone]= useState(false)

   const [newUser, setNewUser] = useState({
    username:"",
    name:"",
    lastname:"",
    email:"",
    password:"",
    confirmpassword:"",
    foto:""
    
   });

   function handleChange(e){
    const {value, name}=e.target
    setNewUser({
        ...newUser,
        [name]:value
    })

    
}


    return (
    <div>
        <h1>UserForm</h1>
        
        <form>
            <div>
                <label htmlFor="username">Nombre de usuario</label>
                <input type="text" id='username' name='username' placeholder='User Name' autoComplete='off'  onChange={handleChange} required/>
            </div>


            <div>
                <label htmlFor="name">Nombre</label>
                <input type="text" name='name'  placeholder='Name'  id='name' autoComplete='off' onChange={handleChange} required/>
            </div>

            <div>
                <label htmlFor="lastname">Segundo nombre</label>
                <input type="text" placeholder='Last Name' id='lastname' name='lastname' onChange={handleChange} required/>
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='email@example.com'name='email' id='email' autoComplete='off' onChange={handleChange} required/>
            </div>


            <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" name='password' id='password' placeholder='Password'  onChange={handleChange} required/>
            </div>


            <div>
                <label htmlFor="confirmpassword">Confirmar Contraseña</label>
                <input type="password" name='confirmpassword' id='confirmpassword' placeholder='Confirm Password' onChange={handleChange} required/>
            </div>

            
            <div>
                <label htmlFor="foto">Confirmar Contraseña</label>
                <input type="text" name='foto' id='foto' placeholder='foto' onChange={handleChange} required/>
            </div>


            <input type="submit" value='Register' />

       </form>
    </div>  );
}
 
export default UserForm;